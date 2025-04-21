import React from 'react';
import { Button,Table} from 'antd';

function NewsPublish(props) {
    //父组件传属性
    const columns = [
        {
          title: '新闻标题',
          dataIndex: 'title',
          render:(title,item)=>{
            return <a href={`#/news-manage/preview/${item.id}`}>{title}</a>
          }
        },
        {
          title: '作者',
          dataIndex: 'author',
        },
        {
          title: '新闻分类',
          dataIndex: 'category',
          render:(category)=>{
            return  <div>{category.title}</div>
          }
        },
        {
          title: '操作',
          render:(record)=>{
            return <div>
               <Button/>
            </div>
          }
        },
      ];

    return (
        <div>
            <Table dataSource={props.dataSource} columns={columns} pagination={{
              //一页显示几条数据
              pageSize:5
            }}
            rowKey={item=>item.id}
            />
        </div>
    );
}

export default NewsPublish;