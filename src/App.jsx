import { RouterProvider} from 'react-router-dom';
import router from './router/indexRouter';
import './App.css'

function App() {
  return <RouterProvider router={router} />;
}

export default App;