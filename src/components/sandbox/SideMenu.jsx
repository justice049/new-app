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
import { connect } from 'react-redux';
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

function SideMenu(props) {
  const [menu, setMenu] = useState([]);
  const location = useLocation(); // 获取当前的路径

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

const tokenData = JSON.parse(localStorage.getItem('token')) || {};
const { role = {} } = tokenData;
let allRights = [];

// 兼容数组结构（普通角色）和对象结构（超级管理员）
if (Array.isArray(role.rights)) {
  allRights = role.rights;
} else if (typeof role.rights === 'object' && role.rights !== null) {
  const { checked = [], halfChecked = [] } = role.rights;
  allRights = [...checked, ...halfChecked];
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
    <Sider trigger={null} collapsible collapsed={props.isCollapsed}>
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

const mapStateToProps = ({CollApsedReducer:{isCollapsed}})=>({
    isCollapsed

})

export default connect(mapStateToProps)(SideMenu);