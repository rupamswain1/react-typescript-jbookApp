import React from 'react';
import { useTypedSelector } from '../../hooks/use-typed-selector';
import CellListItems from '../cellListItems/CellListItems';

const CellList: React.FC = () => {
  const cells = useTypedSelector(({ cells: { data, order } }) => {
    return order.map((id) => {
      return data[id];
    });
  });
  const renderedCells = cells.map((cell) => {
    return <CellListItems key={cell.id} cell={cell} />;
  });

  return <div>{renderedCells}</div>;
};
export default CellList;
