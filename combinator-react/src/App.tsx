import "./App.css";
import Panel from "../lib/containers/panel/Panel";
import Board from "../lib/containers/board/Board";
import { useEffect } from "react";
import CardProvider from "./context/CardContext";

const App: React.FC = () => {
  const initialElements: string[] = ["Water", "Fire"];

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

  return (
    <div className="canvas">
      <CardProvider>
        <Panel elements={initialElements}></Panel>
        <Board></Board>
      </CardProvider>
    </div>
  );
};

export default App;
