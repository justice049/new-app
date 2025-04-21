import React, { useEffect } from 'react'
import { useState } from 'react'
import NewsPublish from '../../../components/publish-manage/NewsPublish'
import axios from 'axios'

export default function Unpublished() {
  const {username} = JSON.parse(localStorage.getItem('token'))
  const [dataSource,setDataSource] = useState([])
  useEffect(() => {
    axios(`/news?author=${username}&publishState=1&_expand=category`).then(res=>{
      setDataSource(res.data)
    })
  },[username])
  return (
    <div>
      <NewsPublish dataSource={dataSource}></NewsPublish>
    </div>
  )
}
