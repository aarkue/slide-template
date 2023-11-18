import { createContext } from "react";

export const SlideContext = createContext<{ visible: boolean }>({
  visible: false,
});

export type PresentationState = {
  currentSlideIndex: number;
  allSlides: Element[];
  reveal: Reveal.Api;
};
export const PresentationContext = createContext<PresentationState | undefined>(
  undefined,
);
