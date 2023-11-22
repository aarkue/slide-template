import GradientTitle from "../components/GradientTitle";
import FullImageSlide from "../slide-templates/FullImageSlide";
import backgroundImageURL from "./background.jpg";

export default function EndSlide() {
  return (
    <FullImageSlide
      image={backgroundImageURL}
      titlePosition="top"
      title={
        <div className="flex flex-col justify-around h-full text-[6rem]">
          <h2 className="fragment  font-black">
            <GradientTitle
              pdfClasses="text-fuchsia-400"
              className="bg-gradient-to-tr from-fuchsia-400 to-rose-400"
            >
              Enough Room
            </GradientTitle>
          </h2>
          <h2 className="fragment  font-black">
            <GradientTitle
              pdfClasses="text-fuchsia-400"
              className="bg-gradient-to-tr from-fuchsia-400 to-rose-400"
            >
              for
            </GradientTitle>
          </h2>
          <h2 className="fragment">
            <GradientTitle
              pdfClasses="text-pink-300"
              textOutline={{ color: "#ffffffd5", width: "7px" }}
              className="from-pink-300/30 to-pink-300/30 bg-gradient-to-tr font-black"
            >
              Your Ideas
            </GradientTitle>
          </h2>
        </div>
      }
    />
  );
}
