import React from 'react';
import { Button } from "antd";
import 'axios'
import axios from 'axios';

function Home() {
    const ajax = ()=>{
        //拿取数据
        // _embed
        axios.get("http://localhost:3000/posts?_embed=comments").then(res=>{
            console.log(res.data)
        })
        // _expand
        // axios.get("http://localhost:3000/comments?_expand=post").then(res=>{
        //     console.log(res.data)
        // })
        // // 插入数据
        // axios.post("http://localhost:3000/posts",{
        //     id:1,
        //     title:"hello",
        //     author:"lizhi"
        // })
    }
    return (
        <div>
           <Button type='primary' onClick={ajax}>Button</Button>
        </div>
    );
}

export default Home;