import { Fragment, useContext, useEffect, useState } from "react";
import { CONFIG } from "../../config";
import logoURL from "./logo.svg";
import { isPDFExport } from "../../reveal/reaveal";
import { PresentationContext } from "../../utils/slide-context";

export default function Footer({
  slideIndex,
}: {
  slideIndex: number | undefined;
}) {
  const presentationState = useContext(PresentationContext);
  const [slideState, setSlideState] = useState<{
    index: number;
    dots: { number: number; filled: boolean }[];
  }>();
  const currentSlideProgress = 0.5;

  useEffect(() => {
    if (presentationState && slideIndex !== undefined) {
      setSlideState({
        index: slideIndex,
        dots: presentationState.allSlides.map((_slide, i) => ({
          number: i + 1,
          filled: i <= slideIndex,
        })),
      });
    }
  }, [presentationState, slideIndex]);

  if (
    slideState === undefined ||
    slideIndex === undefined ||
    presentationState === undefined
  ) {
    return <div className=""></div>;
  }

  return (
    <div
      className={`h-[4rem] px-4 flex gap-2 items-center justify-between text-sm w-full transition-none"`}
    >
      <img
        style={{ transition: "none" }}
        alt="Logo"
        className="object-contain h-[4rem] my-0 transition-none"
        src={logoURL}
        data-auto-animate-unmatched="true"
      />
      <div className=" justify-center flex flex-col w-fit text-left transition-none">
        <span className="block font-semibold">{CONFIG.presentationTitle}</span>
        <div className="flex w-full justify-between items-end">
          <div className="flex gap-1 items-start">
            <span>
              {CONFIG.authors.map((author, i) => (
                <Fragment key={i}>
                  <span
                    className={
                      (
                        typeof author.presenting === "function"
                          ? author.presenting(slideIndex + 1)
                          : author.presenting
                      )
                        ? "underline decoration-slate-400"
                        : ""
                    }
                  >
                    {author.name}
                  </span>
                  {i < CONFIG.authors.length - 1 && ", "}
                </Fragment>
              ))}
            </span>
            <span>|</span>
            <span>
              <a className="text-inherit" href={`mailto:${CONFIG.email}`}>
                {CONFIG.email}
              </a>
            </span>
            <span>|</span>
            <span>{CONFIG.event}</span>
          </div>
        </div>
      </div>
      {presentationState.reveal !== undefined &&
        slideIndex !== undefined &&
        slideState !== undefined && (
          <PageDots
            reveal={presentationState.reveal}
            currentSlideProgress={currentSlideProgress}
            currentSlideIndex={slideIndex}
            dots={slideState.dots}
          />
        )}
    </div>
  );
}

function PageDots({
  dots,
  reveal,
  currentSlideProgress,
  currentSlideIndex,
}: {
  dots: { number: number; filled: boolean }[];
  reveal: Reveal.Api;
  currentSlideProgress: number;
  currentSlideIndex: number;
}) {
  const isPDF = isPDFExport();

  function getOnlyRelevantDots() {
    const numDotsToShowPerSide = 5;
    let startIndex = Math.max(currentSlideIndex - numDotsToShowPerSide, 0);
    let endIndex = Math.min(
      currentSlideIndex + numDotsToShowPerSide,
      dots.length - 1,
    );
    if (endIndex - startIndex < 2 * numDotsToShowPerSide) {
      if (startIndex > 0) {
        startIndex = Math.max(endIndex - 2 * numDotsToShowPerSide, 0);
      } else if (endIndex < dots.length) {
        endIndex = Math.min(
          startIndex + 2 * numDotsToShowPerSide,
          dots.length - 1,
        );
      }
    }
    return dots.slice(startIndex, endIndex + 1);
  }

  const allDotsShown = dots.length <= 24;
  const dotsToShow = allDotsShown ? dots : getOnlyRelevantDots();
  const dotsHiddenBefore = dotsToShow[0].number > 1;
  const dotsHiddenAfter =
    dotsToShow[dotsToShow.length - 1].number < dots.length;

  return (
    <div
      className={
        "transition-none mb-2 mr-2 mt-auto flex gap-x-1 gap-y-0.5 flex-wrap flex-shrink-0 max-w-[22%]"
      }
    >
      {!allDotsShown && (
        <span className="mt-2 block text-gray-400 -mr-0.5 text-center text-xs w-[0.5rem] ">
          {dotsHiddenBefore ? "..." : ""}
        </span>
      )}
      {dotsToShow.map((dot, i) => (
        <a
          onClick={(ev) => {
            if (!isPDF) {
              ev.preventDefault();
              reveal?.slide(dot.number - 1);
            }
          }}
          key={i}
          href={isPDF ? `#slide-${dot.number}` : `#/slide-${dot.number}/`}
          className="w-[1rem] relative flex flex-col items-center justify-center"
        >
          <span
            style={{
              opacity:
                dot.number - 1 === currentSlideIndex
                  ? currentSlideProgress * 0.7 + 0.3
                  : 1,
            }}
            className={`block relative rounded-full w-2 h-2 ${
              dot.filled ? "bg-blue-300" : "bg-gray-200"
            } ${dot.number - 1 === currentSlideIndex ? " scale-125" : ""}`}
          />
          <span
            className={`mt-[1px] block text-xs opacity-100 font-semibold !transition-none ${
              dot.number - 1 === currentSlideIndex
                ? "text-blue-700 scale-125"
                : "text-gray-500"
            }`}
          >
            {dot.number}
          </span>
        </a>
      ))}
      {!allDotsShown && (
        <span className="mt-2 block text-gray-400 -ml-[0.15rem] text-center text-xs w-[0.5rem] ">
          {dotsHiddenAfter ? "..." : ""}
        </span>
      )}
    </div>
  );
}
