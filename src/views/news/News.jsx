import axios from 'axios'
import React, { useEffect } from 'react'
import { Card, Space } from 'antd'
import { Row, Col, List } from 'antd'
import { Typography} from 'antd';
import _ from 'lodash'
const { Link } = Typography;
const { Title } = Typography;


export default function News() {
  const [list,setlist] = useState([])
  useEffect(() => {
    axios.get('/news?publishState=2&_expand=category').then((res) => {
      setlist(Object.entries(_.groupBy(res.data,item=>item.category.title)))
    })
  }, [])
  return (
    <div>
    <div style={{padding: '16px', display: 'flex', alignItems: 'center'}}>
       <Title level={2} style={{ margin: 0 }}>
        全球大新闻
      </Title>
      <Link href="#" style={{ color: '#fff', marginLeft: '16px' }}>
        查看新闻
      </Link>
    </div>
    <div
      style={{
        width: '95%',
        margin: '0 auto',
      }}
    >
      <Row gutter={[16,16]}>
        <Col span={8}>
          <Card title="Card title" variant="border" hoverable={true}>
            <List
              size="small"
              dataSource={[111, 222, 333]}
              pagination={{
                pageSize: 3,
              }}
              renderItem={(item) => <List.Item>{item}</List.Item>}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Card title" variant="border" hoverable={true}>
          <List
              size="small"
              dataSource={[111, 222, 333]}
              pagination={{
                pageSize: 3,
              }}
              renderItem={(item) => <List.Item>{item}</List.Item>}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Card title" variant="border" hoverable={true}>
          <List
              size="small"
              dataSource={[111, 222, 333]}
              pagination={{
                pageSize: 3,
              }}
              renderItem={(item) => <List.Item>{item}</List.Item>}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Card title" variant="border" hoverable={true}>
          <List
              size="small"
              dataSource={[111, 222, 333]}
              pagination={{
                pageSize: 3,
              }}
              renderItem={(item) => <List.Item>{item}</List.Item>}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Card title" variant="border" hoverable={true}>
          <List
              size="small"
              dataSource={[111, 222, 333]}
              pagination={{
                pageSize: 3,
              }}
              renderItem={(item) => <List.Item>{item}</List.Item>}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Card title" variant="border" hoverable={true}>
          <List
              size="small"
              dataSource={[111, 222, 333]}
              pagination={{
                pageSize: 3,
              }}
              renderItem={(item) => <List.Item>{item}</List.Item>}
            />
          </Card>
        </Col>
      </Row>
    </div>
    </div>
  )
}
