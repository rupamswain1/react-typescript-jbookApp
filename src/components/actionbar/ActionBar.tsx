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
          <img src="assets/arrow-up.svg" alt="up"/>
        </span>
      </button>
      <button
        onClick={() => {
          moveCell(id, 'down');
        }}
        className="actionbutton is-primary is-small"
      >
        <span className="icon">
        <img src="assets/arrow-down.svg" alt="down"/>
        </span>
      </button>
      <button
        onClick={() => {
          deleteCell(id);
        }}
        className="actionbutton is-primary is-small"
      >
        <span className="icon">
          <img src="assets/x.svg" alt="close"/>
        </span>
      </button>
    </div>
  );
};

export default ActionBar;
