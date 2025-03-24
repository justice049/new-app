import React, { useState } from "react";
//从antd引入Layout组件的子组件Sider
import { Layout ,Menu,theme} from "antd";
//引入antd的图标组件
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';

//解构Layout
const { Header, Content, Sider } = Layout;


function SideMenu() {
    
    const [collapsed, setCollapsed] = useState(false);
    return (
       <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <UserOutlined />,
              label: 'nav 1',
            },
            {
              key: '2',
              icon: <VideoCameraOutlined />,
              label: 'nav 2',
            },
            {
              key: '3',
              icon: <UploadOutlined />,
              label: 'nav 3',
            },
          ]}
        />
      </Sider>
    );
}

export default SideMenu;