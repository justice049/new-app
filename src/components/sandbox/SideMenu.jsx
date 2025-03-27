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
  useEffect(() => {
    axios.get('http://localhost:3000/rights?_embed=children').then((res) => {
      setMenu(res.data)
    })
  }, [])

  const navigate = useNavigate()

  const checkPermission = (item) => {
    // 检查用户是否具有访问权限
    return item.pagepermisson === 1
  }

  const renderMenu = (menuList) => {
    return menuList.map((item) => {
      const icon = iconMap[item.title] || <VideoCameraOutlined /> // 默认图标
      if (item.children && checkPermission(item)) {
        return (
          <SubMenu key={item.key} icon={icon} title={item.title}>
            {renderMenu(item.children)}
          </SubMenu>
        )
      }
      return (
        checkPermission(item) &&
        <Menu.Item key={item.key} icon={icon} onClick={() => navigate(item.key)}>
          {item.title}
        </Menu.Item>
      )
    })
  }

  return (
    <Sider trigger={null} collapsible>
      <div className="logo">新闻发布系统</div>
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
        {renderMenu(menu)}
      </Menu>
    </Sider>
  )
}

export default SideMenu



// import React, { useState, useEffect } from 'react'
// import { Layout, Menu } from 'antd'
// import { useNavigate } from 'react-router-dom'
// import axios from 'axios'
// import {
//   UserOutlined,
//   SettingOutlined,
//   UploadOutlined,
//   VideoCameraOutlined,
//   AuditOutlined,
//   FormOutlined,
//   HomeOutlined,
// } from '@ant-design/icons'

// const { SubMenu } = Menu
// const { Sider } = Layout

// // **手动映射菜单项对应的图标**
// const iconMap = {
//   首页: <HomeOutlined />,
//   用户管理: <UserOutlined />,
//   用户列表: <UserOutlined />,
//   权限管理: <SettingOutlined />,
//   新闻管理: <FormOutlined />,
//   审核管理: <AuditOutlined />,
//   发布管理: <UploadOutlined />,
// }

// function SideMenu() {
//   const [menu, setMenu] = useState([])
//   useEffect(() => {
//     axios.get('http://localhost:3000/rights?_embed=children').then((res) => {
//       setMenu(res.data)
//     })
//   }, [])

//   const navigate = useNavigate()

//   const renderMenu = (menuList) => {
//     return menuList.map((item) => {
//       const icon = iconMap[item.title] || <VideoCameraOutlined /> // 默认图标
//       if (item.children?.length > 0) {
//         return (
//           <SubMenu key={item.key} icon={icon} title={item.title}>
//             {renderMenu(item.children)}
//           </SubMenu>
//         )
//       }
//       return (
//         <Menu.Item key={item.key} icon={icon} onClick={() => navigate(item.key)}>
//           {item.title}
//         </Menu.Item>
//       )
//     })
//   }

//   return (
//     <Sider trigger={null} collapsible>
//       <div className="logo">新闻发布系统</div>
//       <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
//         {renderMenu(menu)}
//       </Menu>
//     </Sider>
//   )
// }

// export default SideMenu



// // import React, { useState, useEffect } from 'react'
// // import { Layout, Menu } from 'antd'
// // import { useNavigate } from 'react-router-dom'
// // import axios from 'axios'
// // import {
// //   UserOutlined,
// //   SettingOutlined,
// //   UploadOutlined,
// //   VideoCameraOutlined,
// // } from '@ant-design/icons'

// // const { SubMenu } = Menu
// // const { Sider } = Layout

// // const iconMap = {
// //   user: <UserOutlined />,
// //   setting: <SettingOutlined />,
// //   upload: <UploadOutlined />,
// //   video: <VideoCameraOutlined />,
// // }

// // function SideMenu() {
// //   const [menu, setMenu] = useState([])
// //   useEffect(() => {
// //     axios.get('http://localhost:3000/rights?_embed=children').then((res) => {
// //       setMenu(res.data)
// //     })
// //   }, [])

// //   const navigate = useNavigate()

// //   const renderMenu = (menuList) => {
// //     return menuList.map((item) => {
// //       const icon = iconMap[item.icon] || null // 映射图标
// //       if (item.children?.length > 0) {
// //         return (
// //           <SubMenu key={item.key} icon={icon} title={item.title}>
// //             {renderMenu(item.children)}
// //           </SubMenu>
// //         )
// //       }
// //       return (
// //         <Menu.Item key={item.key} icon={icon} onClick={() => navigate(item.key)}>
// //           {item.title}
// //         </Menu.Item>
// //       )
// //     })
// //   }

// //   return (
// //     <Sider trigger={null} collapsible>
// //       <div className="logo">新闻发布系统</div>
// //       <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
// //         {renderMenu(menu)}
// //       </Menu>
// //     </Sider>
// //   )
// // }

// // export default SideMenu



// // // import React, { useState, useEffect } from 'react'
// // // import { Layout, Menu, theme } from 'antd'
// // // import './index.css'
// // // import {
// // //   UploadOutlined,
// // //   UserOutlined,
// // //   VideoCameraOutlined,
// // //   SettingOutlined,
// // // } from '@ant-design/icons'
// // // import { Switch } from 'antd'
// // // // import SubMenu from 'antd/es/menu/SubMenu'
// // // import { useNavigate } from 'react-router-dom' // 引入 useNavigate
// // // import axios from 'axios'
// // // const { SubMenu } = Menu;  

// // // const { Header, Content, Sider } = Layout

// // // function SideMenu(props) {
// // //   const [menu, setMenu] = useState([])
// // //   useEffect(() => {
// // //     axios.get('http://localhost:3000/rights?_embed=children').then((res) => {
// // //       console.log(res.data)
// // //       setMenu(res.data)
// // //     })
// // //   })
// // //   const [collapsed, setCollapsed] = useState(false)
// // //   const navigate = useNavigate() // 使用 useNavigate 获取 navigate 函数

// // //   const onClick = (e) => {
// // //     console.log('click ', e)
// // //   }

// // //   const renderMenu = (menuList) => {
// // //     return menuList.map((item) => {
// // //       if (item.children) {
// // //         return (
// // //           <SubMenu key={item.key} icon={item.icon} title={item.title}>
// // //             {renderMenu(item.children)}
// // //           </SubMenu>
// // //         )
// // //       }
// // //       return (
// // //         <Menu.Item
// // //           key={item.key}
// // //           icon={item.icon}
// // //           onClick={() => {
// // //             navigate(item.key) // 使用 navigate 进行导航
// // //           }}
// // //         >
// // //           {item.title}
// // //         </Menu.Item>
// // //       )
// // //     })
// // //   }

// // //   return (
// // //     <Sider trigger={null} collapsible collapsed={false}>
// // //       <div className="logo">新闻发布系统</div>
// // //       <div className="demo-logo-vertical" />
// // //       <Menu
// // //         theme="dark"
// // //         mode="inline"
// // //         defaultSelectedKeys={['1']}
// // //         onClick={onClick}
// // //         defaultOpenKeys={['sub1']}
// // //       >
// // //         {renderMenu(menu)}
// // //       </Menu>
// // //     </Sider>
// // //   )
// // // }

// // // export default SideMenu
