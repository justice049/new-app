import Login from '../pages/Login';
import Home from '../pages/Home';
import ProtectedRoute from '../ProtectedRoute';
import { createBrowserRouter, RouterProvider,Navigate} from 'react-router-dom';


//配置路由
const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    index: true,
    element: <Home />,
  },
//   {
//     path: '/user-manage',
//     children: [
//       {
//         path: 'list',
//         element: (
//             <ProtectedRoute>
//             <UserList />
//           </ProtectedRoute>
//         ),
//       },
//     ],
//   },
//   {
//     path: '/right-manage',
//     children: [
//       {
//         path: 'role/list',
//         element: <RoleList />,
//       },
//       {
//         path: 'right/list',
//         element: <RightList />,
//       },
//     ],
//   },
//   {
//     path: '/news-manage',
//     children: [
//       {
//         path: 'draft',
//         element: <DraftBox />,
//       },
//       {
//         path: 'category',
//         element: <Category />,
//       },
//     ],
//   },
]);
export default router