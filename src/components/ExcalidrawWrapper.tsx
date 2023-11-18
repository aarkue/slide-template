/* eslint-disable @typescript-eslint/no-explicit-any */
import { Excalidraw } from "@excalidraw/excalidraw";
import type { ExcalidrawElement } from "@excalidraw/excalidraw/types/element/types";
import {
  ExcalidrawImperativeAPI,
  type AppState,
  type BinaryFiles,
} from "@excalidraw/excalidraw/types/types";
import classNames from "classnames";
import { useContext, useEffect, useRef, useState } from "react";
import { RevealContext, isPDFExport } from "../reveal/reaveal";

const DEFAULT_APP_STATE = {
  viewBackgroundColor: "transparent",
  activeTool: {
    customType: null,
    type: "freedraw",
    locked: false,
    lastActiveTool: null,
  },
} as const;
export default function ExcalidrawWrapper() {
  const [showAnnotations, setShowAnnotations] = useState(false);
  const excalidrawRef = useRef<ExcalidrawImperativeAPI>();
  const { reveal } = useContext(RevealContext);
  const [currentIndex, setCurrentIndex] = useState(
    reveal?.getState().indexh ?? 0,
  );

  useEffect(() => {
    if (reveal) {
      const listener = () => {
        setCurrentIndex(reveal!.getState().indexh ?? 0);
      };

      reveal.on("slidechanged", listener);
      return () => reveal.off("slidechanged", listener);
    }
  }, [reveal]);

  // // Excalidraw data is constantly saved to this ref (used to udpdate annotationsPerSlide later)
  const lastDataRef = useRef<{
    elements: readonly ExcalidrawElement[];
    appState: AppState;
    files: BinaryFiles;
  }>();

  // // Last slide index (this is the slide index the data lastDataRef belongs to)
  const lastSlideIndexRef = useRef<number>(reveal?.getState().indexh || 0);

  // Annotation data per slide
  const annotationsPerSlide = useRef<
    (
      | {
          elements: readonly ExcalidrawElement[];
          appState: AppState;
          files: BinaryFiles;
        }
      | undefined
    )[]
  >([]);

  useEffect(() => {
    if (lastDataRef.current !== undefined) {
      annotationsPerSlide.current[lastSlideIndexRef.current] = {
        ...lastDataRef.current,
        appState: DEFAULT_APP_STATE,
      } as any;
      lastDataRef.current = undefined;
    }
    if (excalidrawRef) {
      const data = annotationsPerSlide.current[currentIndex];
      excalidrawRef.current?.history.clear();
      if (data === undefined) {
        excalidrawRef.current?.updateScene({
          appState: DEFAULT_APP_STATE,
          elements: [],
        });
      } else {
        excalidrawRef.current?.updateScene(
          annotationsPerSlide.current[currentIndex] as any,
        );
      }
    }
    lastSlideIndexRef.current = currentIndex;
  }, [currentIndex, excalidrawRef, showAnnotations, annotationsPerSlide]);

  useEffect(() => {
    if (!isPDFExport()) {
      const listener = (ev: KeyboardEvent) => {
        if (ev.key === "D" && ev.shiftKey) {
          setShowAnnotations((v) => !v);
        }
      };
      document.addEventListener("keydown", listener);
      return () => {
        document.removeEventListener("keydown", listener);
      };
    }
  }, []);

  if (isPDFExport()) {
    // Do not render anything for PDF export
    return;
  }

  return (
    <>
      {showAnnotations && (
        <div
          className="w-full h-full absolute z-10"
          onKeyDownCapture={(ev) => {
            if (ev.key === " ") {
              ev.stopPropagation();
            }
          }}
          onWheelCapture={(ev) => {
            ev.stopPropagation();
          }}
        >
          <Excalidraw
            excalidrawAPI={(api) => (excalidrawRef.current = api)}
            onChange={(elements, appState, files) => {
              lastDataRef.current = { elements, appState, files };
            }}
            initialData={{
              appState: DEFAULT_APP_STATE,
              ...(currentIndex !== undefined
                ? annotationsPerSlide.current[currentIndex]
                : {}),
            }}
            renderTopRightUI={() => {
              return (
                <button
                  title="Reset annotations for this slide"
                  className="text-red-500 px-2 rounded-md border bg-red-100 hover:bg-red-300 hover:text-red-800 active:bg-red-400"
                  onClick={() => {
                    excalidrawRef.current?.updateScene({
                      elements: [],
                      appState: DEFAULT_APP_STATE,
                    });
                  }}
                >
                  Reset
                </button>
              );
            }}
          />
        </div>
      )}
      <button
        title="Toggle Annotation"
        className={classNames(
          "absolute left-2 bottom-2 z-10 px-2 py-2 rounded-md text-lg",
          {
            "opacity-20 hover:opacity-100": !showAnnotations,
          },
        )}
        onClick={() => setShowAnnotations((s) => !s)}
      >
        <svg
          fill="#000000"
          version="1.1"
          className={classNames("w-8 h-8", {
            " fill-blue-500": !showAnnotations,
            "fill-black hover:fill-blue-600": showAnnotations,
          })}
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 451.215 451.214"
          xmlSpace="preserve"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <g>
              <g>
                <path d="M434.262,377.113c-14.697-21.898-37.031-48.195-62.887-74.049c-14.203-14.205-29.113-27.855-43.115-39.477 c-1.621-1.346-3.793-1.821-5.826-1.278c-2.035,0.543-3.682,2.038-4.416,4.012c-2.189,5.882-5.758,11.319-10.604,16.163 c-3.98,3.982-8.113,7.116-12.285,9.314c-1.736,0.916-2.967,2.567-3.348,4.494c-0.379,1.928,0.133,3.922,1.395,5.428 c11.277,13.474,24.449,27.809,38.094,41.457c47.014,47.012,92.693,79.846,111.086,79.847c2.824,0,5.035-0.777,6.566-2.309 C456.145,413.49,444.938,393.017,434.262,377.113z"></path>{" "}
                <path d="M243.857,243.007c1.158,7.334,2.471,15.647,6.73,24.82c5.792,12.473,15.584,19.92,26.191,19.922h0.002 c8.016,0,16.086-4.008,23.99-11.91c11.201-11.201,14.574-25.885,9.023-39.28c-7.363-17.779-28.377-29.267-53.533-29.267 c-5.537,0-11.322,0.533-17.195,1.585c-2.299,0.412-4.201,2.026-4.979,4.229c-0.78,2.202-0.317,4.654,1.21,6.421 C241.23,226.388,242.447,234.087,243.857,243.007z"></path>{" "}
                <path d="M412.197,28.191H6.5c-3.59,0-6.5,2.91-6.5,6.5v275.467c0,3.59,2.91,6.5,6.5,6.5h278.209l-13.289-17.07 c-26.898,0-34.912-25.93-37.26-25.93H43V71.191h332.697v202.467h-15.26l41.412,43h10.348c3.59,0,6.5-2.91,6.5-6.5V34.691 C418.697,31.101,415.787,28.191,412.197,28.191z"></path>{" "}
                <path d="M224.655,199.42c1.22,1.138,2.81,1.747,4.434,1.747c0.603,0,1.209-0.083,1.802-0.255 c4.098-1.183,10.135-2.898,15.639-4.357c1.336-0.354,2.523-1.125,3.393-2.199c1.518-1.878,3.296-3.852,4.598-5.294 c6.479-7.193,15.354-17.043,11.448-28.758c-2.013-5.867-6.021-10.201-11.594-12.533c-2.948-1.234-6.147-1.833-9.784-1.833 c-12.584,0-28.438,7.618-45.223,15.683c-7.487,3.597-19.419,9.329-26.381,11.35c1.646-4.16,4.895-9.963,7.181-14.05 c3.969-7.087,8.073-14.416,10.182-21.566c4.594-15.575-2.562-23.934-7.277-27.562c-0.007-0.005-0.085-0.064-0.092-0.07 c-4.23-3.173-8.941-4.782-14.001-4.782c-14.476,0-29.065,12.832-40.788,23.143c-4.802,4.224-8.536,7.423-11.153,9.306 c-2.089,1.503-3.095,4.097-2.564,6.615l2.626,12.475c0.42,1.995,1.751,3.677,3.594,4.543c1.847,0.868,3.991,0.819,5.794-0.13 c5.621-2.958,11.457-8.093,18.22-14.042c5.539-4.872,11.268-9.91,16.521-13.344c2.215-1.448,3.874-2.295,5.068-2.79 c-1.496,4.48-5.568,11.75-7.94,15.988c-4.03,7.202-8.198,14.65-10.159,21.787c-4.619,16.809,5.146,24.699,9.522,27.288 c3.231,1.943,6.864,2.887,11.105,2.887c11.163,0,25.158-6.724,41.364-14.51c8.074-3.879,16.424-7.89,23.458-10.479 c0.545-0.201,1.078-0.391,1.6-0.571c-4.958,5.514-10.811,12.282-12.511,20.197C222.253,195.538,222.983,197.861,224.655,199.42z"></path>{" "}
              </g>
            </g>
          </g>
        </svg>
      </button>
    </>
  );
}
