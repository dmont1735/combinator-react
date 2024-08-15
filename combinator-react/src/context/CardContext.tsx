import { Dispatch, ReactNode, SetStateAction, createContext, useState } from "react";

export type CardType = {
  name: string;
  position: { x: number; y: number };
};

export interface CardContextInterface {
  cards: CardType[];
  setCards: Dispatch<SetStateAction<CardType[]>>;
  addCard: (name:string) =>void;
  removeCard: (card:CardType) => void;
}

export const CardContext = createContext<CardContextInterface | null>(null);

type CardProviderProps = {
    children: ReactNode;
}

const getRandomPosition = () =>{
    return {
        x: Math.random() * 1920,
        y: Math.random() * 1080,
    }
}

export default function CardProvider({children}:CardProviderProps){
    const [cards, setCards] = useState<CardType[]>([]);

    const addCard = ((name:string)=>{
        const newCard:CardType = {
            name:name,
            position: getRandomPosition()
        }
        setCards((cards) => [...cards, newCard]);
    });

    const removeCard = ((card:CardType) =>{
        setCards((cards) =>{
            return cards.filter((_)=>_ !== card);
        })
    });

    return (
        <CardContext.Provider value={ {cards, setCards, addCard, removeCard}}>
            {children}
        </CardContext.Provider>
    )
}