import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Button, Table, Modal,Tree } from 'antd'
import {
  BarsOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons'

const { confirm } = Modal

function RoleList() {
  const [dataSource, setdataSource] = useState([])
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [rightList, setRightList] = useState([])
  //默认选中
  const [currentRights, setCurrentRights] = useState([])
  const [currentId,setCurrentId] = useState(0)

  useEffect(() => {
    axios.get('http://localhost:3000/roles').then((res) => {
      setdataSource(res.data)
    })
  }, [])

  useEffect(() => {
    axios.get('http://localhost:3000/rights?_embed=children').then((res) => {
      setRightList(res.data)
    })
  }, [])

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

  const deleteMethod = (record) => {
    setdataSource(dataSource.filter((item) => item.id !== record.id))
    axios.delete(`http://localhost:3000/roles/${record.id}`)
  }

  const showModal = () => {
    setIsModalVisible(true)
    //dataSource重新映射
  }

  const handleOk = () => {
    console.log('点击了确认')
    setIsModalVisible(false)
    setdataSource(dataSource.map(item=>{
        if(item.id === currentId){
            return{
                ...item,
                rights:currentRights
            }
        }
        else{
            return item
        }
    }))
    //patch
    axios.patch(`http://localhost:3000/roles/${currentId}`,{
        rights:currentRights
    })
  }

  const handleCancel = () => {
    console.log('点击了取消')
    setIsModalVisible(false)
  }

  // 选中的权限
  const onCheck = (checkedKeys, checkedInfo) => {
    setCurrentRights(checkedKeys)
  }

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      render: (id) => <b>{id}</b>,
    },
    {
      title: '角色名称',
      dataIndex: 'roleName',
    },
    {
      title: '操作',
      render: (item) => (
        <div>
          <Button
            type="primary"
            shape="circle"
            icon={<BarsOutlined />}
            onClick={()=>{
                setIsModalVisible(true)
                setCurrentRights(item.rights)
                setCurrentId(item.id)
            }}
          />
          <Button
            danger
            type="primary"
            shape="circle"
            icon={<DeleteOutlined />}
            onClick={() => confirmMethod(item)}
          />
        </div>
      ),
    },
  ]

  return (
    <div>
      <Table
        dataSource={dataSource}
        columns={columns}
        rowKey={(item) => item.id}
      />
      {/* Modal 组件 */}
      <Modal
        title="权限分配"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Tree
          checkable 
          treeData={rightList}
          checkedKeys={currentRights}
          checkStrictly = {true} 
          onCheck={onCheck}
          />
      </Modal>
    </div>
  )
}

export default RoleList
