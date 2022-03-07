import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../reduxState'

export const useActions = () => {
  const dispatch = useDispatch()
  return bindActionCreators(ActionCreators, dispatch)
}
