import React, { useState } from 'react';
import { Cell } from '../../reduxState';
import CodeEditor from '../codeEditor/Code-Editor';
import CodeOutput from '../codeOutput/CodeOutput';
import Resizable from '../resizable/Resizable';

import './codeCell.style.scss';

interface CodeCellProps {
  cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const [code, setCode] = useState<string>('');
  const [err, setErr] = useState<any>('');
  return (
    <Resizable direction="vertical">
      <div className="codeCell-container">
        <Resizable direction="horizontal">
          <CodeEditor
            initialValue='const h="hello"; console.log(h)'
            setCode={setCode}
            setErr={setErr}
            cell={cell}
          />
        </Resizable>
        <CodeOutput code={code} err={err} />
      </div>
    </Resizable>
  );
};

export default CodeCell;
