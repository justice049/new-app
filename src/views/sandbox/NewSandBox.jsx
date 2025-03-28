import SideMenu from "../../components/sandbox/SideMenu";
import TopHeader from "../../components/sandbox/TopHeader";
import { Routes, Route } from "react-router-dom";
import Home from "./home/Home";
import RightList from "./right-manage/RightList";
import UserList from "./user-manage/UserList";
import RoleList from "./right-manage/RoleList";
import { Navigate } from "react-router-dom";
import Nopermission from "../sandbox/nopermission/Nopermission";
//引入antd
import { theme, Layout, ConfigProvider } from "antd";

//引入自己写的css
import "./NewSandbox.css";
//解构Layout
const { Content } = Layout;

function NewSandbox() {
//解构theme
    const { token } = theme.useToken(); // 获取主题 token
    const { colorBgContainer, borderRadiusLG } = token;

    return (
       <ConfigProvider> <Layout>
            {/* 侧边栏 */}
            <SideMenu></SideMenu>
            <Layout>
                {/* 顶部栏 */}
                <TopHeader></TopHeader>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        // 溢出隐藏
                        overflow:'auto',
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
            >
            <Routes>
                <Route path='/home' element={<Home />} />
                <Route path='/user-manage/list' element={<UserList />} />
                <Route path='/right-manage/right/list' element={<RightList />} />
                <Route path='/right-manage/role/list' element={<RoleList />} />
                <Route path='/' element={<Navigate to='/home' />} />
                <Route path='*' element={<Nopermission />} />
            </Routes>
            </Content>
        </Layout>
        </Layout></ConfigProvider>
    
    );
}

export default NewSandbox;