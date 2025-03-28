import React,{useState,useEffect} from 'react';
import { Button,Table, Tag,Modal } from 'antd';
import { EditOutlined,DeleteOutlined,ExclamationCircleOutlined } from '@ant-design/icons';
import axios from 'axios';
import { data } from 'react-router-dom';
const { confirm } = Modal;

function RightList() {
    const [dataSource,setdataSource]=useState([])
    useEffect(()=>{
        axios.get("http://localhost:3000/rights?_embed=children").then(res=>{
          const list = res.data
          // list[0].children = ""  不建议写死
          list.forEach(item=>{
            if(item.children.length===0){
              item.children = ""
            }
          })
          setdataSource(list)
       })
    },[])
    const columns = [
        {
          title: 'ID',
          dataIndex: 'id',
          render:(id)=>{
            return <b>{id}</b>
          }
        },
        {
          title: '权限名称',
          dataIndex: 'title',
        },
        {
          title: '权限路径',
          dataIndex: 'key',
          render:(key)=>{
            return <Tag color='orange'>{key}</Tag>
          }
        },
        {
          title: '操作',
          render:(record)=>{
            return <div>
               <Button type="primary" shape="circle" icon={<EditOutlined />}/>
               <Button danger type="primary" shape="circle" icon={<DeleteOutlined />} onClick=
               {()=>confirmMethod(record)}/>
            </div>
          }
        },
      ];
      const confirmMethod = (record) => {
        confirm({
          title: 'Do you Want to delete these items?',
          icon: <ExclamationCircleOutlined />,
          onOk() {
            deleteMethod(record)
          },
          onCancel() {
            console.log('Cancel');
          },
        });
        console.log('确认删除')
      };

      const deleteMethod = (record) => {
        console.log(record)
        if(record.grade === 1){
            //同步状态  页面
            setdataSource(dataSource.filter(item=>item.id!==record.id))
            //同步状态  后端
            axios.delete(`http://localhost:3000/rights/${record.id}`)
        }
        else{
          let list = dataSource.filter(item=>item.id!==record.rightId)
          list[0].children = list[0].children.filter(item=>item.id!==record.id)
          setdataSource([...dataSource])
        }
      }

    return (
        <div>
            <Table dataSource={dataSource} columns={columns} pagination={{
              //一页显示几条数据
              pageSize:5
            }}/>
        </div>
    );
}

export default RightList;