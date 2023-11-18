import classNames from "classnames";
import katex from "katex";
import { useEffect, useRef } from "react";

type LatexProps = {
  math: string;
  displayMode?: boolean;
} & (
  | { highlightChange?: false }
  | {
      highlightChange: true;
      highlightColor?: string;
      changeDetectionFunction?: (prevMath: string, newMath: string) => boolean;
    }
);

export default function Latex(props: LatexProps) {
  const spanRef = useRef<HTMLSpanElement>(null);
  const prevMath = useRef<string>(props.math);
  const changeTimeoutRef = useRef<number>();
  function renderLatex(latex: string) {
    if (changeTimeoutRef.current !== undefined) {
      clearTimeout(changeTimeoutRef.current);
      changeTimeoutRef.current = undefined;
    }
    const isUpdated =
      props.highlightChange === true &&
      (props.changeDetectionFunction === undefined
        ? prevMath.current !== props.math
        : props.changeDetectionFunction(prevMath.current, props.math));
    if (spanRef.current) {
      katex.render(latex, spanRef.current, { displayMode: props.displayMode });
      if (isUpdated) {
        spanRef.current.style.color = props.highlightColor ?? "darkred";
      }
      changeTimeoutRef.current = setTimeout(() => {
        if (spanRef.current) {
          spanRef.current.style.color = "";
        }
      }, 150);
      return () => {
        clearTimeout(changeTimeoutRef.current);
      };
    }
  }

  useEffect(() => {
    renderLatex(props.math);
  });

  return (
    <span
      className={classNames("transition-all duration-150", {
        block: props.displayMode,
      })}
      ref={spanRef}
    ></span>
  );
}
