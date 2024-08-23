import React, { useEffect, useState } from "react";
import { CardType } from "../../../src/@types/Types";
import "./card.css";

export interface CardProps {
  card: CardType;
  setPosition: (newPosition: { x: number; y: number }) => void;
  checkCombination: () => void;
  removeCard: (card: CardType) => void;
}

const Card: React.FC<CardProps> = ({
  card,
  setPosition,
  checkCombination,
  removeCard,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const imgSrc = new URL(`../../assets/${card.name}Badge.svg`, import.meta.url).href;
  console.log(imgSrc);

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
    checkCombination();
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
        background: card.color
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
