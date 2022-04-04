import { ActionType } from '../action-types'
import { Dispatch } from 'redux'
import { Action } from '../actions'
import {
  MoveCellAction,
  DeleteCellAction,
  InsertCellAfterAction,
  UpdateCellAction,
  Direction,
  BundleCompleteAction,
  BundleStartAction,
} from '../actions'
import { CellType } from '../cell'

import bundle from '../../bundler'

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

export const createBundle = (cellId: string, input: string) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch(bundleStart(cellId))
    const result = await bundle(input)
    dispatch(bundleComplete(cellId, result))
  }
}
