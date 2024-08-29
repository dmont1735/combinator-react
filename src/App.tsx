import "./App.css";
import Panel from "../lib/containers/panel/Panel";
import Board from "../lib/containers/board/Board";
import { useEffect, useRef } from "react";
import CardProvider from "./context/CardContext";
import ElementProvider from "./context/ElementContext";

const App: React.FC = () => {
  useEffect(() => {
    const handleMouseDown = (event: MouseEvent) => {
      if (event.button === 1) {
        event.preventDefault();
      }
    };

    document.addEventListener("mousedown", handleMouseDown);

    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
    };
  }, []);

  const boardRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className="canvas">
      <ElementProvider>
        <CardProvider>
        <Panel boardRef={boardRef} />
          <div ref={boardRef}>
            <Board />
          </div>          
        </CardProvider>
      </ElementProvider>
    </div>
  );
};

export default App;
