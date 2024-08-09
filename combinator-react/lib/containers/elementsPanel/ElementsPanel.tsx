import React from "react";
import Element from "../../components/element/Element";
import "./elementsPanel.css";

interface ElementsFound {
  elmnts: string[];
}

const ElementsPanel = (props: ElementsFound) => {
  return (
    <div className="elementsPanel">
      {[...Array(props.elmnts.length)].map((e, i) => (
        <Element key={i} name={props.elmnts[i]}></Element>
      ))}
    </div>
  );
};

export default ElementsPanel;
