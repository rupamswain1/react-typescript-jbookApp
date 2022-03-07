import React from 'react';
import { Provider } from 'react-redux';
import { store } from './reduxState';
import CodeCell from './components/codeCell/CodeCell';
import MarkDownEditor from './components/markDownEditor/MarkDownEditor';
import CellList from './components/cellList/CellList';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        {/* <MarkDownEditor />
        {<CodeCell />} */}
        <CellList />
      </div>
    </Provider>
  );
}

export default App;
