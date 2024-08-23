import { useContext } from "react";
import { CardContext } from "../../../src/context/CardContext";
import { ElementContext } from "../../../src/context/ElementContext";
import Card from "../../components/card/Card";
import { areCardsColliding } from "../../../src/utils";
import { CardType } from "../../../src/@types/Types";

const Board = () => {
  const cardContext = useContext(CardContext);
  const elementContext = useContext(ElementContext);

  if (!cardContext || !elementContext) {
    throw new Error(
      "Board must be used within both a CardContext and a ElementContext"
    );
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

  const handleCheckCombination = (cardA: CardType) => {
    cardContext.cards.forEach((card) => {
      if (areCardsColliding(cardA, card)) {
        let newElement = elementContext.combine(cardA, card);

        if (newElement !== null) {
          cardContext.removeCard(cardA);
          cardContext.removeCard(card);
          cardContext.addCard(newElement.name, newElement.rank, cardA.position);
        }
      }
    });
  };

  const onHandleResetData = () => {
    elementContext.resetData();
    cardContext.cards.map((card) => {
      cardContext.removeCard(card);
    });
  };

  return (
    <div className="board">
      <button
        onClick={() => {
          onHandleResetData();
        }}
      >
        RESET DATA
      </button>
      {cardContext.cards.map((card, index) => (
        <Card
          card={card}
          checkCombination={() => {
            handleCheckCombination(card);
          }}
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
