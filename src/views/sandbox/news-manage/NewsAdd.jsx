import React, { useState,useEffect}  from 'react'
import { Breadcrumb, Typography, Button, Space,Steps, message,theme,Checkbox, Form, Input, Select } from 'antd';
import style from './News.module.css'

const { Title } = Typography;
const description = 'This is a description';
const onFinish = (values) => {
  console.log('Success:', values);
};
const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};
const steps = [
  {
    title: '基本信息',
    content: <Form
    name="basic"
    labelCol={{
      span: 4,
    }}
    wrapperCol={{
      span: 20,
    }}
    style={{
      maxWidth: 600,
      margin: '25px',
    }}
    initialValues={{
      remember: true,
    }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
    <Form.Item
      label="新闻标题"
      name="title"
      rules={[
        {
          required: true,
          message: 'Please input your username!',
        },
      ]}
    >
      <Select>
          <Option>111</Option>
          <Option>323</Option>
          <Option>444</Option>
        </Select>
    </Form.Item>
    <Form.Item
      label="新闻分类"
      name="categoryId"
      rules={[
        {
          required: true,
          message: 'Please input your username!',
        },
      ]}
    >
      <Select>
          <Option>111</Option>
          <Option>323</Option>
          <Option>444</Option>
        </Select>
    </Form.Item>
  </Form>,
  },
  {
    title: '新闻内容',
    content: '新闻主体内容',
  },
  {
    title: '新闻提交',
    content: '保存草稿 审核提交',
  },
];

export default function NewsAdd() {
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };
  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));
  return (
  <div style={{ marginBottom: 24 }}>
      <Breadcrumb items={[
        { title: 'Home' },
        { title: 'List' },
        { title: 'App' },
      ]} />
      <Space style={{ justifyContent: 'space-between', width: '100%' }}>
        <Title level={2} style={{ margin: '16px 0' }}>撰写新闻</Title>
        <Space>
          <Button>Cancel</Button>
          <Button type="primary">Submit</Button>
        </Space>
      </Space>
      <Steps current={current} items={items} />
      <div>{steps[current].content}</div>
      <div
        style={{
          marginTop: 24,
        }}
      >
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            Next
          </Button>
        )}
        
        {current === steps.length - 1 && (
        <>
        <Button type="primary" style={{
              margin: '0 8px',
            }} onClick={() => message.success('Processing complete!')}>
            保存草稿
          </Button>
           <Button type="primary">
           提交审核
         </Button>
         </>
        )}
        {current > 0 && (
          <Button
            style={{
              margin: '0 8px',
            }}
            onClick={() => prev()}
          >
            Previous
          </Button>
        )}
      </div>
    </div>
  )
}
