import { useContext } from "react";
import { CardContext } from "../../../src/context/CardContext";
import Card from "../../components/card/Card";

const Board = () => {
  const context = useContext(CardContext);

  if (!context) {
    throw new Error('Board must be used within a CardContext');
  }
  
  const { cards, setCards, removeCard } = context;

  const handleSetPosition = (
    index: number,
    newPosition: { x: number; y: number }
  ) => {
    setCards((previousCards) => {
      let updatedCards = [...previousCards];
      updatedCards[index].position = newPosition;
      return updatedCards;
    });
  };

  return (
    <div className="board">
      {cards.map((card, index) => (
        <Card
          card={card}
          setPosition={(newPosition: { x: number; y: number }) => {
            handleSetPosition(index, newPosition);
          }}
          removeCard={removeCard}
        />
      ))}
    </div>
  );
};

export default Board;
