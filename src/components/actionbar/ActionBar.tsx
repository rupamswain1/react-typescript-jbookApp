import React from 'react';
import { useActions } from '../../hooks/use-actions';

import './ActionBar.style.scss';

interface ActionBarProps {
  id: string;
}

const ActionBar: React.FC<ActionBarProps> = ({ id }) => {
  const { moveCell, deleteCell } = useActions();
  return (
    <div className="actionBar-container">
      <button
        onClick={() => {
          moveCell(id, 'up');
        }}
        className="actionbutton is-primary is-small"
      >
        <span className="icon">
          <i className="fas fa-arrow-up" />
        </span>
      </button>
      <button
        onClick={() => {
          moveCell(id, 'down');
        }}
        className="actionbutton is-primary is-small"
      >
        <span className="icon">
          <i className="fas fa-arrow-down" />
        </span>
      </button>
      <button
        onClick={() => {
          deleteCell(id);
        }}
        className="actionbutton is-primary is-small"
      >
        <span className="icon">
          <i className="fas fa-times" />
        </span>
      </button>
    </div>
  );
};

export default ActionBar;
