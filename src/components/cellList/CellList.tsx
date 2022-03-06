import React from 'react';
import { useTypedSelector } from '../../hooks/use-typed-selector';

const CellList: React.FC = () => {
  useTypedSelector(({ cells: { data, order } }) => {
    return order.map((id) => {
      return data[id];
    });
  });
  return <div>Hi</div>;
};
export default CellList;
