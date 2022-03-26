import React from 'react';
import { useActions } from '../../hooks/use-actions';

import './addCell.scss';

interface addCellProps {
  nextCellId: string | null;
}

const AddCell: React.FC<addCellProps> = ({ nextCellId }) => {
  const { insertCellBefore } = useActions();
  return (
    <div className="addCell-container">
      <button
        className="btn code-btn"
        onClick={() => insertCellBefore(nextCellId, 'code')}
      >
        + Code
      </button>
      <button
        className="btn text-btn"
        onClick={() => insertCellBefore(nextCellId, 'text')}
      >
        + Text
      </button>
    </div>
  );
};

export default AddCell;
