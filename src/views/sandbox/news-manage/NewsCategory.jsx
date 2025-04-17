import React, { useState, useEffect, useRef, useContext } from 'react'
import { Button, Table, Tag, Modal, Popover, Switch, Input, Form } from 'antd'
import {
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons'
import axios from 'axios'
import { data } from 'react-router-dom'
const { confirm } = Modal

function NewsCategory() {
  const [dataSource, setdataSource] = useState([])
  useEffect(() => {
    axios.get('/categories').then((res) => {
      setdataSource(res.data)
    })
  }, [])

  var __awaiter =
    (this && this.__awaiter) ||
    function (thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P
          ? value
          : new P(function (resolve) {
              resolve(value)
            })
      }
      return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value))
          } catch (e) {
            reject(e)
          }
        }
        function rejected(value) {
          try {
            step(generator['throw'](value))
          } catch (e) {
            reject(e)
          }
        }
        function step(result) {
          result.done
            ? resolve(result.value)
            : adopt(result.value).then(fulfilled, rejected)
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next())
      })
    }
  var __rest =
    (this && this.__rest) ||
    function (s, e) {
      var t = {}
      for (var p in s)
        if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
          t[p] = s[p]
      if (s != null && typeof Object.getOwnPropertySymbols === 'function')
        for (
          var i = 0, p = Object.getOwnPropertySymbols(s);
          i < p.length;
          i++
        ) {
          if (
            e.indexOf(p[i]) < 0 &&
            Object.prototype.propertyIsEnumerable.call(s, p[i])
          )
            t[p[i]] = s[p[i]]
        }
      return t
    }
  const handleSave = (record) => {
    setdataSource(
      dataSource.map((item) => {
        if (item.id === record.id) {
          return {
            id: item.id,
            title: record.title,
            value: record.value,
          }
        }
        return item
      })
    )
    axios.patch(`/categories/${record.id}`, {
      title: record.title,
      value: record.title,
    })
  }

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      render: (id) => {
        return <b>{id}</b>
      },
    },
    {
      title: '栏目名称',
      dataIndex: 'title',
      onCell: (record) => ({
        record,
        editable: true,
        dataIndex: 'title',
        title: '栏目名称',
        handleSave: handleSave,
      }),
    },
    {
      title: '操作',
      render: (record) => {
        return (
          <div>
            <Button
              danger
              type="primary"
              shape="circle"
              icon={<DeleteOutlined />}
              onClick={() => confirmMethod(record)}
            />
          </div>
        )
      },
    },
  ]

  const confirmMethod = (record) => {
    confirm({
      title: 'Do you Want to delete these items?',
      icon: <ExclamationCircleOutlined />,
      onOk() {
        deleteMethod(record)
      },
      onCancel() {
        console.log('Cancel')
      },
    })
    console.log('确认删除')
  }

  const deleteMethod = (record) => {
    setdataSource(dataSource.filter((item) => item.id !== record.id))
    //同步状态  后端
    axios.delete(`/categories/${record.id}`)
  }

  const EditableContext = React.createContext(null)

  const EditableRow = (_a) => {
    var { index } = _a,
      props = __rest(_a, ['index'])
    const [form] = Form.useForm()
    return (
      <Form form={form} component={false}>
        <EditableContext.Provider value={form}>
          <tr {...props} />
        </EditableContext.Provider>
      </Form>
    )
  }
  const EditableCell = (_a) => {
    var { title, editable, children, dataIndex, record, handleSave } = _a,
      restProps = __rest(_a, [
        'title',
        'editable',
        'children',
        'dataIndex',
        'record',
        'handleSave',
      ])
    const [editing, setEditing] = useState(false)
    const inputRef = useRef(null)
    const form = useContext(EditableContext)
    useEffect(() => {
      var _a
      if (editing) {
        ;(_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.focus()
      }
    }, [editing])
    const toggleEdit = () => {
      setEditing(!editing)
      form.setFieldsValue({ [dataIndex]: record[dataIndex] })
    }
    const save = () =>
      __awaiter(void 0, void 0, void 0, function* () {
        try {
          const values = yield form.validateFields()
          toggleEdit()
          handleSave(Object.assign(Object.assign({}, record), values))
        } catch (errInfo) {
          console.log('Save failed:', errInfo)
        }
      })
    let childNode = children
    if (editable) {
      childNode = editing ? (
        <Form.Item
          style={{ margin: 0 }}
          name={dataIndex}
          rules={[{ required: true, message: `${title} is required.` }]}
        >
          <Input ref={inputRef} onPressEnter={save} onBlur={save} />
        </Form.Item>
      ) : (
        <div
          className="editable-cell-value-wrap"
          style={{ paddingInlineEnd: 24 }}
          onClick={toggleEdit}
        >
          {children}
        </div>
      )
    }
    return <td {...restProps}>{childNode}</td>
  }
  return (
    <div>
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={{
          //一页显示几条数据
          pageSize: 5,
        }}
        rowKey={(item) => item.id}
        components={{
          body: {
            row: EditableRow,
            cell: EditableCell,
          },
        }}
      />
    </div>
  )
}

export default NewsCategory
