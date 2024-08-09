import "./App.css";
import ElementsPanel from "../lib/containers/elementsPanel/ElementsPanel";
import Board from "../lib/containers/board/Board";

function App() {
  return (
    <div className="canvas">
      <ElementsPanel elmnts={["Water", "Fire"]}></ElementsPanel>
      <Board  elmnts={["Water", "Fire"]}></Board>
    </div>
  );
}

export default App;
