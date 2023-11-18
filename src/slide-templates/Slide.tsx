import { ReactNode, useContext, useEffect, useRef, useState } from "react";
import Footer from "../components/footer/Footer";
import classNames from "classnames";
import { isPDFExport } from "../reveal/reaveal";
import { PresentationContext, SlideContext } from "../utils/slide-context";

export interface SlideProps {
  children: ReactNode;
  showFooter?: boolean;
  textAlign?: "left" | "center" | "right";
  padding?: boolean;
  backgroundImage?: string;
}
const isPDF = isPDFExport();

export default function Slide(props: SlideProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const presentationState = useContext(PresentationContext);
  const [slideIndex, setSlideIndex] = useState<number>();

  useEffect(() => {
    if (presentationState) {
      const slideIndex = presentationState.allSlides.findIndex((s) => {
        return sectionRef.current == s;
      });
      setSlideIndex(slideIndex);
    }
  }, [presentationState]);

  return (
    <SlideContext.Provider
      value={{
        visible:
          slideIndex !== undefined &&
          slideIndex === presentationState?.currentSlideIndex,
      }}
    >
      <section
        data-background-image={props.backgroundImage}
        ref={sectionRef}
        id={slideIndex !== undefined ? `slide-${slideIndex + 1}` : undefined}
        className={classNames("w-full h-full border", {
          "!relative !top-0 !left-0": isPDF,
        })}
      >
        <div
          className={classNames(
            "w-full h-full !flex flex-col justify-between",
            { "text-left": props.textAlign === "left" },
            { "text-center": props.textAlign === "center" },
            { "text-right": props.textAlign === "right" },
            { "mb-4": props.showFooter },
            { "pt-4 pl-8 xl:pt-8 xl:pl-16": props.padding },
          )}
        >
          {props.children}
          {props.showFooter !== false && (
            <div className={classNames({ "xl:-ml-16 -ml-8": props.padding })}>
              <Footer slideIndex={slideIndex} />
            </div>
          )}
        </div>
      </section>
    </SlideContext.Provider>
  );
}
