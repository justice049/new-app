import { configureStore } from '@reduxjs/toolkit'
import CollApsedReducer from './reducers/CollapsedReducer'
import LoadingReducer from './reducers/LoadingReducer'

import { combineReducers} from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

const persistConfig = {
  key: 'root',
  storage: storage,
  blacklist: ['LoadingReducer']
  //放在黑名单中的数据不会被持久化
}

const reducer = combineReducers({
  CollApsedReducer,
  LoadingReducer
})

const persistedReducer = persistReducer(persistConfig, reducer)

const store = configureStore({
  reducer:persistedReducer
})
const persistor = persistStore(store)

export {store,persistor}
