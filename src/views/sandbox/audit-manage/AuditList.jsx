import React from 'react'
import axios from 'axios'
import { Table,Button,Tag,notification } from'antd'
import { useEffect } from 'react'
import { useState } from 'react'
import { render } from 'nprogress'
import { useNavigate } from 'react-router-dom'


export default function AuditList() {
  const [dataSource,setdataSource] = useState([])
  const {username} = JSON.parse(localStorage.getItem('token'))
  const navigate = useNavigate()
  useEffect(()=>{
    axios(`/news?author=${username}&auditState_ne=0&publishState_lte=1&_expand=category`).then(res=>{
      console.log(res.data)
      setdataSource(res.data)
    })
  },[username])

  const columns = [
    {
      title: '新闻标题',
      dataIndex: 'title',
      render:(title,item)=>{
        return <a href={`#/news-manage/preview/${item.id}`}>{title}</a>
      }
    },
    {
      title: '作者',
      dataIndex: 'author',
    },
     {
      title: '新闻分类',
      dataIndex: 'category',
      render:(category)=>{
        return <Tag color='orange'>{category.title}</Tag>
      }
    },
    {
      title: '审核状态',
      dataIndex: 'auditState',
      render:(auditState)=>{
        const colorList = ["","orange","green","red"]
        const auditList = ["草稿箱","审核中","已通过","未通过"]
        return <Tag color={colorList[auditState]}>{auditList[auditState]}</Tag>
      }
    },
    {
      title: '操作',
      render:(item)=>{
        return <div>
          {
            item.auditState===1&&<Button onClick={()=>handleRervert(item)}>撤销</Button>
          }
          {
            item.auditState===2&&<Button danger onClick={()=>handlePublish(item)}>发布</Button>
          }
          {
            item.auditState===3&&<Button type='primary' onClick={()=>handleUpdate(item)}>更新</Button>
          }
        </div> 
      }
    },
  ];

  const handleRervert = (item)=>{
    //先把数据从本地列表中移除
    setdataSource(dataSource.filter(data=>data.id!==item.id))
    // 补丁示更新后端数据
    axios.patch(`/news/${item.id}`,{
      auditState:0
    }).then(res=>{
      notification.info({
        message: `通知`,
        description: `您可以到草稿箱查看您的新闻`,
        placement: 'bottomRight',
      })
    })
  }

  const handleUpdate = (item)=>{
     navigate(`/news-manage/update/${item.id}`)
  }

  const handlePublish = (item)=>{
    axios.patch(`/news/${item.id}`, {
      "publishState": 2,
      "publishTime": Date.now(),
    }).then((res) => {
      navigate('/publish-manage/published')
     notification.info({
      message:`通知`,
      description:
      `您可以到[发布管理/已发布]中查看您的新闻`,
      placement: 'bottomRight',
    })
  }) 
  }

  return (
    <div>
      <Table dataSource={dataSource} columns={columns} pagination={{
              //一页显示几条数据
              pageSize:5
        }}
        rowKey="id"
        />
    </div>
  )
}
