import classNames from "classnames";
import { ReactNode } from "react";
import { isPDFExport } from "../reveal/reaveal";

interface GradientTitleProps {
  children?: ReactNode;
  className?: classNames.Argument;
  textOutline?: { color: string; width: string };
  pdfClasses?: classNames.Argument;
}

export default function GradientTitle(props: GradientTitleProps) {
  return (
    <span
      style={
        props.textOutline !== undefined
          ? {
              WebkitTextStroke: `${props.textOutline.width} ${props.textOutline.color}`,
            }
          : undefined
      }
      className={classNames(
        !isPDFExport() &&
          "bg-clip-text supports-[background-clip:_text]:text-transparent",
        !isPDFExport() &&
          !props.className &&
          "bg-gradient-to-r from-blue-600 to-80% to-violet-500",
        !isPDFExport() && props.className,
        isPDFExport() && "text-blue-500",
        isPDFExport() && (props.pdfClasses ?? "text-inherit"),
      )}
    >
      {props.children}
    </span>
  );
}
