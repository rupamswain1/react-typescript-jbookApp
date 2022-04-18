import { ActionType } from '../action-types'
import { Dispatch } from 'redux'
import { Action } from '../actions'
import { Cell } from '../cell'
import axios from 'axios'
import {
  MoveCellAction,
  DeleteCellAction,
  InsertCellAfterAction,
  UpdateCellAction,
  Direction,
  BundleCompleteAction,
  BundleStartAction,
  FetchCellsAction,
  FetchCellsCompleteAction,
  FetchCellsErrorAction,
} from '../actions'
import { CellType } from '../cell'

import bundle from '../../bundler'
import { RootState } from '../reducers'

export const updateCell = (id: string, content: string): UpdateCellAction => {
  return {
    type: ActionType.UPDATE_CELL,
    payload: {
      id: id,
      content: content,
    },
  }
}

export const deleteCell = (id: string): DeleteCellAction => {
  return {
    type: ActionType.DELETE_CELL,
    payload: id,
  }
}

export const moveCell = (id: string, direction: Direction): MoveCellAction => {
  return {
    type: ActionType.MOVE_CELL,
    payload: {
      id,
      direction,
    },
  }
}

export const insertCellAfter = (
  id: string | null,
  type: CellType,
): InsertCellAfterAction => {
  return {
    type: ActionType.INSERT_CELL_AFTER,
    payload: {
      id: id,
      type: type,
    },
  }
}

export const bundleStart = (cellId: string): BundleStartAction => {
  return {
    type: ActionType.BUNDLE_START,
    payload: {
      cellId: cellId,
    },
  }
}

export const bundleComplete = (
  cellId: string,
  result: {
    code: string
    error: any
  },
): BundleCompleteAction => {
  return {
    type: ActionType.BUNDLE_COMPLETE,
    payload: {
      cellId: cellId,
      bundle: {
        code: result.code,
        error: result.error,
      },
    },
  }
}

export const fetchCells = (): FetchCellsAction => {
  return { type: ActionType.FETCH_CELLS }
}

export const fetchCellsComplete = (cells: Cell[]): FetchCellsCompleteAction => {
  return {
    type: ActionType.FETCH_CELLS_COMPLETE,
    payload: cells,
  }
}

export const fetchCellsError = (err: string): FetchCellsErrorAction => {
  return {
    type: ActionType.FETCH_CELLS_ERROR,
    payload: err,
  }
}

export const createBundle = (cellId: string, input: string) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch(bundleStart(cellId))
    const result = await bundle(input)
    dispatch(bundleComplete(cellId, result))
  }
}

export const fetchCellsFromApi = () => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch(fetchCells())
    try {
      const { data }: { data: Cell[] } = await axios.get('/cells')
      dispatch(fetchCellsComplete(data))
    } catch (err) {
      let errMsg = ''
      if (err instanceof Error) errMsg = err.message
      dispatch(fetchCellsError(errMsg))
    }
  }
}

export const saveCells = () => {
  return async (dispatch: Dispatch<Action>, getState: () => RootState) => {
    const {
      cells: { data, order },
    } = getState()

    const cells = order.map((id) => data[id])
    console.log(cells)
    try {
      await axios.post('/cells', { cells })
    } catch (err) {
      let errMsg = ''
      if (err instanceof Error) errMsg = err.message

      dispatch({
        type: ActionType.SAVE_CELLS_ERROR,
        payload: errMsg,
      })
    }
  }
}
