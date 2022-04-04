import { useDispatch } from 'react-redux'
import { useMemo } from 'react'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../reduxState'

export const useActions = () => {
  const dispatch = useDispatch()
  return useMemo(() => {
    return bindActionCreators(ActionCreators, dispatch)
  }, [dispatch])
}
