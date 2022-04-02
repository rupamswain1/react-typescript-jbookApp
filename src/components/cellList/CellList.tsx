import React, { Fragment } from 'react';
import { useTypedSelector } from '../../hooks/use-typed-selector';
import CellListItems from '../cellListItems/CellListItems';
import AddCell from '../addCell/AddCell';

import './cell-list.scss'

const CellList: React.FC = () => {
  const cells = useTypedSelector(({ cells: { data, order } }) => {
    return order.map((id) => {
      return data[id];
    });
  });
  const renderedCells = cells.map((cell) => {
    return (
      <Fragment key={cell.id}>
        <CellListItems cell={cell} />
        <AddCell nextCellId={cell.id} />
      </Fragment>
    );
  });

  return (
    <div className="cellList-container">
      <AddCell nextCellId={null} />
      {renderedCells}
    </div>
  );
};
export default CellList;
