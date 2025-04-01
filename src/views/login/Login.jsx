import React, { useCallback } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Flex, message } from 'antd';
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import './Login.css';
import axios from 'axios'
import { Navigate, useNavigate } from 'react-router-dom';

const onFinish = (values,navigate) => {
    //都查到了才证明输入的是正确的
    console.log(values);
    axios.get(`http://localhost:3000/users?username=${values.username}&password=${values.password}&roleState=true&_expand`).then
    (res=>{
        console.log(res.data);
        if(res.data.length === 0) {
            message.error("用户名或密码错误！");
        } else {
            localStorage.setItem("token", JSON.stringify(res.data[0]));
            Navigate("/");
        }
    })
};

const ParticlesBackground = () => {
    const particlesInit = useCallback(async (engine) => {
        await loadSlim(engine);
    }, []);

    return (
        <Particles
            id="tsparticles"
            init={particlesInit}
            options={{
                background: { color: "#ffffff" },
                particles: {
                    number: { value: 100 },
                    size: { value: 3 },
                    move: { enable: true, speed: 2 },
                    color: { value: "#1890ff" },
                    shape: { type: "circle" },
                    opacity: { value: 0.5 },
                },
                interactivity: {
                    events: {
                        onHover: {
                            enable: true,
                            mode: "repulse",
                        },
                    },
                },
            }}
        />
    );
};

function Login() {
    const navigate = useNavigate();
    return (
        <div style={{
            position: "relative",
            height: "100vh",
        }}>
            <ParticlesBackground />
            <div className='formContainer' style={{ position: "relative", zIndex: 1 }}>
                <div className='logintitle'>全球新闻发布管理</div>
                <Form
                    name="login"
                    initialValues={{ remember: true }}
                    style={{ maxWidth: 360 }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: '请输入用户名！' }]}
                    >
                        <Input prefix={<UserOutlined />} placeholder="用户名" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: '请输入密码！' }]}
                    >
                        <Input prefix={<LockOutlined />} type="password" placeholder="密码" />
                    </Form.Item>
                    <Form.Item>
                        <Flex justify="space-between" align="center">
                            <Form.Item name="remember" valuePropName="checked" noStyle>
                                <Checkbox>记住我</Checkbox>
                            </Form.Item>
                            <a href="#">忘记密码？</a>
                        </Flex>
                    </Form.Item>
                    <Form.Item>
                        <Button block type="primary" htmlType="submit">
                            登录
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
}

export default Login;