import React, { useState, useEffect } from'react';
import { Layout, Menu } from 'antd';
import { useNavigate } from'react-router-dom';
import axios from 'axios';
import {
  UserOutlined,
  SettingOutlined,
  UploadOutlined,
  VideoCameraOutlined,
  AuditOutlined,
  FormOutlined,
  HomeOutlined,
} from '@ant-design/icons';
import './index.css';
import { useLocation } from'react-router-dom';

const { SubMenu } = Menu;
const { Sider } = Layout;

// **手动映射菜单项对应的图标**
const iconMap = {
  首页: <HomeOutlined />,
  用户管理: <UserOutlined />,
  用户列表: <UserOutlined />,
  权限管理: <SettingOutlined />,
  新闻管理: <FormOutlined />,
  审核管理: <AuditOutlined />,
  发布管理: <UploadOutlined />,
};

function SideMenu() {
  const [menu, setMenu] = useState([]);
  const location = useLocation(); // 获取当前的路径
  // useEffect(() => {
  //   axios.get('http://localhost:3000/rights?_embed=children').then((res) => {
  //     setMenu(res.data);
  //   });
  // }, []);

  useEffect(() => {
    axios.get('http://localhost:3000/rights?_embed=children')
      .then((res) => {
            setMenu(res.data);
        })
      .catch((error) => {
            console.error('获取菜单数据失败:', error);
            // 可根据情况设置默认菜单数据或提示用户
        });
}, []);

  const navigate = useNavigate();

  // console.log(localStorage.getItem('token'));
  const tokenData = JSON.parse(localStorage.getItem('token')) || {}; // 确保 tokenData 是一个对象
  const { role = {} } = tokenData; // 确保 role 是一个对象
  const { rights = {} } = role; // 确保 rights 是一个对象

  let allRights = [];
  if (Array.isArray(rights.checked)) {
    allRights = [...rights.checked];
  }
  if (Array.isArray(rights.halfChecked)) {
    allRights = [...allRights,...rights.halfChecked];
  }

  const checkPermission = (item) => {
    // 检查用户是否具有访问权限
    return item.pagepermisson && allRights.includes(item.key);
  };

  const renderMenu = (menuList) => {
    return menuList.map((item) => {
      const icon = iconMap[item.title] || <VideoCameraOutlined />; // 默认图标
      if (item.children?.length > 0 && checkPermission(item)) {
        return (
          <SubMenu key={item.key} icon={icon} title={item.title}>
            {renderMenu(item.children)}
          </SubMenu>
        );
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
      );
    });
  };

  //找到路径
  const selectKeys = [location.pathname];
  //分割字符串
  const openKeys = ['/' + location.pathname.split('/')[1]];
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
  );
}

export default SideMenu;


// import React, { useState, useEffect } from 'react';
// import { Layout, Menu } from 'antd';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import {
//     UserOutlined,
//     SettingOutlined,
//     UploadOutlined,
//     VideoCameraOutlined,
//     AuditOutlined,
//     FormOutlined,
//     HomeOutlined,
// } from '@ant-design/icons';
// import './index.css';
// import { useLocation } from 'react-router-dom';

// const { SubMenu } = Menu;
// const { Sider } = Layout;

// // **手动映射菜单项对应的图标**
// const iconMap = {
//     首页: <HomeOutlined />,
//     用户管理: <UserOutlined />,
//     用户列表: <UserOutlined />,
//     权限管理: <SettingOutlined />,
//     新闻管理: <FormOutlined />,
//     审核管理: <AuditOutlined />,
//     发布管理: <UploadOutlined />,
// };

// function SideMenu() {
//     const [menu, setMenu] = useState([]);
//     const location = useLocation(); // 获取当前的路径
//     useEffect(() => {
//         axios.get('http://localhost:3000/rights?_embed=children').then((res) => {
//             setMenu(res.data);
//         });
//     }, []);

//     const navigate = useNavigate();

//     console.log(localStorage.getItem('token'));
//     const tokenData = JSON.parse(localStorage.getItem('token')) || {}; // 确保 tokenData 是一个对象
//     const { role = {} } = tokenData; // 确保 role 是一个对象
//     const { rights = { checked: [], halfChecked: [] } } = role; // 确保 rights 是一个对象
//     const allRights = [...rights.checked, ...rights.halfChecked]; // 合并所有权限

//     const checkPermission = (item) => {
//         // 检查用户是否具有访问权限
//         return item.pagepermisson && allRights.includes(item.key);
//     };

//     const renderMenu = (menuList) => {
//         return menuList.map((item) => {
//             const icon = iconMap[item.title] || <VideoCameraOutlined />; // 默认图标
//             if (item.children?.length > 0 && checkPermission(item)) {
//                 return (
//                     <SubMenu key={item.key} icon={icon} title={item.title}>
//                         {renderMenu(item.children)}
//                     </SubMenu>
//                 );
//             }
//             return (
//                 checkPermission(item) && (
//                     <Menu.Item
//                         key={item.key}
//                         icon={icon}
//                         onClick={() => navigate(item.key)}
//                     >
//                         {item.title}
//                     </Menu.Item>
//                 )
//             );
//         });
//     };

//     //找到路径
//     const selectKeys = [location.pathname];
//     //分割字符串
//     const openKeys = ['/' + location.pathname.split('/')[1]];
//     return (
//         <Sider trigger={null} collapsible>
//             <div style={{ display: 'flex', height: '100%', flexDirection: 'column' }}>
//                 <div className="logo">新闻发布系统</div>
//                 <div style={{ flex: 1, overflow: 'auto' }}>
//                     <Menu
//                         theme="dark"
//                         mode="inline"
//                         selectedKeys={selectKeys}
//                         defaultOpenKeys={openKeys}
//                     >
//                         {renderMenu(menu)}
//                     </Menu>
//                 </div>
//             </div>
//         </Sider>
//     );
// }

// export default SideMenu;    


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
 
// //   console.log(localStorage.getItem('token'))
// //   // const {role:{rights}} = JSON.parse(localStorage.getItem('token')) || {}; // 确保 tokenData 是一个对象
// //   const tokenData = JSON.parse(localStorage.getItem('token')) || {}; // 确保 tokenData 是一个对象
// //   const { role = {} } = tokenData; // 确保 role 是一个对象
// //   const { rights = [] } = role; // 确保 rights 是一个数组


// //   const checkPermission = (item) => {
// //     // 检查用户是否具有访问权限（还要当前登录的用户的权限列表）
// //     if (role.roleName === '超级管理员') {
// //       return true
// //     }
// //     return item.pagepermisson && Array.isArray(rights) && rights.includes(item.key)
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