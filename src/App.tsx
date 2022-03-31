import React from 'react';
import { Provider } from 'react-redux';
import { store } from './reduxState';
import CellList from './components/cellList/CellList';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <CellList />
      </div>
    </Provider>
  );
}

export default App;
