export type ElementType = {
  name: string;
  rank?: number;
};

export type CardType = {
  name: string;
  position: { x: number; y: number };
};

export type Combination = {
  parentA: ElementType;
  parentB: ElementType;
  child: ElementType;
};
