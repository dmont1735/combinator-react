import "./App.css";
import Panel from "../lib/containers/panel/Panel";
import Board from "../lib/containers/board/Board";
import { CardProps } from "../lib/components/card/Card";
import { useEffect, useState } from "react";

const App: React.FC = () => {
  const [cards, setCards] = useState<CardProps[]>([]);

  const addCard = (name: string) => {
    const newCard: CardProps = {
      name,
      position: {
        x: Math.random() * 1920, // Random x position
        y: Math.random() * 1080, // Random y position
      },
    };

    setCards((cards) => [...cards, newCard]);
  };

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
      <Panel elements={["Water", "Fire"]} onAddCard={addCard}></Panel>
      <Board cards={cards}></Board>
    </div>
  );
};

export default App;
