import AnimatedSvgInstructionSlide from "./AnimatedSvgInstructionSlide";
import AnnotateInstructionSlide from "./AnnotateInstructionSlide";
import BasicInstructionSlide from "./BasicInstructionSlide";
import CustomizationInstructionSlide from "./CustomizationInstructionSlide";
import InteractiveInstructionSlide from "./InteractiveInstructionSlide";
import LatexInstructionSlide from "./LatexInstructionSlide";

export default function AllInstructionSlides() {
  return (
    <>
      <BasicInstructionSlide />
      <CustomizationInstructionSlide />
      <LatexInstructionSlide />
      <InteractiveInstructionSlide />
      <AnimatedSvgInstructionSlide />
      <AnnotateInstructionSlide />
    </>
  );
}
