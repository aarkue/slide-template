import AnimatedSvg from "../../components/AnimatedSvg";
import TitleContentSlide from "../../slide-templates/TitleContentSlide";

import excalidrawExampleURL from "../example.excalidraw.svg";

export default function AnimatedSvgInstructionSlide() {
  return (
    <TitleContentSlide
      title={<h2>Animated SVGs</h2>}
      content={
        <div className="h-full w-full">
          <ul>
            <li>
              Effortlessly{" "}
              <span className="text-purple-500 transition-all duration-150 hover:text-fuchsia-500 inline-block">
                animate
              </span>{" "}
              SVGs with a draw effect
            </li>
            <li>
              Powered by{" "}
              <a href="https://github.com/maxwellito/vivus" target="_blank" referrerPolicy="no-referrer">
                vivus.js
              </a> 🔌
            </li>
            <li>
              Also works great with{" "}
              <a href="https://excalidraw.com/" target="_blank" referrerPolicy="no-referrer">
                excalidraw
              </a>{" "}
              sketches
            </li>
          </ul>
          <AnimatedSvg
            clickToRestart
            // animateOnlyOnce={true}
            svgURL={excalidrawExampleURL}
            containerClassName={"w-full mt-8"}
            className={"h-[16rem] object-contain mx-auto"}
          />
          <span className="text-xs text-gray-600 text-center block">Click on the image to restart the animation</span>
        </div>
      }
    />
  );
}
