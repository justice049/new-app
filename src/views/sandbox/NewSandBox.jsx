import SideMenu from "../../components/sandbox/sidemenu";
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
import NewsRouter from "../../components/sandbox/NewsRouter";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { useLocation } from 'react-router-dom'

//引入自己写的css
import "./NewSandbox.css";
import { useEffect } from "react";
//解构Layout
const { Content } = Layout;

function NewSandbox() {
    const location = useLocation();
    useEffect(() => {
        // 当路由变化时，启动进度条
        NProgress.start();
        // 模拟延迟，延迟一定时间后完成进度条
        const timer = setTimeout(() => {
            NProgress.done();
        }, 500); // 可以根据内容加载的时间调整延迟，500ms 是一个示例

        // 清理定时器
        return () => {
            clearTimeout(timer);
            NProgress.done();
        };
    }, [location]); // 每次路由变化时触发该 effect

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
                <NewsRouter></NewsRouter>
            </Content>
        </Layout>
        </Layout></ConfigProvider>
    
    );
}

export default NewSandbox;