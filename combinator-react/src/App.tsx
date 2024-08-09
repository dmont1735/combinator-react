import "./App.css";
import ElementsPanel from "../lib/containers/elementsPanel/ElementsPanel";
import Board from "../lib/containers/board/Board";
import { useEffect } from "react";

function App() {

    useEffect(() => {
      const handleMouseDown = (event: MouseEvent) => {
        if (event.button === 1) { // Middle mouse button
          event.preventDefault();
        }
      };
  
      document.addEventListener('mousedown', handleMouseDown);
  
      return () => {
        document.removeEventListener('mousedown', handleMouseDown);
      };
    }, []);
  
  return (
    <div className="canvas">
      <ElementsPanel elmnts={["Water", "Fire"]}></ElementsPanel>
      <Board  elmnts={["Water", "Fire"]}></Board>
    </div>
  );
}

export default App;
