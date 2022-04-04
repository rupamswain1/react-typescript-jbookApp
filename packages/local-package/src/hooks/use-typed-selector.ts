import { useSelector, TypedUseSelectorHook } from 'react-redux'
import { RootState } from '../reduxState/reducers'

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector
