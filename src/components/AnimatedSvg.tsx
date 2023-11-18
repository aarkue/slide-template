import { useCallback, useContext, useEffect, useRef } from "react";
import Vivus from "vivus";
import { SlideContext } from "../utils/slide-context";
import classNames from "classnames";
import { isPDFExport } from "../reveal/reaveal";

interface AnimatedSvgProps {
  animateOnlyOnce?: boolean;
  svgURL: string;
  className?: classNames.Argument;
  clickToRestart?: boolean;
  containerClassName?: classNames.Argument;
}
export default function AnimatedSvg(props: AnimatedSvgProps) {
  const svgRef = useRef<HTMLObjectElement>(null);

  const { visible } = useContext(SlideContext);
  const wasVisibleRef = useRef(false);

  const animate = useCallback(() => {
    const elementReference = svgRef.current;
    if (elementReference) {
      wasVisibleRef.current = true;
      const myVivus = new Vivus(elementReference, {
        type: "delayed",
        delay: 50,
        duration: 200,
        start: "manual",
        selfDestroy: true,
      });
      myVivus.play(2.0, function () {});
      elementReference.style.opacity = "1";
      return () => {
        if (props.animateOnlyOnce !== true) {
          elementReference.style.opacity = "0";
        }
        myVivus.destroy();
      };
    }
  }, [props.animateOnlyOnce]);

  useEffect(() => {
    const elementReference = svgRef.current;
    if (
      elementReference &&
      visible &&
      !isPDFExport() &&
      (props.animateOnlyOnce !== true || !wasVisibleRef.current)
    ) {
      return animate();
    }
    return () => {};
  }, [visible, props.animateOnlyOnce, animate]);

  return (
    <div
      className={classNames(props.containerClassName, {
        "cursor-pointer": props.clickToRestart === true,
      })}
      onClick={
        props.clickToRestart === true
          ? () => {
              animate();
            }
          : undefined
      }
    >
      <object
        ref={svgRef}
        data={props.svgURL}
        datatype="image/svg+xml"
        className={classNames(props.className, {
          "pointer-events-none": props.clickToRestart === true,
        })}
        style={{
          opacity:
            (props.animateOnlyOnce === true && wasVisibleRef.current) ||
            isPDFExport()
              ? "1"
              : "0",
        }}
        type="image/svg+xml"
      ></object>
    </div>
  );
}
