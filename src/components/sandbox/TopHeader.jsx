//导入antd
import { Layout, theme, Button, Menu } from 'antd'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import React, { useState } from 'react'
import { changeConfirmLocale } from 'antd/es/modal/locale'
import { Dropdown, Space } from 'antd'
import { DownOutlined, SmileOutlined } from '@ant-design/icons'
import { Avatar } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'

//从Layout组件中解构Header组件
const { Header } = Layout
function TopHeader(props) {
  // console.log(props)
  //v6的写法
  const navigate = useNavigate()

  const [collapsed, setCollapsed] = useState(false)
  //定义changeCollapsed函数，用于展开/收起侧边栏,通过取反实现
  const changeCollapsed = () => {
    // 改变state的isCollapsed的值
    // setCollapsed(!collapsed)
    // console.log(props)
    props.changeCollapsed()
  }
  const { token } = theme.useToken() // 获取主题 token

  const { colorBgContainer, borderRadiusLG } = token

  //使用户名动态渲染
  // const {role:{roleName},username} = JSON.parse(localStorage.getItem('token'))
  //使用户名动态渲染
  // const {role:{roleName},username} = JSON.parse(localStorage.getItem('token')) || {}; // 确保 tokenData 是一个对象

  let username = ''
  let roleName = ''

  try {
    const token = JSON.parse(localStorage.getItem('token'))
    username = token?.username || '游客'
    roleName = token?.role?.roleName || '未知角色'
  } catch (e) {
    console.error('解析 token 出错:', e)
  }

  const items = [
    {
      key: '1',
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.antgroup.com"
        >
          帮{roleName}做模电实验
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
          帮{roleName}上电磁场课
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
          帮{roleName}辅助面试
        </a>
      ),
    },
    {
      key: '4',
      danger: true,
      label: '要退出吗',
      onClick: () => {
        localStorage.removeItem('token')
        //使用navigate实现重定向
        navigate('/login')
      },
    },
  ]

  return (
    <Header
      style={{
        padding: '0 16px',
        background: colorBgContainer,
      }}
    >
      <div style={{ float: 'right' }}>
        {/* 定义欢迎语 */}
        <span>
          欢迎<span style={{ color: 'blue' }}>{username}</span>回来
        </span>
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
          props.isCollapsed ? (
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

const mapStateToProps = ({ CollApsedReducer: { isCollapsed } }) => {
  return {
    isCollapsed,
  }
}

const mapDispatchToProps = {
  changeCollapsed() {
    return {
      type: 'change_collapsed',
    }
  },
}

export default connect(mapStateToProps, mapDispatchToProps)(TopHeader)
