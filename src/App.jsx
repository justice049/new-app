import { RouterProvider } from 'react-router-dom'
import router from './router/indexRouter'
import './App.css'
import { Provider } from 'react-redux'
import { store,persistor } from './redux/store'
import { PersistGate } from 'redux-persist/integration/react'
// 优化体验

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />;
      </PersistGate>
    </Provider>
  )
}

export default App
