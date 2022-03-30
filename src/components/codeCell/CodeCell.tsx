import React, { useState } from 'react';
import { Cell } from '../../reduxState';
import ActionBar from '../actionbar/ActionBar';
import CodeEditor from '../codeEditor/Code-Editor';
import CodeOutput from '../codeOutput/CodeOutput';
import Resizable from '../resizable/Resizable';

import { useTypedSelector } from '../../hooks/use-typed-selector';

import './codeCell.style.scss';

interface CodeCellProps {
  cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const bundle=useTypedSelector((state)=>state.bundle[cell.id])
    console.log(bundle)
  return (
    <>
      <ActionBar id={cell.id} />
      <Resizable direction="vertical">
        <div className="codeCell-container">
          <Resizable direction="horizontal">
            <CodeEditor
              initialValue='const h="hello"; console.log(h)'
              cell={cell}
            />
          </Resizable>
          {bundle && <CodeOutput code={bundle.code} err={bundle.err}/>}
        </div>
      </Resizable>
    </>
  );
};

export default CodeCell;
