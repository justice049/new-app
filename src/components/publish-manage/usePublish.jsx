import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { notification } from 'antd'
import { useNavigate } from 'react-router-dom'

function usePublish(type) {
  //   不是组件，是自定义hooks
  const { username } = JSON.parse(localStorage.getItem('token'))
  const navigate = useNavigate()
  const [dataSource, setDataSource] = useState([])
  useEffect(() => {
    axios(
      `/news?author=${username}&publishState=${type}&_expand=category`
    ).then((res) => {
      setDataSource(res.data)
    })
  }, [username, type])

  const handlePublish = (id) => {
    setDataSource(dataSource.filter((item) => item.id !== id))
    axios.patch(`/news/${id}`, {
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
  const handleSunset = (id) => {
    setDataSource(dataSource.filter((item) => item.id !== id))
    axios.patch(`/news/${id}`, {
        "publishState": 3,
        "publishTime": Date.now(),
      }).then((res) => {
        navigate('/publish-manage/sunset')
       notification.info({
        message:`通知`,
        description:
        `您可以到[发布管理/已下线]中查看您的新闻`,
        placement: 'bottomRight',
      })
    }) 
  }
  const handleDelete = (id) => {
    setDataSource(dataSource.filter((item) => item.id !== id))
    axios.delete(`/news/${id}`).then((res) => {
       notification.info({
        message:`通知`,
        description:
        `您已经删除了已下线的新闻`,
        placement: 'bottomRight',
      })
    }) 
  }

  return {
    dataSource,
    handlePublish,
    handleSunset,
    handleDelete,
  }
}

export default usePublish
