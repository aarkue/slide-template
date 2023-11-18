import { ReactNode } from "react";
import Slide, { SlideProps } from "./Slide";
import classNames from "classnames";

interface TitleSlideProps {
  title: ReactNode;
  position?: "top" | "center" | "bottom";
  showFooter?: boolean;
  slideProps?: Partial<SlideProps>;
}

export default function TitleSlide(props: TitleSlideProps) {
  return (
    <Slide showFooter={props.showFooter} {...props.slideProps}>
      <div
        className={classNames(
          "flex flex-col h-full w-full px-12 pt-8",
          { "justify-start": props.position === "top" },
          { "justify-end": props.position === "bottom" },
          { "justify-center": props.position === "center" },
        )}
      >
        {props.title}
      </div>
    </Slide>
  );
}
