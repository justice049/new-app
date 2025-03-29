import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Button, Table, Modal } from 'antd';
import { BarsOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

const { confirm } = Modal;

function RoleList() {
    const [dataSource, setdataSource] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:3000/roles').then(res => {
            setdataSource(res.data);
        });
    }, []);

    const confirmMethod = (record) => {
        confirm({
            title: '确定要删除这个角色吗？',
            icon: <ExclamationCircleOutlined />,
            onOk() {
                deleteMethod(record);
            },
            onCancel() {
                console.log('取消删除');
            },
        });
    };

    const deleteMethod = (record) => {
        setdataSource(dataSource.filter(item => item.id !== record.id));
        axios.delete(`http://localhost:3000/roles/${record.id}`);
    };

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        console.log("点击了确认");
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        console.log("点击了取消");
        setIsModalVisible(false);
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            render: (id) => <b>{id}</b>,
        },
        {
            title: '角色名称',
            dataIndex: 'roleName',
        },
        {
            title: "操作",
            render: (item) => (
                <div>
                    <Button type="primary" shape="circle" icon={<BarsOutlined />} onClick={showModal} />
                    <Button 
                        danger 
                        type="primary" 
                        shape="circle" 
                        icon={<DeleteOutlined />} 
                        onClick={() => confirmMethod(item)}
                    />
                </div>
            ),
        }
    ];

    return (
        <div>
            <Table 
                dataSource={dataSource} 
                columns={columns} 
                rowKey={(item) => item.id} 
            />
            {/* Modal 组件 */}
            <Modal 
                title="权限分配" 
                open={isModalVisible} 
                onOk={handleOk} 
                onCancel={handleCancel}
            >
                <p>这里可以放权限分配的内容</p>
                <p>比如角色权限列表</p>
                <p>或者其他选项</p>
            </Modal>
        </div>
    );
}

export default RoleList;
