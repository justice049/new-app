import SideMenu from "../../components/sandbox/SideMenu";
import TopHeader from "../../components/sandbox/TopHeader";
import { Routes, Route } from "react-router-dom";
import Home from "../../views/sandbox/home/Home";
import RightList from "../../views/sandbox/right-manage/RightList";
import UserList from "../../views/sandbox/user-manage/UserList";
import RoleList from "../../views/sandbox/right-manage/RoleList";
import { Navigate } from "react-router-dom";
import Nopermission from "../../views/sandbox/nopermission/Nopermission";
//引入antd
import { theme, Layout, ConfigProvider } from "antd";

export default function NewsRouter() {
  return (
    <Routes>
        {/* 理应后端取数据，根据权限动态渲染 */}
      <Route path="/home" element={<Home />} />
      <Route path="/user-manage/list" element={<UserList />} />
      <Route path="/right-manage/right/list" element={<RightList />} />
      <Route path="/right-manage/role/list" element={<RoleList />} />
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="*" element={<Nopermission />} />
    </Routes>
  )
}
