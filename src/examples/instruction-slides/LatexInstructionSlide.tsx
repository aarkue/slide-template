import Latex from "../../components/Latex";
import TitleContentSlide from "../../slide-templates/TitleContentSlide";

export default function LatexInstructionSlide() {
  return (
    <TitleContentSlide
      title={
        <h2>
          <Latex math="\LaTeX" /> Support
        </h2>
      }
      content={
        <div className="h-full w-full">
          <ul>
            <li>
              Include <span className="text-purple-500">math expressions</span>{" "}
              in your slides
            </li>
            <li>
              Rendered with <Latex math="\KaTeX" /> (
              <a
                href="https://katex.org/"
                target="_blank"
                referrerPolicy="no-referrer"
              >
                katex.org
              </a>
              )
            </li>
            <li>
              Examples:
              <ul>
                <li>
                  <Latex math="S=\{e_1,e_2,e_3,\dots\}" />
                </li>
                <li>
                  <Latex
                    displayMode
                    math="\sum_{e \in S} e^i \neq 100 \; \forall_{i \in \mathbb{N}}"
                  />
                </li>
              </ul>
            </li>
          </ul>
        </div>
      }
    />
  );
}
