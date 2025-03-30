import React,{useState,useEffect,useRef} from 'react';
import { Button,Table, Tag,Modal,Popover, Switch,Form,Input,Radio,Select } from 'antd';
import { EditOutlined,DeleteOutlined,ExclamationCircleOutlined } from '@ant-design/icons';
import axios from 'axios';
import { data } from 'react-router-dom';
import Item from 'antd/es/list/Item';
import UserForm from '../../../components/user-manage/UserForm';

const { confirm } = Modal;
function UserList() {
    const [dataSource,setdataSource]=useState([])
    const [isAddVisible,setisAddVisible]=useState(false)
    const [roleList,setroleList]=useState([])
    const [regionList,setregionList]=useState([])
    const addForm = useRef(null)

    useEffect(()=>{
        axios.get("http://localhost:3000/users?_expand=role").then(res=>{
          console.log(res.data);
          const list = res.data
          setdataSource(list)
       })
    },[])

    useEffect(()=>{
      axios.get("http://localhost:3000/regions").then(res=>{
        console.log(res.data);
        const list = res.data
        setregionList(list)
     })
  },[])

  useEffect(()=>{
    axios.get("http://localhost:3000/roles").then(res=>{
      console.log(res.data);
      const list = res.data
      setroleList(list)
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

      const [open, setOpen] = useState(false);

      return (
        <div>
            <Button type='primary' onClick={
              () => setOpen(true)
            }>添加用户</Button>
            <Table dataSource={dataSource} columns={columns}
            pagination={{
              pageSize:5 
            }}
            >
            rowKey = {item => item.id}
            </Table>
            <Modal
        open={open}
        title="添加用户"
        okText="确定"
        cancelText="取消"
        okButtonProps={{ autoFocus: true, htmlType: 'submit' }}
        onCancel={() => setOpen(false)}
        onOk={()=>{
          console.log("add")
        }}
        destroyOnClose
        modalRender={(dom) => (
          <Form
            layout="vertical"
          >
            {dom}
          </Form>
        )}
      >
        <UserForm regionList={regionList} roleList={roleList}
        ref={addForm}
        ></UserForm>
      </Modal>
        </div>
      )
}

export default UserList;