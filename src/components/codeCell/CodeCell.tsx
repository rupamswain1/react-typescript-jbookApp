import React,{useState} from 'react';
import CodeEditor from '../codeEditor/Code-Editor';
import CodeOutput from '../codeOutput/CodeOutput';
import Resizable from '../resizable/Resizable';

import './codeCell.style.scss';

function CodeCell() {
 
  const [code,setCode]=useState<string>('');
  
  return (
    <Resizable direction='vertical'>    
      <div className="codeCell-container">
        <CodeEditor initialValue='const h="hello"; console.log(h)' setCode={setCode}/>
        <CodeOutput code={code}/>
      </div>
    </Resizable>

  );
}

export default CodeCell;
