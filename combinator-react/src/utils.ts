import { CardType } from "./@types/Types";

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
  return isColliding(cardA.position, cardB.position, {
    x: cardsSize.width,
    y: cardsSize.height,
  });
};
