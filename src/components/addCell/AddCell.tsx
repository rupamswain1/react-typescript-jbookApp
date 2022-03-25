import React from 'react';
import { useActions } from '../../hooks/use-actions';

import './addCell.scss';

interface addCellProps {
  nextCellId: string;
}

const AddCell: React.FC<addCellProps> = ({ nextCellId }) => {
  const { insertCellBefore } = useActions();
  return (
    <div className="addCell-container">
      <button onClick={() => insertCellBefore(nextCellId, 'code')}>
        + Code
      </button>
      <button onClick={() => insertCellBefore(nextCellId, 'text')}>
        + Text
      </button>
    </div>
  );
};

export default AddCell;
