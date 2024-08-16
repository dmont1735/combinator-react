import { useContext } from "react";
import { CardContext } from "../../../src/context/CardContext";
import { ElementContext } from "../../../src/context/ElementContext";
import Card from "../../components/card/Card";

const Board = () => {
  const cardContext = useContext(CardContext);
  const elementContext = useContext(ElementContext);

  if (!cardContext || !elementContext) {
    throw new Error("Board must be used within both a CardContext and a ElementContext");
  }

  const handleSetPosition = (
    index: number,
    newPosition: { x: number; y: number }
  ) => {
    cardContext.setCards((previousCards) => {
      let updatedCards = [...previousCards];
      updatedCards[index].position = newPosition;
      return updatedCards;
    });
  };

  return (
    <div className="board">
      {cardContext.cards.map((card, index) => (
        <Card
          card={card}
          setPosition={(newPosition: { x: number; y: number }) => {
            handleSetPosition(index, newPosition);
          }}
          removeCard={cardContext.removeCard}
        />
      ))}
    </div>
  );
};

export default Board;
