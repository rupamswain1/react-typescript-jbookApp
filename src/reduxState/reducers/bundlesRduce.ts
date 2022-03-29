import produce from 'immer'
import { isArrowFunction } from 'typescript'
import { ActionType } from '../action-types'
import { Action } from '../actions'

interface BundleState {
  [key: string]: {
    loading: boolean
    code: string
    err: any
  }
}

const initialState: BundleState = {}

export const bundleReducer = produce(
  (state: BundleState = initialState, action: Action): BundleState => {
    switch (action.type) {
      case ActionType.BUNDLE_START:
        state[action.payload.cellId] = {
          loading: true,
          code: '',
          err: '',
        }
        return state
      case ActionType.BUNDLE_COMPLETE:
        state[action.payload.cellId] = {
          loading: false,
          code: action.payload.bundle.code,
          err: action.payload.bundle.error,
        }
        return state
      default:
        return state
    }
  },
)
