import React from 'react';
import { useActions } from '../../hooks/use-actions';

import './addCell.scss';

interface addCellProps {
  nextCellId: string | null;
}

const AddCell: React.FC<addCellProps> = ({ nextCellId }) => {
  const { insertCellAfter } = useActions();
  return (
    <div className="addCell-container">
      <button
        className="btn code-btn"
        onClick={() => insertCellAfter(nextCellId, 'code')}
      >
        + Code
      </button>
      <button
        className="btn text-btn"
        onClick={() => insertCellAfter(nextCellId, 'text')}
      >
        + Text
      </button>
    </div>
  );
};

export default AddCell;
