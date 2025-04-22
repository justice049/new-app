import { configureStore } from '@reduxjs/toolkit'
import CollApsedReducer from './reducers/CollapsedReducer'
import LoadingReducer from './reducers/LoadingReducer'

const store = configureStore({
  reducer: {
    CollApsedReducer, // 自动组合多个 reducer
    LoadingReducer
  },
})

export default store
