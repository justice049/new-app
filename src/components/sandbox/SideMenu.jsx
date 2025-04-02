import React, { useState, useEffect } from 'react'
import { Layout, Menu } from 'antd'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import {
  UserOutlined,
  SettingOutlined,
  UploadOutlined,
  VideoCameraOutlined,
  AuditOutlined,
  FormOutlined,
  HomeOutlined,
} from '@ant-design/icons'
import './index.css'
import { useLocation } from 'react-router-dom'
 
const { SubMenu } = Menu
const { Sider } = Layout
 
// **手动映射菜单项对应的图标**
const iconMap = {
  首页: <HomeOutlined />,
  用户管理: <UserOutlined />,
  用户列表: <UserOutlined />,
  权限管理: <SettingOutlined />,
  新闻管理: <FormOutlined />,
  审核管理: <AuditOutlined />,
  发布管理: <UploadOutlined />,
}
 
function SideMenu() {
  const [menu, setMenu] = useState([])
  const location = useLocation() // 获取当前的路径
  useEffect(() => {
    axios.get('http://localhost:3000/rights?_embed=children').then((res) => {
      setMenu(res.data)
    })
  }, [])
 
  const navigate = useNavigate()
 
  const {role:{rights}} = JSON.parse(localStorage.getItem('token')) || {}; // 确保 tokenData 是一个对象

  const checkPermission = (item) => {
    // 检查用户是否具有访问权限（还要当前登录的用户的权限列表）
    return item.pagepermisson && rights.includes(item.key)
  }
 
  const renderMenu = (menuList) => {
    return menuList.map((item) => {
      const icon = iconMap[item.title] || <VideoCameraOutlined /> // 默认图标
      if (item.children?.length > 0 && checkPermission(item)) {
        return (
          <SubMenu key={item.key} icon={icon} title={item.title}>
            {renderMenu(item.children)}
          </SubMenu>
        )
      }
      return (
        checkPermission(item) && (
          <Menu.Item
            key={item.key}
            icon={icon}
            onClick={() => navigate(item.key)}
          >
            {item.title}
          </Menu.Item>
        )
      )
    })
  }
 
  //找到路径
  const selectKeys = [location.pathname]
  //分割字符串
  const openKeys = ['/' + location.pathname.split('/')[1]]
  return (
    <Sider trigger={null} collapsible>
      <div style={{ display: 'flex', height: '100%', flexDirection: 'column' }}>
        <div className="logo">新闻发布系统</div>
        <div style={{ flex: 1, overflow: 'auto' }}>
          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={selectKeys}
            defaultOpenKeys={openKeys}
          >
            {renderMenu(menu)}
          </Menu>
        </div>
      </div>
    </Sider>
  )
}
 
export default SideMenu