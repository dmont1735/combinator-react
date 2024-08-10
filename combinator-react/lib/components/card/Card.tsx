import React, { useState } from "react";
import placeholderIcon from "../../../src/assets/Placeholder.png";
import "./card.css";

const path = "../../../src/assets/";
const extension = ".png";

interface CardProps {
  name: string;
  position: { x: number; y: number };
}

const Card: React.FC<CardProps> = ({ name, position }) => {
  let imgSrc: string = path + name + extension;
  imgSrc = placeholderIcon;

  const [isMounted, setIsMounted] = useState(true);

  const handleMouseDown = (event: React.MouseEvent) => {
    if (event.button === 1) {
      // 1 is the middle mouse button
      setIsMounted(false);
    }
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div
      onMouseDown={handleMouseDown}
      className="card"
      style={{
        position: "absolute",
        left: position.x,
        top: position.y,
      }}
    >
      <div className="card-icon">
        <img src={imgSrc}></img>
      </div>
      <div className="shape text card-name">
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
    </div>
  );
};

export default Card;
