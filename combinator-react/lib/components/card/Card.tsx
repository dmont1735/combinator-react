import React, { useEffect, useState } from "react";
import placeholderIcon from "../../assets/Placeholder.png";
import { CardType } from "../../../src/context/CardContext";
import "./card.css";

const path = "../../../src/assets/";
const extension = ".png";

export interface CardProps {
  card:CardType,
  setPosition: (newPosition: { x: number; y: number }) => void;
  removeCard: (card:CardType) => void;
}

const Card: React.FC<CardProps> = ({
  card,
  setPosition,
  removeCard,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  let imgSrc: string = path + name + extension;
  imgSrc = placeholderIcon;

  const handleMouseDown = (event: React.MouseEvent) => {
    event.preventDefault();

    switch (event.button) {
      case 0:
        setIsDragging(true);
        setDragOffset({
          x: event.clientX - card.position.x,
          y: event.clientY - card.position.y,
        });
        break;

      case 1:
        removeCard(card);
        break;

      default:
        break;
    }
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (isDragging) {
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

  return (
    <div
      onMouseDown={handleMouseDown}
      className="card"
      style={{
        position: "absolute",
        left: card.position.x,
        top: card.position.y,
        cursor: isDragging ? "grabbing" : "grab",
      }}
    >
      <div className="card-icon">
        <img src={imgSrc}></img>
      </div>
      <div className="card-name">{card.name}</div>
    </div>
  );
};

export default Card;
