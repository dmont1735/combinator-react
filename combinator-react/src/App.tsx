import "./App.css";
import Panel from "../lib/containers/panel/Panel";
import Board from "../lib/containers/board/Board";
import { useEffect } from "react";

const App: React.FC = () => {
  useEffect(() => {
    const handleMouseDown = (event: MouseEvent) => {
      if (event.button === 1) {
        // Middle mouse button
        event.preventDefault();
      }
    };

    document.addEventListener("mousedown", handleMouseDown);

    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
    };
  }, []);

  return (
    <div className="canvas">
      <Panel elements={["Water", "Fire"]}></Panel>
      <Board elements={["Water", "Fire"]}></Board>
    </div>
  );
};

export default App;
