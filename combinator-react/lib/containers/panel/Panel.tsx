import React, { useContext } from "react";
import Element from "../../components/element/Element";
import "./panel.css";
import {CardContext} from "../../../src/context/CardContext";

interface PanelProps {
  elements: string[];
}

const Panel: React.FC<PanelProps> = ({ elements }) => {
  const context = useContext(CardContext);

  if (!context) {
    throw new Error('Board must be used within a CardContext');
  }
 
  return (
    <div className="panel">
      {[...Array(elements.length)].map((element, index) => (
        <Element key={index} name={elements[index]} onAddCard={context.addCard} />
      ))}
    </div>
  );
};

export default Panel;
