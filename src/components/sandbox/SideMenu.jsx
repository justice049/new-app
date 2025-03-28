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
// import { Layout, theme } from 'antd'
// import './index.css'
// import {
//   UploadOutlined,
//   UserOutlined,
//   VideoCameraOutlined,
//   SettingOutlined,
// } from '@ant-design/icons'
// import { Switch } from 'antd'
// // import SubMenu from 'antd/es/menu/SubMenu'
// import { useNavigate } from 'react-router-dom' // 引入 useNavigate
// import axios from 'axios'
// import { Menu } from 'antd'
// const { SubMenu } = Menu

// const { Header, Content, Sider } = Layout

// // const menuList = [
// //   {
// //     key: '/home',
// //     title: '首页',
// //     icon: <UserOutlined />,
// //   },
// //   {
// //     key: '/user-manage',
// //     title: '用户管理',
// //     icon: <UserOutlined />,
// //     children: [
// //       {
// //         key: '/user-manage/list',
// //         title: '用户列表',
// //         icon: <UserOutlined />,
// //       },
// //     ],
// //   },
// //   {
// //     key: '/right-manage',
// //     title: '权限管理',
// //     icon: <UserOutlined />,
// //     children: [
// //       {
// //         key: '/right-manage/role/list',
// //         title: '角色列表',
// //         icon: <UserOutlined />,
// //       },
// //       {
// //         key: '/right-manage/right/list',
// //         title: '权限列表',
// //         icon: <UserOutlined />,
// //       },
// //     ],
// //   },
// // ]

// function SideMenu(props) {
//   const [menu, setMenu] = useState([])
//   useEffect(() => {
//     axios.get('http://localhost:3000/rights?_embed=children').then((res) => {
//       console.log(res.data)
//       setMenu(res.data)
//     })
//   }, [])
//   const [collapsed, setCollapsed] = useState(false)
//   const navigate = useNavigate() // 使用 useNavigate 获取 navigate 函数

//   const onClick = (e) => {
//     console.log('click ', e)
//   }

//   const renderMenu = (menuList) => {
//     return menuList.map((item) => {
//       if (item.children) {
//         return (
//           <SubMenu key={item.key} icon={item.icon} title={item.title}>
//             {renderMenu(item.children)}
//           </SubMenu>
//         )
//       }
//       return (
//         <Menu.Item
//           key={item.key}
//           icon={item.icon}
//           onClick={() => {
//             navigate(item.key) // 使用 navigate 进行导航
//           }}
//         >
//           {item.title}
//         </Menu.Item>
//       )
//     })
//   }

//   return (
//     <Sider trigger={null} collapsible collapsed={false}>
//       <div className="logo">新闻发布系统</div>
//       <Menu
//         theme="dark"
//         mode="inline"
//         defaultSelectedKeys={['3']}
//         onClick={onClick}
//         defaultOpenKeys={['sub1']}
//       >
//         {renderMenu(menu)}
//       </Menu>
//     </Sider>
//   )
// }

// export default SideMenu

// // import React, { useState, useEffect } from 'react'
// // import { Layout, Menu } from 'antd'
// // import { useNavigate, useLocation } from 'react-router-dom'
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
// //   const [menuItems, setMenuItems] = useState([])
// //   const location = useLocation()
// //   const navigate = useNavigate()

// //   useEffect(() => {
// //     axios.get('http://localhost:3000/rights?_embed=children').then((res) => {
// //       setMenuItems(generateMenuItems(res.data))
// //     })
// //   }, [])

// //   const checkPermission = (item) => item.pagepermisson === 1

// //   const generateMenuItems = (menuList) => {
// //     return menuList.filter(checkPermission).map((item) => ({
// //       key: item.key,
// //       label: item.title,
// //       icon: iconMap[item.title] || <VideoCameraOutlined />,
// //       children: item.children?.filter(checkPermission).map((child) => ({
// //         key: child.key,
// //         label: child.title,
// //         icon: iconMap[child.title] || <VideoCameraOutlined />,
// //       })),
// //     }))
// //   }

// //   return (
// //     <Sider trigger={null} collapsible>
// //       <div style={{ display: 'flex', height: '100%', flexDirection: 'column' }}>
// //         <div className="logo">新闻发布系统</div>
// //         <div style={{ flex: 1, overflow: 'auto' }}>
// //           <Menu
// //             theme="dark"
// //             mode="inline"
// //             selectedKeys={[location.pathname]}
// //             defaultOpenKeys={['/' + location.pathname.split('/')[1]]}
// //             items={menuItems}
// //             onClick={({ key }) => navigate(key)}
// //           />
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
// // // import './index.css'
// // // import { useLocation } from 'react-router-dom'

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
// // //   const location = useLocation() // 获取当前的路径
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
// // //       if (item.children?.length > 0 && checkPermission(item)) {
// // //         return (
// // //           <SubMenu key={item.key} icon={icon} title={item.title}>
// // //             {renderMenu(item.children)}
// // //           </SubMenu>
// // //         )
// // //       }
// // //       return (
// // //         checkPermission(item) && (
// // //           <Menu.Item
// // //             key={item.key}
// // //             icon={icon}
// // //             onClick={() => navigate(item.key)}
// // //           >
// // //             {item.title}
// // //           </Menu.Item>
// // //         )
// // //       )
// // //     })
// // //   }

// // //   //找到路径
// // //   const selectKeys = [location.pathname]
// // //   //分割字符串
// // //   const openKeys = ['/' + location.pathname.split('/')[1]]
// // //   return (
// // //     <Sider trigger={null} collapsible>
// // //       <div style={{ display: 'flex', height: '100%', flexDirection: 'column' }}>
// // //         <div className="logo">新闻发布系统</div>
// // //         <div style={{ flex: 1, overflow: 'auto' }}>
// // //           <Menu
// // //             theme="dark"
// // //             mode="inline"
// // //             selectedKeys={selectKeys}
// // //             defaultOpenKeys={openKeys}
// // //           >
// // //             {renderMenu(menu)}
// // //           </Menu>
// // //         </div>
// // //       </div>
// // //     </Sider>
// // //   )
// // // }

// // // export default SideMenu

// // // // import React, { useState, useEffect } from 'react'
// // // // import { Layout, Menu } from 'antd'
// // // // import { useNavigate } from 'react-router-dom'
// // // // import axios from 'axios'
// // // // import {
// // // //   UserOutlined,
// // // //   SettingOutlined,
// // // //   UploadOutlined,
// // // //   VideoCameraOutlined,
// // // //   AuditOutlined,
// // // //   FormOutlined,
// // // //   HomeOutlined,
// // // // } from '@ant-design/icons'

// // // // const { SubMenu } = Menu
// // // // const { Sider } = Layout

// // // // // **手动映射菜单项对应的图标**
// // // // const iconMap = {
// // // //   首页: <HomeOutlined />,
// // // //   用户管理: <UserOutlined />,
// // // //   用户列表: <UserOutlined />,
// // // //   权限管理: <SettingOutlined />,
// // // //   新闻管理: <FormOutlined />,
// // // //   审核管理: <AuditOutlined />,
// // // //   发布管理: <UploadOutlined />,
// // // // }

// // // // function SideMenu() {
// // // //   useEffect(() => {
// // // //     axios.get('http://localhost:3000/rights?_embed=children')
// // // //       .then(res => {
// // // //         console.log('获取到的菜单数据:', res.data) // 🔍 调试菜单数据
// // // //         setMenu(res.data)
// // // //       })
// // // //       .catch(error => console.error('获取菜单数据失败:', error))
// // // //   }, [])

// // // //   const [menu, setMenu] = useState([])
// // // //   useEffect(() => {
// // // //     axios.get('http://localhost:3000/rights?_embed=children').then((res) => {
// // // //       setMenu(res.data)
// // // //     })
// // // //   }, [])

// // // //   const navigate = useNavigate()

// // // //   const checkPermission = (item) => {
// // // //     // 检查用户是否具有访问权限
// // // //     return item.pagepermisson === 1
// // // //   }

// // // //   const renderMenu = (menuList) => {
// // // //     return menuList.map((item) => {
// // // //       const icon = iconMap[item.title] || <VideoCameraOutlined /> // 默认图标
// // // //       if (item.children && checkPermission(item)) {
// // // //         return (
// // // //           <SubMenu key={item.key} icon={icon} title={item.title}>
// // // //             {renderMenu(item.children)}
// // // //           </SubMenu>
// // // //         )
// // // //       }
// // // //       return (
// // // //         checkPermission(item) &&
// // // //         <Menu.Item key={item.key} icon={icon} onClick={() => navigate(item.key)}>
// // // //           {item.title}
// // // //         </Menu.Item>
// // // //       )
// // // //     })
// // // //   }

// // // //   return (
// // // //     <Sider trigger={null} collapsible>
// // // //       <div className="logo">新闻发布系统</div>
// // // //       <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
// // // //         {renderMenu(menu)}
// // // //       </Menu>
// // // //     </Sider>
// // // //   )
// // // // }

// // // // export default SideMenu

// // // // // import React, { useState, useEffect } from 'react'
// // // // // import { Layout, Menu } from 'antd'
// // // // // import { useNavigate } from 'react-router-dom'
// // // // // import axios from 'axios'
// // // // // import {
// // // // //   UserOutlined,
// // // // //   SettingOutlined,
// // // // //   UploadOutlined,
// // // // //   VideoCameraOutlined,
// // // // //   AuditOutlined,
// // // // //   FormOutlined,
// // // // //   HomeOutlined,
// // // // // } from '@ant-design/icons'
// // // // // import './index.css'
// // // // // import { useLocation } from 'react-router-dom'

// // // // // const { SubMenu } = Menu
// // // // // const { Sider } = Layout

// // // // // // **手动映射菜单项对应的图标**
// // // // // const iconMap = {
// // // // //   首页: <HomeOutlined />,
// // // // //   用户管理: <UserOutlined />,
// // // // //   用户列表: <UserOutlined />,
// // // // //   权限管理: <SettingOutlined />,
// // // // //   新闻管理: <FormOutlined />,
// // // // //   审核管理: <AuditOutlined />,
// // // // //   发布管理: <UploadOutlined />,
// // // // // }

// // // // // function SideMenu() {
// // // // //   const [menu, setMenu] = useState([])
// // // // //   const location = useLocation() // 获取当前的路径
// // // // //   useEffect(() => {
// // // // //     axios.get('http://localhost:3000/rights?_embed=children').then((res) => {
// // // // //       setMenu(res.data)
// // // // //     })
// // // // //   }, [])

// // // // //   const navigate = useNavigate()

// // // // //   const checkPermission = (item) => {
// // // // //     // 检查用户是否具有访问权限
// // // // //     return item.pagepermisson === 1
// // // // //   }

// // // // //   const renderMenu = (menuList) => {
// // // // //     return menuList.map((item) => {
// // // // //       const icon = iconMap[item.title] || <VideoCameraOutlined /> // 默认图标
// // // // //       if (item.children?.length > 0 && checkPermission(item)) {
// // // // //         return (
// // // // //           <SubMenu key={item.key} icon={icon} title={item.title}>
// // // // //             {renderMenu(item.children)}
// // // // //           </SubMenu>
// // // // //         )
// // // // //       }
// // // // //       return (
// // // // //         checkPermission(item) && (
// // // // //           <Menu.Item
// // // // //             key={item.key}
// // // // //             icon={icon}
// // // // //             onClick={() => navigate(item.key)}
// // // // //           >
// // // // //             {item.title}
// // // // //           </Menu.Item>
// // // // //         )
// // // // //       )
// // // // //     })
// // // // //   }

// // // // //   //找到路径
// // // // //   const selectKeys = [location.pathname]
// // // // //   //分割字符串
// // // // //   const openKeys = ['/' + location.pathname.split('/')[1]]
// // // // //   return (
// // // // //     <Sider trigger={null} collapsible>
// // // // //       <div style={{ display: 'flex', height: '100%', flexDirection: 'column' }}>
// // // // //         <div className="logo">新闻发布系统</div>
// // // // //         <div style={{ flex: 1, overflow: 'auto' }}>
// // // // //           <Menu
// // // // //             theme="dark"
// // // // //             mode="inline"
// // // // //             selectedKeys={selectKeys}
// // // // //             defaultOpenKeys={openKeys}
// // // // //           >
// // // // //             {renderMenu(menu)}
// // // // //           </Menu>
// // // // //         </div>
// // // // //       </div>
// // // // //     </Sider>
// // // // //   )
// // // // // }

// // // // // export default SideMenu

// // // // // // import React, { useState, useEffect } from 'react'
// // // // // // import { Layout, Menu } from 'antd'
// // // // // // import { useNavigate } from 'react-router-dom'
// // // // // // import axios from 'axios'
// // // // // // import {
// // // // // //   UserOutlined,
// // // // // //   SettingOutlined,
// // // // // //   UploadOutlined,
// // // // // //   VideoCameraOutlined,
// // // // // //   AuditOutlined,
// // // // // //   FormOutlined,
// // // // // //   HomeOutlined,
// // // // // // } from '@ant-design/icons'

// // // // // // const { SubMenu } = Menu
// // // // // // const { Sider } = Layout

// // // // // // // **手动映射菜单项对应的图标**
// // // // // // const iconMap = {
// // // // // //   首页: <HomeOutlined />,
// // // // // //   用户管理: <UserOutlined />,
// // // // // //   用户列表: <UserOutlined />,
// // // // // //   权限管理: <SettingOutlined />,
// // // // // //   新闻管理: <FormOutlined />,
// // // // // //   审核管理: <AuditOutlined />,
// // // // // //   发布管理: <UploadOutlined />,
// // // // // // }

// // // // // // function SideMenu() {
// // // // // //   const [menu, setMenu] = useState([])
// // // // // //   useEffect(() => {
// // // // // //     axios.get('http://localhost:3000/rights?_embed=children').then((res) => {
// // // // // //       setMenu(res.data)
// // // // // //     })
// // // // // //   }, [])

// // // // // //   const navigate = useNavigate()

// // // // // //   const checkPermission = (item) => {
// // // // // //     // 检查用户是否具有访问权限
// // // // // //     return item.pagepermisson === 1
// // // // // //   }

// // // // // //   const renderMenu = (menuList) => {
// // // // // //     return menuList.map((item) => {
// // // // // //       const icon = iconMap[item.title] || <VideoCameraOutlined /> // 默认图标
// // // // // //       if (item.children?.length>0 && checkPermission(item)) {
// // // // // //         return (
// // // // // //           <SubMenu key={item.key} icon={icon} title={item.title}>
// // // // // //             {renderMenu(item.children)}
// // // // // //           </SubMenu>
// // // // // //         )
// // // // // //       }
// // // // // //       return (
// // // // // //         checkPermission(item) &&
// // // // // //         <Menu.Item key={item.key} icon={icon} onClick={() => navigate(item.key)}>
// // // // // //           {item.title}
// // // // // //         </Menu.Item>
// // // // // //       )
// // // // // //     })
// // // // // //   }

// // // // // //   return (
// // // // // //     <Sider trigger={null} collapsible>
// // // // // //       <div className="logo">新闻发布系统</div>
// // // // // //       <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
// // // // // //         {renderMenu(menu)}
// // // // // //       </Menu>
// // // // // //     </Sider>
// // // // // //   )
// // // // // // }

// // // // // // export default SideMenu
