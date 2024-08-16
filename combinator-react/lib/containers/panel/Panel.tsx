import React, { useContext } from "react";
import Element from "../../components/element/Element";
import "./panel.css";
import { CardContext } from "../../../src/context/CardContext";
import { ElementContext } from "../../../src/context/ElementContext";

const Panel = () => {
  const cardContext = useContext(CardContext);
  const elementContext = useContext(ElementContext);

  if (!cardContext || !elementContext) {
    throw new Error("Panel must be used within both a CardContext and a ElementContext");
  }

  return (
    <div className="panel">
      {elementContext.elementsFound.map((elementFound) => (
        <Element
          name={elementFound.name}
          onAddCard={cardContext.addCard}
        ></Element>
      ))}
    </div>
  );
};

export default Panel;
