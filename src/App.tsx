import React from 'react';
import CodeCell from './components/codeCell/CodeCell';
import { MarkDownEditor } from './components/markDownEditor/MarkDownEditor';
function App() {
 
  return (
    <div className="App">
      <MarkDownEditor/>
     {<CodeCell/>}
      
    </div>
  );
}

export default App;
