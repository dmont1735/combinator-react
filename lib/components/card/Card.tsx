import React from "react";
import { CardType } from "../../../src/@types/Types";
import "./card.css";

export interface CardProps {
  card: CardType;
  setPosition: (newPosition: { x: number; y: number }) => void;
  checkCombination: () => void;
  removeCard: (card: CardType) => void;
  boardRef: React.RefObject<HTMLDivElement>;
}

const Card: React.FC<CardProps> = ({
  card,
  setPosition,
  checkCombination,
  removeCard,
  boardRef,
}) => {
  const [isDragging, setIsDragging] = React.useState(false);
  const dragOffset = React.useRef({ x: 0, y: 0 });
  const cardRef = React.useRef<HTMLDivElement>(null);
  const imgSrc = new URL(`../../assets/${card.name}Badge.svg`, import.meta.url).href;

  const handleMouseDown = (event: React.MouseEvent) => {
    event.preventDefault();

    switch (event.button) {
      case 0:
        setIsDragging(true);
        dragOffset.current = {
          x: event.clientX - card.position.x,
          y: event.clientY - card.position.y,
        };
        break;

      case 1:
        removeCard(card);
        break;

      default:
        break;
    }
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (isDragging && cardRef.current && boardRef.current) {
      const boardRect = boardRef.current.getBoundingClientRect();
      const cardRect = cardRef.current.getBoundingClientRect();

      let newX = event.clientX - boardRect.left - cardRect.width / 2;
      let newY = event.clientY - boardRect.top - cardRect.height / 2;

      if (newX < 0) {
        newX = 0;
      }
      if (newY < 0) {
        newY = 0;
      }
      if (newX + cardRect.width > boardRect.width) {
        newX = boardRect.width - cardRect.width;
      }
      if (newY + cardRect.height > boardRect.height) {
        newY = boardRect.height - cardRect.height;
      }

      cardRef.current.style.left = `${newX}px`;
      cardRef.current.style.top = `${newY}px`;
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);

    if (cardRef.current) {
      const newX = parseInt(cardRef.current.style.left || "0");
      const newY = parseInt(cardRef.current.style.top || "0");
      setPosition({ x: newX, y: newY });
      checkCombination();
    }
  };

  React.useEffect(() => {
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
      ref={cardRef}
      onMouseDown={handleMouseDown}
      className="card"
      style={{
        position: "absolute",
        left: card.position.x,
        top: card.position.y,
        cursor: isDragging ? "grabbing" : "grab",
        background: card.color,
      }}
    >
      <div className="card-icon">
        <img src={imgSrc} alt={`${card.name} icon`} />
      </div>
      <div className="card-name">{card.name}</div>
    </div>
  );
};

export default Card;
