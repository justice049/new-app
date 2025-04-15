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
  notification,
} from 'antd'
import style from './News.module.css'
import axios from 'axios'
import { set } from 'nprogress'
import NewsEditor from '../../../../src/components/news-manage/NewsEditor.jsx'
import { useNavigate } from 'react-router-dom'

const { Title } = Typography
const description = 'This is a description'
const { Option } = Select

const onFinish = (values) => {
  console.log('Success:', values)
}
const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo)
}

export default function NewsAdd(props) {
  const { token } = theme.useToken()
  const [current, setCurrent] = useState(0)
  const [categoryList, setCategoryList] = useState([])

  const [formInfo, setFormInfo] = useState({})
  //用于存储新闻内容
  const [content, setContent] = useState("")
  const User = JSON.parse(localStorage.getItem('token')) 

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
        // console.log(value) 
        setContent(value)
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
        setFormInfo(res)
        setCurrent(current + 1)
      }).catch((err) => {
        console.log(err)
      })
    }
    else{
      if(content === "" || content.trim()==="<p></p>"){
        //如果收集的是空的就不放行
        message.error('新闻内容不能为空')
        return
      }
      else{
        setCurrent(current + 1)
      }
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

  // 在useEffect中处理历史内容（可以从服务器或父组件传递过来）
  useEffect(() => {
    // 如果props.content有值（历史内容），则初始化为该内容
    if (props.content) {
      setContent(props.content);  // 假设历史内容是props.content
    }
  }, [props.content]);

  const handleContentChange = (newContent) => {
    setContent(newContent); // 更新内容
  };

  // return (
  //   <div>
  //     {/* 将历史内容传递给 NewsEditor */}
  //     <NewsEditor content={content} getContent={handleContentChange} />
  //     {/* 其他代码 */}
  //   </div>
  // );

  const navigate = useNavigate()
  const handleSave = (auditState) => {
    axios.post('/news', {
      ...formInfo,
      "content":content,
      "region": User.region?User.region:"全球",
      "author": User.username,
      "roleId": User.roleId,
      "auditState": auditState,
      "publishState": 0,
      "createTime": Date.now(),
      "star":0,
      "view":0,
      "publishState": 0,
    }).then((res) => {
       //这个写法已经舍弃了
      //  props.history.push(auditState===0?'/news-manage/draft':'/audit-manage/list')
      navigate(auditState === 0 ? '/news-manage/draft' : '/audit-manage/list')
     notification.info({
      message:`通知`,
      description:
      `您可以到${auditState===0?'草稿箱':'审核列表'}查看您的新闻`,
      placement: 'bottomRight',
    })
  })
}

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
              onClick={() => handleSave(0)}
            >
              保存草稿
            </Button>
            <Button type="primary" onClick={() => handleSave(1)}>提交审核</Button>
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
