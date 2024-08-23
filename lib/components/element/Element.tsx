import React from "react";
import "./element.css";

interface ElementProps {
  name: string;
  rank:number;
  onAddCard: (name: string, rank:number) => void;
}

const Element: React.FC<ElementProps> = ({ name, rank, onAddCard }) => {
  const imgSrc = new URL(`../../assets/${name}Badge.svg`, import.meta.url).href;

  return (
    <button onClick={() => onAddCard(name, rank)} className="element">
      <div className="element-icon">
        <img src={imgSrc}></img>
      </div>
      <div className="element-name">{name}</div>
    </button>
  );
};

export default Element;
