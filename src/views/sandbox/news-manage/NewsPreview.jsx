import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Typography, Space, Row, Col, Divider } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import axios from 'axios';

const { Title } = Typography;

export default function NewsPreview() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [newsInfo, setNewsInfo] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3000/news/${id}?_expand=category&_expand=role`).then(res => {
      setNewsInfo(res.data);
    });
  }, [id]);

  const auditMap = ['未审核', '审核中', '已通过', '未通过'];
  const publishMap = ['未发布', '待发布', '已上线', '已下线'];
  const colorMap = ['red', 'orange', 'green', 'gray'];

  return newsInfo && (
    <div style={{ padding: 24 }}>
      {/* 顶部标题区 */}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
        <Button type="text" icon={<LeftOutlined />} onClick={() => navigate(-1)} />
        <Title level={4} style={{ margin: 0 }}>
          {newsInfo.title}
          <span style={{ fontSize: 14, marginLeft: 12, color: '#999' }}>{newsInfo.category.title}</span>
        </Title>
      </div>

      {/* 信息栏 */}
      <Row gutter={[24, 16]}>
        <Col span={8}>
          <div>创建者：{newsInfo.author}</div>
          <div>区域：{newsInfo.region}</div>
          <div>访问数量：<span style={{ color: 'green' }}>{newsInfo.view}</span></div>
        </Col>
        <Col span={8}>
          <div>创建时间：{newsInfo.createTime ? new Date(newsInfo.createTime).toLocaleString() : '-'}</div>
          <div>
            审核状态：<span style={{ color: colorMap[newsInfo.auditState] }}>{auditMap[newsInfo.auditState]}</span>
          </div>
          <div>点赞数量：<span style={{ color: 'green' }}>{newsInfo.star}</span></div>
        </Col>
        <Col span={8}>
          <div>发布时间：{newsInfo.publishTime ? new Date(newsInfo.publishTime).toLocaleString() : '-'}</div>
          <div>
            发布状态：<span style={{ color: colorMap[newsInfo.publishState] }}>{publishMap[newsInfo.publishState]}</span>
          </div>
          <div>评论数量：<span style={{ color: 'blue' }}>{newsInfo.comment || 0}</span></div>
        </Col>
      </Row>

      <Divider />

      {/* 正文内容 */}
      <div dangerouslySetInnerHTML={{ __html: newsInfo.content }} style={{ padding: 16, background: '#fff' }} />
    </div>
  );
}