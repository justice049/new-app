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
import NewsAdd from "../../views/sandbox/news-manage/NewsAdd";
import NewsDraft from "../../views/sandbox/news-manage/NewsDraft";
import NewsCategory from "../../views/sandbox/news-manage/NewsCategory";
import Audit from "../../views/sandbox/audit-manage/Audit";
import AuditList from "../../views/sandbox/audit-manage/AuditList";
import Published from "../../views/sandbox/publish-manage/Published";
import Unpublished from "../../views/sandbox/publish-manage/Unpublished";
import Sunset from "../../views/sandbox/publish-manage/Sunset";
import { use, useEffect,useState } from "react";
import axios from "axios";

//创建一个本地的路由映射表
const LocalRouterMap = {
    "/home":Home,
    "user-manage/list":UserList,
    "right-manage/right/list":RightList,
    "right-manage/role/list":RoleList,
    //写什么新闻列表啊，各种权限啊
    "/news-manage/add":NewsAdd,
    "/news-manage/draft":NewsDraft,
    "/news-manage/category":NewsCategory,
    "/audit-manage/audit":Audit,
    "/audit-manage/list":AuditList,
    "publish-manage/published":Published,
    "/publish-manage/unpublished":Unpublished,
    "/publish-manage/sunset":Sunset,
} 

export default function NewsRouter() {
    const [BackRouteList,setBackRouteList] = useState([])
    useEffect(()=>{
        Promise.all([
            axios.get("http://localhost:3000/rights"),
            axios.get("http://localhost:3000/children"), 
        ]).then(res=>{
        //    console.log(res); 
           setBackRouteList([...res[0].data,res[1].data])
           console.log([...res[0].data,res[1].data])
        })
    },[])
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
