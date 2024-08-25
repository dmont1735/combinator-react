import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";
import { CardType } from "../@types/Types";

export interface CardContextInterface {
  cards: CardType[];
  setCards: Dispatch<SetStateAction<CardType[]>>;
  addCard: (name: string, rank: number, position?: { x: number; y: number }) => void;
  removeCard: (card: CardType) => void;
}

export const CardContext = createContext<CardContextInterface | null>(null);

type CardProviderProps = {
  children: ReactNode;
};

const getRandomPosition = () => {
  return {
    x: Math.random() * 1920,
    y: Math.random() * 1080,
  };
};

export default function CardProvider({ children }: CardProviderProps) {
  const [cards, setCards] = useState<CardType[]>([]);

  const getCardColor = (rank:number)=>{
    switch(rank){
      case 0:
        return "#91d0ed";
      case 1:
        return "#91edd4";
      case 2:
        return "#e3eb9d";
      default:
        return "#e6c9a3";
    }
  }

  const addCard = (name: string, rank:number, position?: { x: number; y: number }) => {
    const newCard: CardType = {
      name: name,
      color: getCardColor(rank),
      position: position !== undefined ? position : getRandomPosition(),
    };
    setCards((cards) => [...cards, newCard]);
  };

  const removeCard = (card: CardType) => {
    setCards((cards) => {
      return cards.filter((_) => _ !== card);
    });
  };

  return (
    <CardContext.Provider value={{ cards, setCards, addCard, removeCard }}>
      {children}
    </CardContext.Provider>
  );
}
