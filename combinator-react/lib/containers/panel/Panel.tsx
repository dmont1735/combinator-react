import React from "react";
import Element from "../../components/element/Element";
import "./panel.css";

interface PanelProps {
  elements: string[];
}

const Panel: React.FC<PanelProps> = ({ elements }) => {
  return (
    <div className="panel">
      {[...Array(elements.length)].map((element, index) => (
        <Element key={index} name={elements[index]}></Element>
      ))}
    </div>
  );
};

export default Panel;
