import React, { useState, useEffect, useRef } from 'react'
import { Button, Table, Modal, Switch, Form, Menu } from 'antd'
import {
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons'
import axios from 'axios'
import UserForm from '../../../components/user-manage/UserForm'

const { confirm } = Modal
function UserList() {
  const [dataSource, setdataSource] = useState([])
  const [isAddVisible, setisAddVisible] = useState(false)
  const [roleList, setroleList] = useState([])
  const [regionList, setregionList] = useState([])
  const [isUpdateVisible, setisUpdateVisible] = useState(false)
  const [isUpdateDisabled, setisUpdateDisabled] = useState(false)
  const [form] = Form.useForm() //创建antd的form实例

  const updateForm = useRef(null)
  const addForm = useRef(null)

  useEffect(() => {
    axios.get('http://localhost:3000/users?_expand=role').then((res) => {
      // console.log(res.data);
      const list = res.data
      setdataSource(list)
    })
  }, [])

  useEffect(() => {
    axios.get('http://localhost:3000/regions').then((res) => {
      // console.log(res.data);
      const list = res.data
      setregionList(list)
    })
  }, [])

  useEffect(() => {
    axios.get('http://localhost:3000/roles').then((res) => {
      // console.log(res.data);
      const list = res.data
      setroleList(list)
    })
  }, [])

  const deleteMethod = (record) => {
    // console.log(record);
    //页面状态+后端
    setdataSource(dataSource.filter((item) => item.id !== record.id))
    axios.delete(`http://localhost:3000/users/${record.id}`)
  }

  const confirmMethod = (record) => {
    confirm({
      title: '确定要删除这个角色吗？',
      icon: <ExclamationCircleOutlined />,
      onOk() {
        deleteMethod(record)
      },
      onCancel() {
        console.log('取消删除')
      },
    })
  }

  const handleChange = (item) => {
    // console.log(item)
    item.roleState = !item.roleState
    setdataSource([...dataSource])

    axios.patch(`http://localhost:3000/users/${item.id}`, {
      roleState: item.roleState,
    })
  }

  const columns = [
    {
      title: '区域',
      dataIndex: 'region',
      render: (region) => {
        return <b>{region === '' ? '全球' : region}</b>
      },
    },
    {
      title: '角色名称',
      dataIndex: 'role',
      render: (role) => {
        return role?.roleName
      },
    },
    {
      title: '用户名',
      dataIndex: 'username',
    },
    {
      title: '用户状态',
      dataIndex: 'roleState',
      render: (roleState, item) => {
        return (
          <Switch
            checked={roleState}
            disabled={item.default}
            onChange={() => handleChange(item)}
          ></Switch>
        )
      },
    },
    {
      title: '操作',
      render: (record) => {
        return (
          <div>
            <Button
              type="primary"
              shape="circle"
              icon={<EditOutlined />}
              disabled={record.default}
              onClick={() => handleUpdate(record)}
            />
            <Button
              danger
              type="primary"
              shape="circle"
              icon={<DeleteOutlined />}
              disabled={record.default}
              onClick={() => confirmMethod(record)}
            />
          </div>
        )
      },
    },
  ]

  const addFormOk = () => {
    addForm.current
      .validateFields()
      .then((value) => {
        // console.log(value)
        setOpen(false)

        addForm.current.resetFields()
        //post到后端生成id，再设置dataSource,方便删除和更新
        // 修正: 确保 `region` 存储的是字符串，而不是 id
        // const selectedRegion = regionList.find(item => item.id === value.region)?.value || "";
        // 添加用户的代码逻辑
        const selectedRegion =
          regionList.find((item) => item.id === value.region)?.value || ''
        axios.post(`http://localhost:3000/users`, {
          ...value,
          region: selectedRegion, // 存储的是区域的名称（如"华东"）
        })
        // 获取所选角色的名称
        const selectedRole =
          roleList.find((item) => item.id === value.roleId)?.roleName || ''
        axios
          .post(`http://localhost:3000/users`, {
            ...value,
            roleState: true,
            default: false,
            region: selectedRegion, // 修正 `region` 的值
            roleName: selectedRole, // 修正 `roleName` 的值
          })
          .then((res) => {
            console.log(res.data)
            setdataSource([
              ...dataSource,
              {
                ...res.data,
                role: roleList.filter((item) => item.id === value.roleId)[0],
              },
            ])
          })
      })
      .catch((errInfo) => {
        console.log(errInfo)
      })
  }

  const [isUpdate, setisUpdate] = useState(false)
  const [updateform] = Form.useForm() //创建antd的updateform实例

  // const handleUpdate = (item) => {
  //   setisUpdateVisible(true)
  //   setisUpdateDisabled(item.default)
  //   if(item.roleId === 1){
  //       //禁用
  //       setisUpdateDisabled(true)
  //   }
  //   else{
  //     setisUpdateDisabled(false) // 启用更新表单的编辑
  //   }
  //   setTimeout(() => {
  //     updateform.setFieldsValue({
  //       username: item.username,
  //       region: item.region,
  //       roleId: item.role?.id,
  //     })
  //   }, 100) // 增加一定的延迟确保 Modal 已渲染

  //   // //更新要想办法让已有数据展示出来
  //   // // setisUpdate(true)
  //   // updateform.setFieldsValue({ // 填充表单数据
  //   // username: item.username,
  //   // region: item.region,
  //   // roleId: item.role?.id
  //   // });
  // }
  // const handleUpdate = (item) => {
  //   setisUpdateVisible(true);
  //   setisUpdateDisabled(item.default);
  //   if (item.roleId === 1) {
  //     setisUpdateDisabled(true);
  //   } else {
  //     setisUpdateDisabled(false);
  //   }
  //   setTimeout(() => {
  //     updateform.setFieldsValue({
  //       username: item.username,
  //       region: item.region,
  //       roleId: item.role?.id,
  //       password: item.password, // 确保密码字段被正确设置
  //     });
  //   }, 100);
  // }
  const handleUpdate = (item) => {
    setisUpdateVisible(true);
    setisUpdateDisabled(item.default);
    setTimeout(() => {
      updateform.setFieldsValue({
        username: item.username,
        password: item.password, // 确保密码字段被正确设置
        region: item.region,
        roleId: item.role?.id,
      });
    }, 100); // 增加一定的延迟确保 Modal 已渲染
  }

  const [open, setOpen] = useState(false)
  const updateFormOk = () => {}

  return (
    <div>
      <Button type="primary" onClick={() => setOpen(true)}>
        添加用户
      </Button>
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={{
          pageSize: 5,
        }}
      >
        rowKey = {(item) => item.id}
      </Table>
      <Modal
        open={open}
        title="添加用户"
        okText="确定"
        cancelText="取消"
        okButtonProps={{ autoFocus: true, htmlType: 'submit' }}
        onCancel={() => setOpen(false)}
        onOk={() => addFormOk()}
        destroyOnClose
        modalRender={(dom) => <Form layout="vertical">{dom}</Form>}
      >
        <UserForm
          regionList={regionList}
          roleList={roleList}
          ref={addForm}
        ></UserForm>
      </Modal>

      {/* 更新  */}
      <Modal
        open={isUpdateVisible}
        title="更新用户"
        okText="更新"
        cancelText="取消"
        okButtonProps={{ autoFocus: true, htmlType: 'submit' }}
        onCancel={() => {setisUpdateVisible(false)
            setisUpdateDisabled(!isUpdateDisabled)
        }}
        onOk={() => updateFormOk()}
        destroyOnClose
        modalRender={(dom) => (
          <Form layout="vertical" form={updateform}>
            {/* //将form实例传递给Form组件 */}
            {dom}
          </Form>
        )}
      >
        <UserForm
          regionList={regionList}
          roleList={roleList}
          form={updateform}
          isUpdateDisabled={isUpdateDisabled}
        ></UserForm>
      </Modal>
    </div>
  )
}

export default UserList
