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
 
  const checkPermission = (item) => {
    // 检查用户是否具有访问权限
    return item.pagepermisson === 1
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
//   useEffect(() => {
//     axios.get('http://localhost:3000/rights?_embed=children')
//       .then(res => {
//         console.log('获取到的菜单数据:', res.data) // 🔍 调试菜单数据
//         setMenu(res.data)
//       })
//       .catch(error => console.error('获取菜单数据失败:', error))
//   }, [])
  
//   const [menu, setMenu] = useState([])
//   useEffect(() => {
//     axios.get('http://localhost:3000/rights?_embed=children').then((res) => {
//       setMenu(res.data)
//     })
//   }, [])
 
//   const navigate = useNavigate()
 
//   const checkPermission = (item) => {
//     // 检查用户是否具有访问权限
//     return item.pagepermisson === 1
//   }
 
//   const renderMenu = (menuList) => {
//     return menuList.map((item) => {
//       const icon = iconMap[item.title] || <VideoCameraOutlined /> // 默认图标
//       if (item.children && checkPermission(item)) {
//         return (
//           <SubMenu key={item.key} icon={icon} title={item.title}>
//             {renderMenu(item.children)}
//           </SubMenu>
//         )
//       }
//       return (
//         checkPermission(item) &&
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
// //   AuditOutlined,
// //   FormOutlined,
// //   HomeOutlined,
// // } from '@ant-design/icons'
// // import './index.css'
// // import { useLocation } from 'react-router-dom'

// // const { SubMenu } = Menu
// // const { Sider } = Layout

// // // **手动映射菜单项对应的图标**
// // const iconMap = {
// //   首页: <HomeOutlined />,
// //   用户管理: <UserOutlined />,
// //   用户列表: <UserOutlined />,
// //   权限管理: <SettingOutlined />,
// //   新闻管理: <FormOutlined />,
// //   审核管理: <AuditOutlined />,
// //   发布管理: <UploadOutlined />,
// // }

// // function SideMenu() {
// //   const [menu, setMenu] = useState([])
// //   const location = useLocation() // 获取当前的路径
// //   useEffect(() => {
// //     axios.get('http://localhost:3000/rights?_embed=children').then((res) => {
// //       setMenu(res.data)
// //     })
// //   }, [])

// //   const navigate = useNavigate()

// //   const checkPermission = (item) => {
// //     // 检查用户是否具有访问权限
// //     return item.pagepermisson === 1
// //   }

// //   const renderMenu = (menuList) => {
// //     return menuList.map((item) => {
// //       const icon = iconMap[item.title] || <VideoCameraOutlined /> // 默认图标
// //       if (item.children?.length > 0 && checkPermission(item)) {
// //         return (
// //           <SubMenu key={item.key} icon={icon} title={item.title}>
// //             {renderMenu(item.children)}
// //           </SubMenu>
// //         )
// //       }
// //       return (
// //         checkPermission(item) && (
// //           <Menu.Item
// //             key={item.key}
// //             icon={icon}
// //             onClick={() => navigate(item.key)}
// //           >
// //             {item.title}
// //           </Menu.Item>
// //         )
// //       )
// //     })
// //   }

// //   //找到路径
// //   const selectKeys = [location.pathname]
// //   //分割字符串
// //   const openKeys = ['/' + location.pathname.split('/')[1]]
// //   return (
// //     <Sider trigger={null} collapsible>
// //       <div style={{ display: 'flex', height: '100%', flexDirection: 'column' }}>
// //         <div className="logo">新闻发布系统</div>
// //         <div style={{ flex: 1, overflow: 'auto' }}>
// //           <Menu
// //             theme="dark"
// //             mode="inline"
// //             selectedKeys={selectKeys}
// //             defaultOpenKeys={openKeys}
// //           >
// //             {renderMenu(menu)}
// //           </Menu>
// //         </div>
// //       </div>
// //     </Sider>
// //   )
// // }

// // export default SideMenu

// // // import React, { useState, useEffect } from 'react'
// // // import { Layout, Menu } from 'antd'
// // // import { useNavigate } from 'react-router-dom'
// // // import axios from 'axios'
// // // import {
// // //   UserOutlined,
// // //   SettingOutlined,
// // //   UploadOutlined,
// // //   VideoCameraOutlined,
// // //   AuditOutlined,
// // //   FormOutlined,
// // //   HomeOutlined,
// // // } from '@ant-design/icons'

// // // const { SubMenu } = Menu
// // // const { Sider } = Layout

// // // // **手动映射菜单项对应的图标**
// // // const iconMap = {
// // //   首页: <HomeOutlined />,
// // //   用户管理: <UserOutlined />,
// // //   用户列表: <UserOutlined />,
// // //   权限管理: <SettingOutlined />,
// // //   新闻管理: <FormOutlined />,
// // //   审核管理: <AuditOutlined />,
// // //   发布管理: <UploadOutlined />,
// // // }

// // // function SideMenu() {
// // //   const [menu, setMenu] = useState([])
// // //   useEffect(() => {
// // //     axios.get('http://localhost:3000/rights?_embed=children').then((res) => {
// // //       setMenu(res.data)
// // //     })
// // //   }, [])

// // //   const navigate = useNavigate()

// // //   const checkPermission = (item) => {
// // //     // 检查用户是否具有访问权限
// // //     return item.pagepermisson === 1
// // //   }

// // //   const renderMenu = (menuList) => {
// // //     return menuList.map((item) => {
// // //       const icon = iconMap[item.title] || <VideoCameraOutlined /> // 默认图标
// // //       if (item.children?.length>0 && checkPermission(item)) {
// // //         return (
// // //           <SubMenu key={item.key} icon={icon} title={item.title}>
// // //             {renderMenu(item.children)}
// // //           </SubMenu>
// // //         )
// // //       }
// // //       return (
// // //         checkPermission(item) &&
// // //         <Menu.Item key={item.key} icon={icon} onClick={() => navigate(item.key)}>
// // //           {item.title}
// // //         </Menu.Item>
// // //       )
// // //     })
// // //   }

// // //   return (
// // //     <Sider trigger={null} collapsible>
// // //       <div className="logo">新闻发布系统</div>
// // //       <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
// // //         {renderMenu(menu)}
// // //       </Menu>
// // //     </Sider>
// // //   )
// // // }

// // // export default SideMenu
