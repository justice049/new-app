import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useEffect,
} from 'react'
import { Form, Input, Select } from 'antd'

const UserForm = forwardRef((props, ref) => {
  const [form] = Form.useForm()
  const internalForm = props.form || form // 使用外部传递的 form 实例
  const [isDisabled, setIsDisabled] = useState(false)

  // useEffect(() => {
  //   if (props.form) {
  //     props.form.setFieldValue(props.initialValues)
  //   }
  //   // setIsDisabled(props.isUpdateDisabled);
  // }, [props.isUpdateDisabled, props.form]) // 修复 useEffect 的语法

  useEffect(() => {
    if (props.form && props.initialValues) {
      props.form.setFieldsValue(props.initialValues);
    }
    setIsDisabled(props.isUpdateDisabled);
  }, [props.isUpdateDisabled, props.form, props.initialValues]); // 确保依赖项正确

  useImperativeHandle(ref, () => ({
    validateFields: () => internalForm.validateFields(),
    resetFields: () => internalForm.resetFields(),
    setFieldsValue: (values) => internalForm.setFieldsValue(values),
  }))

  // const handleRoleChange = (value) => {
  //   if (value === 1) {
  //     setIsDisabled(true);
  //     form.setFieldsValue({ region: "" });
  //   } else {
  //     setIsDisabled(false);
  //   }
  // };
  // UserForm 组件中的角色切换逻辑
  const handleRoleChange = (value) => {
    const isSuperAdmin = value === 1 // 假设角色ID=1是超级管理员
    setIsDisabled(isSuperAdmin)
    if (isSuperAdmin) {
      internalForm.setFieldsValue({ region: '' }) // 清空区域选择
    }
  }

  const handleRegionChange = (value) => {
    console.log('区域选择:', value)
  }

  return (
    <Form form={internalForm} layout="vertical">
      <Form.Item
        name="username"
        label="用户名"
        rules={[{ required: true, message: '请输入用户名' }]}
      >
        <Input placeholder="请输入用户名" />
      </Form.Item>
      {/* 
      <Form.Item
        name="password"
        label="密码"
        rules={[{ required: true, message: '请输入密码' }]}
      >
        <Input.Password placeholder="请输入密码" />
      </Form.Item> */}

      <Form.Item
        name="password"
        label="密码"
        rules={[{ required: true, message: '请输入密码' }]}
      >
        <Input.Password placeholder="请输入密码" />
      </Form.Item>
      <Form.Item
        name="region"
        label="区域"
        rules={isDisabled ? [] : [{ required: true, message: '请选择区域' }]}
      >
        <Select
          disabled={isDisabled}
          showSearch
          placeholder="请选择区域"
          optionFilterProp="label"
          onChange={handleRegionChange}
          options={props.regionList.map((item) => ({
            value: item.id,
            label: item.value,
          }))}
        />
      </Form.Item>

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
          options={props.roleList.map((item) => ({
            value: item.id,
            label: item.roleName,
          }))}
        />
      </Form.Item>
    </Form>
  )
})

export default UserForm
