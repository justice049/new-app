//导入antd
import { Layout, theme, Button } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { changeConfirmLocale } from 'antd/es/modal/locale';

//从Layout组件中解构Header组件
const { Header} = Layout;
function TopHeader() {
    const [collapsed, setCollapsed] = useState(false)
    //定义changeCollapsed函数，用于展开/收起侧边栏,通过取反实现
    const changeCollapsed = () => {
        setCollapsed(!collapsed)
    }
    const { token } = theme.useToken(); // 获取主题 token
    const { colorBgContainer, borderRadiusLG } = token;
    return (
            <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            //展开/收起侧边栏，绑定onClick事件
            icon={collapsed ? <MenuUnfoldOutlined onClick={changeCollapsed} /> : <MenuFoldOutlined onClick={changeCollapsed}/>}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
    )
}

export default TopHeader;