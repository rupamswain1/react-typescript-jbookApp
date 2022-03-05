import { ActionType } from '../action-types'
import { Action } from '../actions'
import { Cell } from '../cell'
import { produce } from 'immer'

interface CellState {
  loading: boolean
  error: string | null
  order: string[]
  data: {
    [key: string]: Cell
  }
}

const InitialState: CellState = {
  loading: false,
  error: null,
  order: [],
  data: {},
}

const CellReducer = produce(
  (state: CellState = InitialState, action: Action): CellState => {
    switch (action.type) {
      case ActionType.UPDATE_CELL:
        const { id, content } = action.payload
        state.data[id].content = content
        return state
      case ActionType.DELETE_CELL:
        delete state.data[action.payload]
        state.order = state.order.filter((id) => id !== action.payload)
        return state
      case ActionType.MOVE_CELL:
        const { direction } = action.payload
        const index = state.order.findIndex((id) => id === action.payload.id)
        const targetIndex = direction === 'up' ? index - 1 : index + 1

        if (targetIndex < 0 || targetIndex > state.order.length - 1) {
          return state
        }
        state.order[index] = state.order[targetIndex]
        state.order[targetIndex] = action.payload.id
        return state
      case ActionType.INSERT_CELL_BEFORE:
        return state
      default:
        return state
    }
    return state
  },
)

export default CellReducer
