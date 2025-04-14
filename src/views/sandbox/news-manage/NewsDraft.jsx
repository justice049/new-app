import React,{useState,useEffect} from 'react';
import { Button,Table,Modal} from 'antd';
import { EditOutlined,DeleteOutlined,VerticalAlignTopOutlined,UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import { data } from 'react-router-dom';
import { render } from 'nprogress';
const { confirm } = Modal;

function NewsDraft() {
    const [dataSource,setdataSource]=useState([])

    const {username} = JSON.parse(localStorage.getItem('token'))
    useEffect(()=>{
        axios.get(`/news?author=${username}&auditState=0&_expand=category`).then(res=>{
          const list = res.data
          setdataSource(list)
       })
    },[username])
    const columns = [
        {
          title: 'ID',
          dataIndex: 'id',
          render:(id)=>{
            return <b>{id}</b>
          }
        },
        {
          title: '新闻标题',
          dataIndex: 'title',
        },
        {
          title: '作者',
          dataIndex: 'author',
        },
        {
          title: '分类',
          dataIndex: 'category',
          render:(category)=>{
              return category.title
          }
        },
        {
          title: '操作',
          render:(record)=>{
            return <div>
               <Button type="primary" shape="circle" icon={<EditOutlined />} disabled={
                record.pagepermisson === undefined }/>
               {/* 如果没有配置权限，就不显示 */}
               <Button danger type="primary" shape="circle" icon={<DeleteOutlined />} onClick=
               {()=>confirmMethod(record)}/>
                 <Button shape="circle" icon={<UploadOutlined />}/>
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
        console.log(record);
        // setdataSource(dataSource.filter(item=>item.id !== record.id))
        // axios.delete(`/news/${record.id}`)
    };

    return (
        <div>
            <Table dataSource={dataSource} columns={columns} pagination={{
              //一页显示几条数据
              pageSize:5
            }}/>
        </div>
    );
}

export default NewsDraft;