import { ReactNode } from "react";
import Slide from "./Slide";

interface TitleContentSlideProps {
  title: ReactNode;
  content: ReactNode;
}

export default function TitleContentSlide(props: TitleContentSlideProps) {
  return (
    <Slide textAlign="left" padding>
      {props.title}
      <div className="h-[2rem]"></div>
      {props.content}
    </Slide>
  );
}
