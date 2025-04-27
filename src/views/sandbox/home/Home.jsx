import React, { useEffect } from 'react'
import 'axios'
import { Card, Col, Row, List } from 'antd'
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import axios from 'axios';
import echarts from 'echarts';
import { useState } from'react'
const { Meta } = Card;

function Home() {
    const [viewList, setviewList] = useState([])
    const [starList, setstarList] = useState([])
    useEffect(()=>{
       axios.get("http://localhost:3000/news?publishState=2&_expand=category&_sort=view&_order=desc&_limit=6").then(res=>{
        setviewList(res.data)
       }).catch(err => {
        console.error('Request failed', err)
      })
    },[])
    useEffect(()=>{
        axios.get("http://localhost:3000/news?publishState=2&_expand=category&_sort=star&_order=desc&_limit=6").then(res=>{
         setstarList(res.data)
        }).catch(err => {
         console.error('Request failed', err)
       })
     },[])
     useEffect(()=>{
        var myChart = echarts.init(document.getElementById('main'));

      // 指定图表的配置项和数据
      var option = {
        title: {
          text: 'ECharts 入门示例'
        },
        tooltip: {},
        legend: {
          data: ['销量']
        },
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [
          {
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
     },[])
     const {username,region,role:{roleName}} = JSON.parse(localStorage.getItem('token'))
  return (
    <div>
      <Row gutter={16}>
        <Col span={8}>
          <Card title="用户最常浏览" variant="border">
            <List
              size="small"
              dataSource={viewList}
              renderItem={(item) => <List.Item>
                <a href={`#/news-manage/preview/${item.id}`}>{item.title}</a>
                </List.Item>}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card title="用户点赞最多" variant="border">
            <List
              size="small"
              dataSource={starList}
              renderItem={(item) => <List.Item><a href={`#/news-manage/preview/${item.id}`}>{item.title}</a></List.Item>}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card
            cover={
              <img
                alt="example"
                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
              />
            }
            actions={[
              <SettingOutlined key="setting" />,
              <EditOutlined key="edit" />,
              <EllipsisOutlined key="ellipsis" />,
            ]}
          >
            <Meta
              avatar={
                <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />
              }
              title={username}
              description={
                <div>
                    <b>{region?region:'全球'}</b>
                    <span style={{
                        paddingLeft:"30px" 
                    }}>{roleName}</span> 
                </div>
              }
            />
          </Card>
        </Col>
      </Row>

      <div id="main" style={{
        height:"400px",
        marginTop:"30px",
      }}></div>

    </div>
  )
}

export default Home
