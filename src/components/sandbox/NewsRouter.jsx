import SideMenu from '../../components/sandbox/SideMenu'
import TopHeader from '../../components/sandbox/TopHeader'
import { Routes, Route } from 'react-router-dom'
import Home from '../../views/sandbox/home/Home'
import RightList from '../../views/sandbox/right-manage/RightList'
import UserList from '../../views/sandbox/user-manage/UserList'
import RoleList from '../../views/sandbox/right-manage/RoleList'
import { Navigate } from 'react-router-dom'
import Nopermission from '../../views/sandbox/nopermission/Nopermission'
//引入antd
import { theme, Layout, ConfigProvider } from 'antd'
import NewsAdd from '../../views/sandbox/news-manage/NewsAdd'
import NewsDraft from '../../views/sandbox/news-manage/NewsDraft'
import NewsCategory from '../../views/sandbox/news-manage/NewsCategory'
import Audit from '../../views/sandbox/audit-manage/Audit'
import AuditList from '../../views/sandbox/audit-manage/AuditList'
import Published from '../../views/sandbox/publish-manage/Published'
import Unpublished from '../../views/sandbox/publish-manage/Unpublished'
import Sunset from '../../views/sandbox/publish-manage/Sunset'
import { use, useEffect, useState } from 'react'
import axios from 'axios'

//创建一个本地的路由映射表
const LocalRouterMap = {
  '/home': Home,
  '/user-manage/list': UserList,
  '/right-manage/right/list': RightList,
  '/right-manage/role/list': RoleList,
  //写什么新闻列表啊，各种权限啊
  '/news-manage/add': NewsAdd,
  '/news-manage/draft': NewsDraft,
  '/news-manage/category': NewsCategory,
  '/audit-manage/audit': Audit,
  '/audit-manage/list': AuditList,
  'publish-manage/published': Published,
  '/publish-manage/unpublished': Unpublished,
  '/publish-manage/sunset': Sunset,
}

export default function NewsRouter() {
  // 后端返回的路由映射表
  const [BackRouteList, setBackRouteList] = useState([])
  useEffect(() => {
    Promise.all([
      axios.get('http://localhost:3000/rights'),
      axios.get('http://localhost:3000/children'),
    ]).then((res) => {
      setBackRouteList([...res[0].data, ...res[1].data])
    })
  }, [])

  const {
    role: { rights },
  } = JSON.parse(localStorage.getItem('token'))

  const checkRoute = (item) => {
    return LocalRouterMap[item.key] && item.pagepermisson
  }
  const checkUserPermisson = (item) => {
    //当前登录用户权限列表
    return rights.includes(item.key)
  }

  return (
    <Routes>
      {/* 动态渲染路由 */}
      {BackRouteList.map((item) => {
        const Component = LocalRouterMap[item.key]
        // console.log(item.key)

        if (checkRoute(item) && checkUserPermisson(item)) {
          return (
            Component && (
              <Route path={item.key} key={item.key} element={<Component />} />
            )
          )
        }
        return null
      })}

      {/* 首页重定向 */}
      <Route path="/" element={<Navigate to="/home" />} />

      {/* 权限不足页面 */}
      {BackRouteList.length > 0 && (
        <Route path="*" element={<Nopermission />} />
      )}
    </Routes>
  )
}
