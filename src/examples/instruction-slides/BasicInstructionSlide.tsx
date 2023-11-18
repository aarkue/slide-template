import TitleContentSlide from "../../slide-templates/TitleContentSlide";

export default function BasicInstructionSlide() {
  return (
    <TitleContentSlide
      title={<h2>Headings, Highlights and Lists</h2>}
      content={
        <div className="h-full w-full">
          <ul>
            <li>
              All the goodness, features and plugins of{" "}
              <a
                href="https://revealjs.com/"
                target="_blank"
                referrerPolicy="no-referrer"
              >
                revealjs
              </a>
            </li>
            <li className="mb-4">
              Everything you already <span className="text-blue-400">know</span>{" "}
              and <span className="text-rose-500">love</span>
            </li>
            <li>
              For instance...
              <ol>
                <li>PDF Export ✨</li>
                <li>Rich ecosystem of plugins 💫</li>
                <ul>
                  <li className="text-3xl text-gray-700">
                    like zoom, speaker notes, ...
                  </li>
                </ul>
                <li>Transitions & Animations</li>
              </ol>
            </li>
          </ul>
        </div>
      }
    />
  );
}
