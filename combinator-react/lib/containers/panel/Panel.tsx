import React from "react";
import Element from "../../components/element/Element";
import "./panel.css";

interface PanelProps {
  elements: string[];
  onAddCard: (name: string) => void;
}

const Panel: React.FC<PanelProps> = ({ elements, onAddCard }) => {
  return (
    <div className="panel">
      {[...Array(elements.length)].map((element, index) => (
        <Element key={index} name={elements[index]} onAddCard={onAddCard} />
      ))}
    </div>
  );
};

export default Panel;
