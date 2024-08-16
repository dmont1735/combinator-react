import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";

export type ElementType = {
  name: string;
  rank?: number;
};

export interface ElementContextInterface {
  elements: ElementType[];
  elementsFound: ElementType[];
  setElements: Dispatch<SetStateAction<ElementType[]>>;
  setElementsFound: Dispatch<SetStateAction<ElementType[]>>;
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

  return (
    <ElementContext.Provider
      value={{ elements, elementsFound, setElements, setElementsFound }}
    >
      {children}
    </ElementContext.Provider>
  );
}
