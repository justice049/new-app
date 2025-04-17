import React from 'react'
import axios from 'axios'

export default function AuditList() {
  const {username} = JSON.parse(localStorage.getItem('token'))
  useEffect(()=>{
    axios(`/news?authorId=${username}&auditState_ne=0&publishState_lte=1_expand=category`).then(res=>{
      console.log(res.data)
    })
  },[username])
  return (
    <div>AuditList</div>
  )
}
