import { useContext } from "react";
import Element from "../../components/element/Element";
import "./panel.css";
import { CardContext } from "../../../src/context/CardContext";
import { ElementContext } from "../../../src/context/ElementContext";
import { cardsSize } from "../../../src/utils";

export interface PanelProps {
  boardRef: React.RefObject<HTMLDivElement>;
}

const Panel: React.FC<PanelProps> = ({ boardRef }) => {
  const cardContext = useContext(CardContext);
  const elementContext = useContext(ElementContext);

  if (!cardContext || !elementContext) {
    throw new Error(
      "Panel must be used within both a CardContext and a ElementContext"
    );
  }

  const handleAddCard = (name: string, rank: number) => {
    let pos={x:0,y:0};

    if (boardRef.current) {
      const boardRect = boardRef.current.getBoundingClientRect();

      pos= {
        x: Math.random() * (boardRect.width - cardsSize.width*2),
        y: Math.random() * (boardRect.height - cardsSize.height*2),
      };
    }

    cardContext.addCard(name, rank, pos);
  };

  return (
    <div className="panel">
      {elementContext.elements.map((element, index) => (
        <Element
        key={"element"+index}
          name={element.name}
          rank={element.rank}
          onAddCard={handleAddCard}
        ></Element>
      ))}
    </div>
  );
};

export default Panel;
