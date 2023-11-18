import { useState } from "react";
import Latex from "../../components/Latex";
import TitleContentSlide from "../../slide-templates/TitleContentSlide";

function roundNumber(n: number) {
  return Math.round(n * 100) / 100.0;
}

export default function InteractiveInstructionSlide() {
  const [count, setCount] = useState(0);

  return (
    <TitleContentSlide
      title={<h2>Interactive Slides</h2>}
      content={
        <div className="h-full w-full">
          <ul>
            <li>
              Slides can be{" "}
              <span
                title="Nice!"
                className="text-blue-400 hover:text-purple-500 px-1 rounded-md bg-blue-50/50 underline hover:bg-purple-200 cursor-crosshair"
              >
                as interactive as you want
              </span>
            </li>
            <li>Interactivity + Math = 💖</li>
            <br />
            <li>
              <button
                className="bg-rose-300 px-2 py-1 rounded-md border border-rose-500 shadow hover:shadow-none hover:bg-rose-400 hover:border-rose-500 active:bg-rose-500"
                onClick={() => setCount((c) => c + 1)}
              >
                Click me
              </button>
              <ul>
                <li>
                  You clicked the button{" "}
                  <span className="text-blue-500">{count}</span> times already
                </li>
                <li>
                  <Latex
                    highlightChange
                    highlightColor="#9a3389"
                    math={String.raw`\sqrt{${count}} \approx ${roundNumber(
                      Math.sqrt(count),
                    )}`}
                  />
                </li>
                <li>
                  {count < 15 && <>Keep on clicking! </>}
                  {count >= 15 && <>Good job 🎖️</>}
                </li>
              </ul>
            </li>
          </ul>
        </div>
      }
    />
  );
}
