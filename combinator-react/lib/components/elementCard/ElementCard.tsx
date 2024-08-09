import React, { useState } from "react";
import placeholderIcon from "../../../src/assets/Placeholder.png";
import "./elementCard.css";

const path = "../../../src/assets/";
const extension = ".png";

interface ElementCardProperties {
  name: string;
  position: { x: number; y: number };
}

const elementCard = (props: ElementCardProperties) => {
  let imgSrc: string = path + props.name + extension;
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
      className="elementCard"
      style={{
        position: "absolute",
        left: props.position.x,
        top: props.position.y,
      }}
    >
      <div className="elementCard-icon">
        <img src={imgSrc}></img>
      </div>
      <div className="shape text elementCard-name">
        <div className="text-node-html">
          <div className="root rich-text root-0">
            <div className="paragraph-set root-0-paragraph-set-0">
              <p className="paragraph root-0-paragraph-set-0-paragraph-0">
                <span className="text-node root-0-paragraph-set-0-paragraph-0-text-0">
                  {props.name}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default elementCard;
