import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  useEffect(() => {
    const hasLocalData = localStorage.getItem('userData'); // 检查本地存储中是否有用户数据
    if (!hasLocalData) {
      navigate('/login', { replace: true }); // 如果没有数据，重定向到登录页
    }
  }, [navigate]);

  // 如果有用户数据，渲染子组件
  return children;
}

export default ProtectedRoute;