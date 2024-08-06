import React from "react";
import placeholderIcon from "../../../src/assets/Placeholder.png";
import "./element.css";

const path = "../../../src/assets/";
const extension = ".png";

interface ElementProperties {
  name: string;
}

const element = (props: ElementProperties) => {
let imgSrc:string = path + props.name + extension;
imgSrc = placeholderIcon;

  return (
    <div className="element">
      <div className="element-icon">
        <img src={imgSrc}></img>
      </div>
      <div className="shape text element-name">
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

export default element;
