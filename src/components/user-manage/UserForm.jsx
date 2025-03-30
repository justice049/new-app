import React, { useState,forwardRef, useImperativeHandle } from 'react';
import { Form, Input, Select } from 'antd';

// 封装一下
const UserForm = forwardRef((props, ref) => {
    // 使用forwardRef 可以让子组件获取父组件的方法
    const [form] = Form.useForm();

  // 让外部 ref 访问 form 的方法
  useImperativeHandle(ref, () => ({
    validateFields: () => form.validateFields(),
    resetFields: () => form.resetFields(),
  }));

  const [isDisabled, setIsDisabled] = useState(false);

  // 选择框事件
  // 角色选择事件
const handleRoleChange = (value) => {
    if (value === 1) { 
      setIsDisabled(true);
      form.setFieldsValue({ region: "" }); // 清空区域
    } else {
      setIsDisabled(false);
    }
  };

  const confirmMethod = (record) => {
    confirm({
      title: '确定要删除这个角色吗？',
      icon: <ExclamationCircleOutlined />,
      onOk() {
        deleteMethod(record)
      },
      onCancel() {
        console.log('取消删除')
      },
    })
  }
  
  // 区域选择事件 (不影响角色逻辑)
  const handleRegionChange = (value) => {
    console.log("区域选择:", value);
  };
  

  return (
    <Form form={form} layout="vertical"> 
      {/* 用户名 */}
      <Form.Item
        name="username"
        label="用户名"
        rules={[{ required: true, message: '请输入用户名' }]}
      >
        <Input placeholder="请输入用户名" />
      </Form.Item>

      {/* 密码 */}
      <Form.Item
        name="password"
        label="密码"
        rules={[{ required: true, message: '请输入密码' }]}
      >
        <Input.Password placeholder="请输入密码" />
      </Form.Item>

      {/* 区域选择 */}
      <Form.Item
        name="region"
        label="区域"
        rules={isDisabled?[]:[{ required: true, message: '请选择区域' }]}
      >
        <Select
        disabled={isDisabled}
          showSearch
          placeholder="请选择区域"
          optionFilterProp="label"
          onChange={handleRegionChange}
          options={props.regionList.map(item => ({
            value: item.id,
            label: item.value,
          }))}
        />
      </Form.Item>

      {/* 角色选择 */}
      <Form.Item
        name="roleId"
        label="角色"
        rules={[{ required: true, message: '请选择角色' }]}
      >
        <Select
          showSearch
          placeholder="请选择角色"
          optionFilterProp="label"
          onChange={handleRoleChange}
          options={props.roleList.map(item => ({
            value: item.id,
            label: item.roleName,
          }))}
        />
      </Form.Item>
    </Form>
  );
});

export default UserForm;