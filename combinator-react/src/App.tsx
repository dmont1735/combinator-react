import "./App.css";
import ElementsPanel from "../lib/containers/elementsPanel/ElementsPanel";

function App() {
  return (
    <div>
      <ElementsPanel elmnts={["Water", "Fire"]}></ElementsPanel>
    </div>
  );
}

export default App;
