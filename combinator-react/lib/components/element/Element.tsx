import React from "react";
import placeholderIcon from "../../../src/assets/Placeholder.png";
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
      <div className="shape text element-name">
        <div className="text-node-html">
          <div className="root rich-text root-0">
            <div className="paragraph-set root-0-paragraph-set-0">
              <p className="paragraph root-0-paragraph-set-0-paragraph-0">
                <span className="text-node root-0-paragraph-set-0-paragraph-0-text-0">
                  {name}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </button>
  );
};

export default Element;
