import { Suspense, lazy, useEffect, useState } from "react";
import { RevealContext, initReveal } from "./reveal/reaveal";
// We do not need to reset.css style from revealJS as the Tailwind CSS reset styles are already applied
// import "reveal.js/dist/reset.css";
import "reveal.js/dist/reveal.css";
import "katex/dist/katex.min.css";
import "./reveal/reveal-theme.css";
import { CONFIG } from "./config";
import Presentation from "./Presentation";

function App() {
  const [reveal, setReveal] = useState<Reveal.Api>();
  const ExcalidrawWrapper = lazy(
    () => import("./components/ExcalidrawWrapper"),
  );

  useEffect(() => {
    const r = initReveal(CONFIG.revealOptions);
    document.title = CONFIG.presentationTitle;

    setReveal(r);
  }, []);

  return (
    <>
      <RevealContext.Provider value={{ reveal }}>
        <Suspense
          fallback={
            <p className="absolute bottom-0 left-0 text-xs">
              Loading Excalidraw...
            </p>
          }
        >
          <ExcalidrawWrapper />
        </Suspense>
        <div className="reveal">
          <div className="slides">
            <Presentation />
          </div>
        </div>
      </RevealContext.Provider>
    </>
  );
}

export default App;
