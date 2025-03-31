//导入antd
import { Layout, theme, Button,Menu } from 'antd'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import React, { useState } from 'react'
import { changeConfirmLocale } from 'antd/es/modal/locale'
import { Dropdown, Space } from 'antd'
import { DownOutlined, SmileOutlined } from '@ant-design/icons'
import { Avatar } from 'antd'
import { UserOutlined } from '@ant-design/icons'

const items = [
  {
    key: '1',
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.antgroup.com"
      >
        帮我上模电实验
      </a>
    ),
  },
  {
    key: '2',
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.aliyun.com"
      >
        帮我上电磁场课
      </a>
    ),
  },
  {
    key: '3',
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.luohanacademy.com"
      >
        帮我辅助面试
      </a>
    ),
  },
  {
    key: '4',
    danger: true,
    label: '要退出吗',
  },
]

//从Layout组件中解构Header组件
const { Header } = Layout
function TopHeader() {
  const [collapsed, setCollapsed] = useState(false)
  //定义changeCollapsed函数，用于展开/收起侧边栏,通过取反实现
  const changeCollapsed = () => {
    setCollapsed(!collapsed)
  }
  const { token } = theme.useToken() // 获取主题 token
 
  const { colorBgContainer, borderRadiusLG } = token

  const menu = (
    <Menu>
       <Menu.Item>
          超级管理员
       </Menu.Item>
       <Menu.Item danger onClick={()=>{
          localStorage.removeItem('token')
       }}>退出</Menu.Item>
    </Menu>
  )

  return (
    <Header
      style={{
        padding: '0 16px',
        background: colorBgContainer,
      }}
    >
      <div style={{ float: 'right' }}>
        {/* 定义欢迎语 */}
        <span>欢迎主人回来</span>
        {/* 定义下拉菜单 */}
        <Dropdown
          menu={{
            items,
          }}
          placement="bottomLeft"
          arrow
        >
          <Space size={16} wrap>
          <Avatar src={'/头像.jpg'} />
        </Space>
          {/* <Button>🥺</Button> */}
        </Dropdown>
        <Dropdown
          menu={{
            items,
          }}
          placement="bottom"
          arrow
        ></Dropdown>

      </div>

      <Button
        type="text"
        //展开/收起侧边栏，绑定onClick事件
        icon={
          collapsed ? (
            <MenuUnfoldOutlined onClick={changeCollapsed} />
          ) : (
            <MenuFoldOutlined onClick={changeCollapsed} />
          )
        }
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

export default TopHeader
