import { useContext, useEffect, useState } from "react";
import { CONFIG } from "./config";
import TitleSlide from "./slide-templates/TitleSlide";
import { RevealContext } from "./reveal/reaveal";
import { PresentationContext, PresentationState } from "./utils/slide-context";
import GradientTitle from "./components/GradientTitle";
import ExampleSlides from "./examples/ExampleSlides";
export default function Presentation() {
  const { reveal } = useContext(RevealContext);
  const [presentationState, setPresentationState] =
    useState<PresentationState>();

  useEffect(() => {
    if (reveal) {
      const listener = () => {
        const allSlides = reveal?.getSlides();
        const index = allSlides.indexOf(reveal.getCurrentSlide());
        if (allSlides && index !== undefined) {
          setPresentationState({
            allSlides: allSlides,
            currentSlideIndex: index,
            reveal: reveal,
          });
        }
      };
      listener();
      reveal.on("slidechanged", listener);
      return () => {
        reveal.off("slidechanged", listener);
      };
    }
  }, [reveal]);

  return (
    <PresentationContext.Provider value={presentationState}>
      <TitleSlide
        showFooter={true}
        position="top"
        title={
          <div className="flex flex-col justify-between">
            <h1 className="mb-8 text-blue-500 text-8xl leading-tight font-black">
              <GradientTitle
                pdfClasses="text-blue-500"
                className="bg-gradient-to-b from-sky-500 to-blue-500"
              >
                {CONFIG.presentationTitle}
              </GradientTitle>
            </h1>
            <h2 className="text-5xl font-normal">{CONFIG.event}</h2>
            <h2 className="text-4xl font-normal mb-0">
              {CONFIG.authors.map((a) => a.name).join(", ")}
            </h2>
            <a
              className="text-3xl font-light tracking-tight mt-0"
              href={`mailto:${CONFIG.email}`}
            >
              {CONFIG.email}
            </a>
          </div>
        }
      />
      <ExampleSlides />
    </PresentationContext.Provider>
  );
}
