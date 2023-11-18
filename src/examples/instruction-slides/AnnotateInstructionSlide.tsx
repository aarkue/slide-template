import TitleContentSlide from "../../slide-templates/TitleContentSlide";

export default function AnnotateInstructionSlide() {
  return (
    <TitleContentSlide
      title={<h2>Annotate Slides</h2>}
      content={
        <div className="h-full w-full">
          <ul>
            <li>
              <span className="font-bold bg-yellow-200 px-1">Annotate</span>{" "}
              slides during your presentation
            </li>
            <li>
              Powered by{" "}
              <a
                href="https://excalidraw.com/"
                target="_blank"
                referrerPolicy="no-referrer"
              >
                excalidraw
              </a>{" "}
            </li>
            <li>
              Simply press{" "}
              <kbd className="bg-gray-100 border shadow-inner px-1 py-1 rounded-lg font-mono">
                Shift
              </kbd>
              +
              <kbd className="bg-gray-100 border shadow-inner px-2 py-1 rounded-lg font-mono">
                d
              </kbd>{" "}
              to toggle annotations
            </li>
            <br />
            <li>Annotations are (temporarily) saved per slide</li>
          </ul>
        </div>
      }
    />
  );
}
