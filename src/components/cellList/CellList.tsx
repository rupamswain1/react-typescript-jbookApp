import React, { Fragment } from 'react';
import { useTypedSelector } from '../../hooks/use-typed-selector';
import CellListItems from '../cellListItems/CellListItems';
import AddCell from '../addCell/AddCell';

const CellList: React.FC = () => {
  const cells = useTypedSelector(({ cells: { data, order } }) => {
    return order.map((id) => {
      return data[id];
    });
  });
  const renderedCells = cells.map((cell) => {
    return (
      <Fragment key={cell.id}>
        <AddCell nextCellId={cell.id} />
        <CellListItems cell={cell} />
      </Fragment>
    );
  });

  return (
    <div className="cellList-container">
      {renderedCells}
      <AddCell nextCellId={null} />
    </div>
  );
};
export default CellList;
