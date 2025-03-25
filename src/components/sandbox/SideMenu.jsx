import React, { useState } from 'react'
import { Layout, Menu, theme } from 'antd'
import './index.css'
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  SettingOutlined,
} from '@ant-design/icons'
import { Switch } from 'antd'
import SubMenu from 'antd/es/menu/SubMenu'
import { useNavigate } from 'react-router-dom' // 引入 useNavigate

const { Header, Content, Sider } = Layout

const menuList = [
  {
    key: '/home',
    title:"首页",
    icon: <UserOutlined />,
  }, 
  {
    key: '/user-manage',
    title:"用户管理",
    icon: <UserOutlined />,
    children:[
      {
        key: '/user-manage/list',
        title:"用户列表",
        icon: <UserOutlined />,
      }
    ]
  },
  {
    key: '/right-manage',
    title:"权限管理",
    icon: <UserOutlined />,
    children:[
      {
        key: '/right-manage/role/list',
        title:"角色列表",
        icon: <UserOutlined />,
      },{
        key: '/right-manage/right/list',
        title:"权限列表",
        icon: <UserOutlined />,
      }
    ]
  }
]

function SideMenu() {
  const [collapsed, setCollapsed] = useState(false)
  const navigate = useNavigate() // 使用 useNavigate 获取 navigate 函数

  const onClick = (e) => {
    console.log('click ', e)
  }

  const renderMenu = (menuList) => {
    return menuList.map(item => {
      if (item.children) {
        return <SubMenu key={item.key} icon={item.icon} title={item.title}>
          {renderMenu(item.children)}
        </SubMenu>
      }
      return <Menu.Item key={item.key} icon={item.icon} onClick={() => {
        navigate(item.key) // 使用 navigate 进行导航
      }}>{item.title}</Menu.Item>
    })
  }

  return (
    <Sider trigger={null} collapsible collapsed={false}>
      <div className="logo">新闻发布系统</div>
      <div className="demo-logo-vertical" />
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['1']}
        onClick={onClick}
        defaultOpenKeys={['sub1']}
      >
        {renderMenu(menuList)}
      </Menu>
    </Sider>
  )
}

export default SideMenu
   