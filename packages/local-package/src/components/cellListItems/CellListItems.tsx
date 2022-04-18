import React from 'react';
import { Cell } from '../../reduxState/cell';
import CodeCell from '../codeCell/CodeCell';
import MarkDownEditor from '../markDownEditor/MarkDownEditor';

interface CellListItemProps {
  cell: Cell;
}

const CellListItems: React.FC<CellListItemProps> = ({ cell }) => {

  if (cell.type === 'code') {
    return <CodeCell cell={cell} />;
  } else {
    return <MarkDownEditor cell={cell} />;
  }
};

export default CellListItems;
