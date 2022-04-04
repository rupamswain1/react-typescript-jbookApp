import { combineReducers } from 'redux'
import CellReducer from './cellReducer'
import { bundleReducer } from './bundlesRduce'

const reducers = combineReducers({
  cells: CellReducer,
  bundle: bundleReducer,
})

export default reducers

export type RootState = ReturnType<typeof reducers>
