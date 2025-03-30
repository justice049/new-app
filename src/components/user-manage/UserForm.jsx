import React,{useState,useEffect, forwardRef} from 'react';
import { Button,Table, Tag,Modal,Popover, Switch,Form,Input,Radio,Select } from 'antd';
import { EditOutlined,DeleteOutlined,ExclamationCircleOutlined } from '@ant-design/icons';
import axios from 'axios';
import { data } from 'react-router-dom';
import Item from 'antd/es/list/Item';
const { confirm } = Modal;

// 封装一下
const UserForm=forwardRef((props,ref) => {
    // 使用forwardRef传参ref
    const onChange = (value) => {
        console.log(`selected ${value}`);
      };
      const onSearch = (value) => {
        console.log('search:', value);
      };
  return (
    <div>
        <Form.Item
          ref={ref}
          name="username"
          label="用户名"
          rules={[{ required: true, message: 'Please input the title of collection!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="password" label="密码"  rules={[{ required: true, message: 'Please input the title of collection!' }]} >
          <Input type="textarea" />
        </Form.Item>
        <Form.Item name="region" label="区域"  rules={[{ required: true, message: 'Please input the title of collection!' }]}>
        <Select
    showSearch
    placeholder="Select a region"
    optionFilterProp="label"
    onChange={onChange}
    onSearch={onSearch}
    options={
      //动态渲染
      props.regionList.map(item=>{
        return {
          value:item.id,
          label:item.value
        }
      })
     }
  />
        </Form.Item>
        <Form.Item name="roleId" label="角色"  rules={[{ required: true, message: 'Please input the title of collection!' }]}>
        <Select
    showSearch
    placeholder="Select a role"
    optionFilterProp="label"
    onChange={onChange}
    onSearch={onSearch}
    options={
      //动态渲染
      props.roleList.map(item=>{
        return {
          value:item.id,
          label:item.roleName
        }
      })
     }
  />
        </Form.Item>
    </div>
  )
})

export default UserForm;

