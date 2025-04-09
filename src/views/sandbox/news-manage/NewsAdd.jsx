import React, { useState, useEffect,useRef } from 'react'
import {
  Breadcrumb,
  Typography,
  Button,
  Space,
  Steps,
  message,
  theme,
  Checkbox,
  Form,
  Input,
  Select,
} from 'antd'
import style from './News.module.css'
import axios from 'axios'
import { set } from 'nprogress'
import NewsEditor from '../../../../src/components/news-manage/NewsEditor.jsx'

const { Title } = Typography
const description = 'This is a description'
const { Option } = Select

const onFinish = (values) => {
  console.log('Success:', values)
}
const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo)
}

export default function NewsAdd() {
  const { token } = theme.useToken()
  const [current, setCurrent] = useState(0)
  const [categoryList, setCategoryList] = useState([])
  const NewsForm = useRef(null)
  const steps = [
    {
      title: '基本信息',
      content: (
        <Form
          name="basic"
          ref = {NewsForm}
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
            <Input></Input>
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
              {categoryList.map((item) => (
                <Select.Option value={item.id} key={item.id}>
                  {item.title}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      ),
    },
    {
      title: '新闻内容',
      // 留一个回调函数用于子传父
      content: <NewsEditor getContent={(value)=>{
        
      }}>
         
      </NewsEditor>,
    },
    {
      title: '新闻提交',
      content: '保存草稿 审核提交',
    },
  ]
  const next = () => {
    if(current === 0){
      NewsForm.current.validateFields().then((res) => {
        console.log(res)
        setCurrent(current + 1)
      }).catch((err) => {
        console.log(err)
      })
    }
    else{
      setCurrent(current + 1)
    }
  }
  const prev = () => {
    setCurrent(current - 1)
  }
  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }))
  useEffect(() => {
    axios.get('/categories').then((res) => {
      setCategoryList(res.data)
    })
  }, [])

  return (
    <div style={{ marginBottom: 24 }}>
      <Breadcrumb
        items={[{ title: 'Home' }, { title: 'List' }, { title: 'App' }]}
      />
      <Space style={{ justifyContent: 'space-between', width: '100%' }}>
        <Title level={2} style={{ margin: '16px 0' }}>
          撰写新闻
        </Title>
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
            <Button
              type="primary"
              style={{
                margin: '0 8px',
              }}
              onClick={() => message.success('Processing complete!')}
            >
              保存草稿
            </Button>
            <Button type="primary">提交审核</Button>
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
