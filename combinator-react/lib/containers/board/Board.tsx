import React, { useState, useEffect } from 'react';
import ElementCard from "../../components/elementCard/ElementCard";

interface ElementCardsInBoard {
  elmnts: string[];
}

// Component definition
const Board = (props: ElementCardsInBoard) => {
  const [elements_, setElements] = useState<[string, number, number][]>([]);

  useEffect(() => {
    // Create a new array of elements to set in state
    const newElements: [string, number, number][] = props.elmnts.map((element, index) => {
      return [element, 100 * index + 10, 100 * index + 10];
    });

    // Update state once with the new array
    setElements(newElements);
  }, [props.elmnts]);

  return (
    <div className='board'>
      {elements_.map(([name, xPos, yPos], i) => (
        <ElementCard key={i} name={name} position={{ x: xPos, y: yPos }} />
      ))}
    </div>
  );
};

export default Board;
