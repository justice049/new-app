import React,{useState,useEffect} from 'react';
import { Button,Table, Tag,Modal,Popover, Switch } from 'antd';
import { EditOutlined,DeleteOutlined,ExclamationCircleOutlined } from '@ant-design/icons';
import axios from 'axios';
import { data } from 'react-router-dom';
import Item from 'antd/es/list/Item';
const { confirm } = Modal;

function UserList() {
    const [dataSource,setdataSource]=useState([])
    useEffect(()=>{
        axios.get("http://localhost:3000/users?_expand=role").then(res=>{
          console.log(res.data);
          const list = res.data
          setdataSource(list)
       })
    },[])
    const columns = [
        {
          title: '区域',
          dataIndex: 'region',
          render:(region)=>{
            return <b>{region===""?'全球':region}</b>
        }
        },
        {
          title: '角色名称',
          dataIndex: 'role',
          render:(role)=>{
              return role?.roleName
          }
        },
        {
          title: '用户名',
          dataIndex: 'username',
        },
        {
            title:"用户状态",
            dataIndex:"roleState",
            render:(roleState,item)=>{
                return <Switch checked={roleState} disabled={item.default}>

                </Switch>
            }
        },
        {
          title: '操作',
          render:(record)=>{
            return <div>
               <Button type="primary" shape="circle" icon={<EditOutlined />} disabled={record.default} />
               <Button danger type="primary" shape="circle" icon={<DeleteOutlined />} disabled={record.default}/>
            </div>
          }
        },
      ];

      const deleteMethod = (record) => {
        console.log(record);
      }

      return (
        <div>
            <Button></Button>
            <Table dataSource={dataSource} columns={columns}
            pagination={{
              pageSize:5 
            }}
            >
            rowKey = {item => item.id}
            </Table>
        </div>
      )
}

export default UserList;