import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";
import { CardType, Combination, ElementType } from "../@types/Types";
import {
  loadFromLocalStorage,
  populateStorage,
  saveToLocalStorage,
} from "../utils";

export interface ElementContextInterface {
  elements: ElementType[];
  setElements: Dispatch<SetStateAction<ElementType[]>>;
  combinations: Combination[];
  combine: (cardA: CardType, cardB: CardType) => ElementType | null;
  resetData: () => void;
}

export const ElementContext = createContext<ElementContextInterface | null>(
  null
);

type ElementProviderProps = {
  children: ReactNode;
};

export default function ElementProvider({ children }: ElementProviderProps) {
  populateStorage();

  const [elements, setElements] = useState<ElementType[]>(
    loadFromLocalStorage("elements") as ElementType[]
  );
  const [combinations] = useState<Combination[]>(
    loadFromLocalStorage("combinations") as Combination[]
  );

  const combine = (cardA: CardType, cardB: CardType) => {
    let combinationResult = combinations.find(
      (_) =>
        (_.parentA.name === cardA.name && _.parentB.name === cardB.name) ||
        (_.parentB.name === cardA.name && _.parentA.name === cardB.name)
    );
    if (combinationResult !== undefined) {
      let newElement = combinationResult.child;
      if (!elements.some(({ name }) => name === newElement.name)) {
        setElements(() => {
          let elmts = [...elements, newElement];
          saveToLocalStorage("elements", elmts);
          return elmts;
        });
      }
      return combinationResult.child;
    } else {
      return null;
    }
  };

  const resetData = () => {
    populateStorage(true);
    setElements(loadFromLocalStorage("elements") as ElementType[]);
  };

  return (
    <ElementContext.Provider
      value={{
        elements,
        setElements,
        combinations,
        combine,
        resetData,
      }}
    >
      {children}
    </ElementContext.Provider>
  );
}
