import React, { useEffect } from 'react'
import NewsPublish from '../../../components/publish-manage/NewsPublish'
import usePublish from '../../../components/publish-manage/usePublish'
import { Button } from 'antd'

export default function Unpublished() {
  const {dataSource,handlePublish} = usePublish(1)
  return (
    <div>
      {/* 回调函数传来id再传给publish，这样就知道发布谁了 */}
      <NewsPublish dataSource={dataSource} button={(id)=>
        <Button type="primary"  onClick={()=>handlePublish(id)}>
          发布
        </Button>
      }></NewsPublish>
    </div>
  )
}
