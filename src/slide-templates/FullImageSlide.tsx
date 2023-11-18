import { ReactNode } from "react";
import Slide, { SlideProps } from "./Slide";
import classNames from "classnames";

interface FullImageSlideProps {
  title?: ReactNode;
  titlePosition?: "top" | "center" | "bottom";
  slideProps?: Partial<SlideProps>;
  image: string;
}

export default function FullImageSlide(props: FullImageSlideProps) {
  return (
    <Slide showFooter={false} backgroundImage={props.image}>
      <div
        className={classNames(
          "flex flex-col h-full w-full px-12",
          { "justify-start": props.titlePosition === "top" },
          { "justify-end": props.titlePosition === "bottom" },
          {
            "justify-center":
              props.titlePosition === undefined ||
              props.titlePosition === "center",
          },
        )}
      >
        {props.title}
      </div>
    </Slide>
  );
}
