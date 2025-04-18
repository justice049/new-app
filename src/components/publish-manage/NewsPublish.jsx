import React,{useState,useEffect} from 'react';
import { Button,Table, Tag,Modal,Popover, Switch } from 'antd';
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
              <Popover content={<div style={{textAlign:"center"}}>
                <Switch checked= {record.pagepermisson} onChange={()=>SwitchMethod(record)}></Switch>
                {/* pagepermission是否存在，不存在的话就禁用 */}
              </div>} title="配置项" trigger={record.pagepermisson === undefined?'':'click'}>
               <Button type="primary" shape="circle" icon={<EditOutlined />} disabled={
                record.pagepermisson === undefined }/>
               {/* 如果没有配置权限，就不显示 */}
               </Popover>
               <Button danger type="primary" shape="circle" icon={<DeleteOutlined />} onClick=
               {()=>confirmMethod(record)}/>
            </div>
          }
        },
      ];

      const SwitchMethod = (record) => {
          record.pagepermisson = record.pagepermisson===1?0:1
          //同步状态  页面
          setdataSource([...dataSource])
          if(record.grade===1){
            // 同步状态  后端 
            axios.patch(`http://localhost:3000/rights/${record.id}`,{
              pagepermisson:record.pagepermisson
            })
          }
          else{
            axios.patch(`http://localhost:3000/children/${record.id}`,{
              pagepermisson:record.pagepermisson
            })
          }
      }
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
    
        if (record.grade === 1) {
            // 删除一级权限
            //同步状态  页面
            setdataSource(dataSource.filter(item => item.id !== record.id));
            //同步状态  后端
            axios.delete(`http://localhost:3000/rights/${record.id}`);
        } else {
            // 找到对应的父级权限
            //用map
            let list = dataSource.map(item => {
                if (item.id === record.rightId) {
                    //修正children为数组
                    return {
                        ...item,
                        children: Array.isArray(item.children) ? 
                            item.children.filter(child => child.id !== record.id) 
                            : []
                    };
                }
                return item;
            });
            //同步状态
            setdataSource(list);
            axios.delete(`http://localhost:3000/children/${record.id}`);
        }
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

export default RightList;