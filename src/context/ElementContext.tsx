import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";
import { CardType, Combination, ElementType } from "../@types/Types";

export interface ElementContextInterface {
  elements: ElementType[];
  elementsFound: ElementType[];
  setElements: Dispatch<SetStateAction<ElementType[]>>;
  setElementsFound: Dispatch<SetStateAction<ElementType[]>>;
  combinations: Combination[];
  combine: (cardA: CardType, cardB: CardType) => ElementType | null;
}

export const ElementContext = createContext<ElementContextInterface | null>(
  null
);

type ElementProviderProps = {
  children: ReactNode;
};

export default function ElementProvider({ children }: ElementProviderProps) {
  const [elements, setElements] = useState<ElementType[]>([]);
  const [elementsFound, setElementsFound] = useState<ElementType[]>([
    { name: "Water" },
    { name: "Fire" },
  ]);

  const combinations: Combination[] = [
    {
      parentA: { name: "Water", rank: 0 },
      parentB: { name: "Fire", rank: 0 },
      child: { name: "Smoke", rank: 1 },
    },
  ];

  const combine = (cardA: CardType, cardB: CardType) => {
    let combinationResult = combinations.find(
      (_) =>
        (_.parentA.name === cardA.name && _.parentB.name === cardB.name) ||
        (_.parentB.name === cardA.name && _.parentA.name === cardB.name)
    );
    if (combinationResult !== undefined) {
      let newElement = combinationResult.child;
      if (!elementsFound.some(({ name }) => name === newElement.name)) {
        setElementsFound([...elementsFound, newElement]);
      }
      return combinationResult.child;
    } else {
      return null;
    }
  };

  return (
    <ElementContext.Provider
      value={{
        elements,
        elementsFound,
        setElements,
        setElementsFound,
        combinations,
        combine,
      }}
    >
      {children}
    </ElementContext.Provider>
  );
}
