import { createHashRouter } from 'react-router-dom';
import Login from '../views/login/Login';
import NewSandbox from '../views/sandbox/NewSandBox';
import ProtectedRoute from '../ProtectedRoute';

const router = createHashRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/*',
    element: (
       <NewSandbox />
      // <ProtectedRoute>
       
      // </ProtectedRoute>
    ),
  },
]);

export default router;