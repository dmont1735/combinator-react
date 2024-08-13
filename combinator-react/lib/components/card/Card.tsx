import React, { useEffect, useState } from "react";
import placeholderIcon from "../../../src/assets/Placeholder.png";
import "./card.css";

const path = "../../../src/assets/";
const extension = ".png";

export interface CardProps {
  name: string;
  position: { x: number; y: number };
  setPosition?: (newPosition: { x: number, y: number}) => void;
}

const Card: React.FC<CardProps> = ({ name, position, setPosition }) => {
  const [isMounted, setIsMounted] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  let imgSrc: string = path + name + extension;
  imgSrc = placeholderIcon;

  const handleMouseDown = (event: React.MouseEvent) => {
    switch (event.button) {
      case 0:
        setIsDragging(true);
        setDragOffset({
          x: event.clientX - position.x,
          y: event.clientY - position.y,
        });
        break;

      case 1:
        setIsMounted(false);
        break;

      default:
        break;
    }
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (isDragging && setPosition) {
      setPosition({
        x: event.clientX - dragOffset.x,
        y: event.clientY - dragOffset.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

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
        cursor: isDragging ? "grabbing" : "grab",
      }}
    >
      <div className="card-icon">
        <img src={imgSrc}></img>
      </div>
      <div className="card-name">{name}</div>
    </div>
  );
};

export default Card;
