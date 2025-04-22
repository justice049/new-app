import { configureStore } from '@reduxjs/toolkit'
import CollApsedReducer from './reducers/CollapsedReducer'

const store = configureStore({
  reducer: {
    CollApsedReducer, // 自动组合多个 reducer
  },
})

export default store
