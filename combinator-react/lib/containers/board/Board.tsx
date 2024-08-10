import React, { useState, useEffect } from 'react';
import Card from "../../components/card/Card";

interface BoardProps {
  elements: string[];
}

const Board: React.FC<BoardProps> = ({ elements }) => {
  const [elements_, setElements] = useState<[string, number, number][]>([]);

  useEffect(() => {
    const newElements: [string, number, number][] = elements.map((element, index) => {
      return [element, 100 * index + 10, 100 * index + 10];
    });

    setElements(newElements);
  }, [elements]);

  return (
    <div className='board'>
      {elements_.map(([name, xPos, yPos], i) => (
        <Card key={i} name={name} position={{ x: xPos, y: yPos }} />
      ))}
    </div>
  );
};

export default Board;
