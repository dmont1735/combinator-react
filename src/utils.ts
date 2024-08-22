import { CardType } from "./@types/Types";
import initialCombinations from "../lib/data/combinations.json";
import initialElements from "../lib/data/elements.json";

const vwToPx = (vw: number): number => {
  return (vw / 100) * window.innerWidth;
};

const vhToPx = (vh: number): number => {
  return (vh / 100) * window.innerHeight;
};

const cardsSize: { width: number; height: number } = {
  width: vwToPx(4.2),
  height: vhToPx(2),
};

const isColliding = (
  posA: { x: number; y: number },
  posB: { x: number; y: number },
  offset: { x: number; y: number }
): boolean => {
  return (
    posA.x < posB.x + offset.x &&
    posA.x + offset.x > posB.x &&
    posA.y < posB.y + offset.y &&
    posA.y + offset.y > posB.y
  );
};

export const areCardsColliding = (cardA: CardType, cardB: CardType) => {
  if (cardA === cardB) {
    return false;
  }
  return isColliding(cardA.position, cardB.position, {
    x: cardsSize.width,
    y: cardsSize.height,
  });
};

export const saveToLocalStorage = <T>(key: string, value: T) => {
  try {
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
  } catch (error) {
    console.error("Error saving to localStorage", error);
  }
};

export const loadFromLocalStorage = <T>(key: string): T | null => {
  try {
    const serializedValue = localStorage.getItem(key);
    if (serializedValue === null) {
      return null;
    }
    return JSON.parse(serializedValue) as T;
  } catch (error) {
    console.error("Error loading from localStorage", error);
    return null;
  }
};

export function populateStorage(reset?: boolean) {
  if (!localStorage.getItem("elements") || reset) {
    saveToLocalStorage("elements", initialElements);
  }

  if (!localStorage.getItem("combinations") || reset) {
    saveToLocalStorage("combinations", initialCombinations);
  }
}
