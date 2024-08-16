import React from "react";
import placeholderIcon from "../../assets/Placeholder.png";
import "./element.css";

const path = "../../../src/assets/";
const extension = ".png";

interface ElementProps {
  name: string;
  onAddCard: (name: string) => void;
}

const Element: React.FC<ElementProps> = ({ name, onAddCard }) => {
  let imgSrc: string = path + name + extension;
  imgSrc = placeholderIcon;

  return (
    <button onClick={() => onAddCard(name)} className="element">
      <div className="element-icon">
        <img src={imgSrc}></img>
      </div>
      <div className="element-name">{name}</div>
    </button>
  );
};

export default Element;
