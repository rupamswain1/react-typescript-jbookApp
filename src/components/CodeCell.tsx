import React,{useState} from 'react';
import CodeEditor from './codeEditor/Code-Editor';
import CodeOutput from './CodeOutput';

function CodeCell() {
 
  const [code,setCode]=useState<string>('');
  
  return (
    <div className="App">
      <CodeOutput code={code}/>
      <CodeEditor initialValue='const h="hello"; console.log(h)' setCode={setCode}/>
      
    </div>
  );
}

export default CodeCell;
