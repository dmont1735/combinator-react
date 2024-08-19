import { CardType, Combination, ElementType } from "./@types/Types";

export const vwToPx = (vw: number): number => {
  return (vw / 100) * window.innerWidth;
};

export const vhToPx = (vh: number): number => {
  return (vh / 100) * window.innerHeight;
};

export const cardsSize: { width: number; height: number } = {
  width: vwToPx(4.2),
  height: vhToPx(2),
};

export const isColliding = (
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

export function populateStorage() {
  if (!localStorage.getItem("elements")) {
    let initialElements: ElementType[] = [
      { name: "Water", rank: 0 },
      { name: "Fire", rank: 0 },
    ];
    saveToLocalStorage("elements", initialElements);
  }

  if (!localStorage.getItem("combinations")) {
    let initialCombinations: Combination[] = [
      {
        parentA: { name: "Water", rank: 0 },
        parentB: { name: "Fire", rank: 0 },
        child: { name: "Smoke", rank: 1 },
      },
    ];
    saveToLocalStorage("combinations", initialCombinations);
  }
}

export const removeFromLocalStorage = (key: string): void => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error("Error removing from localStorage", error);
  }
};
