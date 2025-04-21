import React,{ useEffect,useState } from 'react'
import axios from 'axios'

function usePublish(type) {
  //   不是组件，是自定义hooks
  const { username } = JSON.parse(localStorage.getItem('token'))
  const [dataSource, setDataSource] = useState([])
  useEffect(() => {
    axios(`/news?author=${username}&publishState=${type}&_expand=category`).then(
      (res) => {
        setDataSource(res.data)
      }
    )
  }, [username,type])

  const handlePublish = (id)=>{
    console.log(id)
  }
  const handleSunset = (id)=>{

  }
  const handleDelete = (id)=>{
    
  }

  return{
    dataSource,
    handlePublish,
    handleSunset,
    handleDelete,
  }
}

export default usePublish
