import React, { useEffect, useRef, useState } from 'react';
import { Card, Col, Row, List, Drawer } from 'antd';
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { Avatar } from 'antd';
import axios from 'axios';
import * as Echarts from 'echarts';
import _ from 'lodash';

const { Meta } = Card;

function Home() {
  const [viewList, setviewList] = useState([]);
  const [starList, setstarList] = useState([]);
  const [visible, setvisible] = useState(false);

  const barRef = useRef(null);
  const pieRef = useRef(null);

  useEffect(() => {
    axios
      .get(
        '/news?publishState=2&_expand=category&_sort=view&_order=desc&_limit=6'
      )
      .then((res) => {
        setviewList(res.data);
      })
      .catch((err) => {
        console.error('Request failed', err);
      });
  }, []);

  useEffect(() => {
    axios
      .get(
        '/news?publishState=2&_expand=category&_sort=star&_order=desc&_limit=6'
      )
      .then((res) => {
        setstarList(res.data);
      })
      .catch((err) => {
        console.error('Request failed', err);
      });
  }, []);

  useEffect(() => {
    let barCleanup;
    let barResizeHandler;

    const fetchDataAndRender = async () => {
      try {
        const res = await axios.get('/news?publishState=2&_expand=category');
        if (barRef.current) {
          barCleanup = renderBarView(
            _.groupBy(res.data, (item) => item.category.title)
          );
          barResizeHandler = () => {
            if (barCleanup) {
              const myChart = Echarts.getInstanceByDom(barRef.current);
              if (myChart) {
                myChart.resize();
              }
            }
          };
          window.addEventListener('resize', barResizeHandler);
        }
      } catch (err) {
        console.error('Request failed', err);
      }
    };

    fetchDataAndRender();

    return () => {
      if (typeof barCleanup === 'function') {
        barCleanup();
      }
      if (barResizeHandler) {
        window.removeEventListener('resize', barResizeHandler);
      }
    };
  }, []);

  const renderBarView = (obj) => {
    if (!barRef.current) return;
    var myChart = Echarts.init(barRef.current);

    var option = {
      title: {
        text: '新闻分类图示',
      },
      tooltip: {},
      legend: {
        data: ['数量'],
      },
      xAxis: {
        data: Object.keys(obj),
        axisLabel: {
          rotate: 60,
          interval: 0,
        },
      },
      yAxis: {
        minInterval: 1,
      },
      series: [
        {
          name: '数量',
          type: 'bar',
          data: Object.values(obj).map((item) => item.length),
        },
      ],
    };

    myChart.setOption(option);

    return () => {
      myChart.dispose();
    };
  };

  const renderPieView = (data) => {
    if (!pieRef.current) return;
    const myChart = Echarts.init(pieRef.current);

    const option = {
      title: {
        text: '个人新闻分类',
        subtext: '按分类统计',
        left: 'center',
      },
      tooltip: {
        trigger: 'item',
      },
      legend: {
        orient: 'vertical',
        left: 'left',
      },
      series: [
        {
          name: '新闻数量',
          type: 'pie',
          radius: '50%',
          data: data,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        },
      ],
    };

    myChart.setOption(option);

    const resizeHandler = () => {
      myChart.resize();
    };
    window.addEventListener('resize', resizeHandler);

    return () => {
      window.removeEventListener('resize', resizeHandler);
      myChart.dispose();
    };
  };

  const tokenData = localStorage.getItem('token');
  const {
    username = '',
    region = '',
    role: { roleName = '' } = {},
  } = tokenData ? JSON.parse(tokenData) : {};

  return (
    <div>
      <Row gutter={16}>
        <Col span={8}>
          <Card title="用户最常浏览" variant="border">
            <List
              size="small"
              dataSource={viewList}
              renderItem={(item) => (
                <List.Item>
                  <a href={`#/news-manage/preview/${item.id}`}>{item.title}</a>
                </List.Item>
              )}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card title="用户点赞最多" variant="border">
            <List
              size="small"
              dataSource={starList}
              renderItem={(item) => (
                <List.Item>
                  <a href={`#/news-manage/preview/${item.id}`}>{item.title}</a>
                </List.Item>
              )}
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
              <SettingOutlined
                key="setting"
                onClick={async () => {
                  setvisible(true);
                  setTimeout(async () => {
                    const token = JSON.parse(localStorage.getItem('token'));
                    const username = token?.username;

                    try {
                      const res = await axios.get(
                        `/news?author=${username}&publishState=2&_expand=category`
                      );
                      const groupedData = _.groupBy(
                        res.data,
                        (item) => item.category.title
                      );
                      const pieData = Object.keys(groupedData).map((key) => ({
                        name: key,
                        value: groupedData[key].length,
                      }));
                      renderPieView(pieData);
                    } catch (err) {
                      console.error('Failed to fetch pie data', err);
                    }
                  }, 300);
                }}
              />,
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
                  <b>{region ? region : '全球'}</b>
                  <span
                    style={{
                      paddingLeft: '30px',
                    }}
                  >
                    {roleName}
                  </span>
                </div>
              }
            />
          </Card>
        </Col>
      </Row>

      <Drawer
        width="500px"
        title="个人新闻分类"
        placement="right"
        closable={true}
        onClose={() => {
          setvisible(false);
        }}
        visible={visible}
      >
        <div
          ref={pieRef}
          style={{
            width: '100%',
            height: '400px',
            marginTop: '30px',
          }}
        ></div>
      </Drawer>

      <div
        ref={barRef}
        style={{
          width: '100%',
          height: '400px',
          marginTop: '30px',
        }}
      ></div>
    </div>
  );
}

export default Home;