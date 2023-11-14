import React from 'react';
import { Button, Checkbox, Form, Input, message } from 'antd';
import axios from 'axios';
const onFinish = (values) => {
  
  const body = {
    email: values.email,
    password: values.password,
    returnSecureToken: true
}
axios.post("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA50mQ29ONmPn5XHuhE_T6_YTr5HLTUSF8", body).then((res)=>{ 
  console.log("res: ", res);
    if(res.data.registered === true){ 
        const expIn =  res.data.expiresIn;
        const expireDate = new Date(new Date().getTime() + parseInt(expIn) * 1000); 
        localStorage.setItem("idToken",  res.data.idToken)
        localStorage.setItem("localId",  res.data.localId) 
        localStorage.setItem("expireDate", expireDate)
        localStorage.setItem("refreshToken",  res.data.refreshToken) 
        refreshToken(expIn * 1000)
        document.location.replace("/");
    }else{ 
        message.error(res.data.error.message)
    }
}).catch((err)=>{
  console.log("err; ", err);
    if(err.response.data.error.message === "EMAIL_NOT_FOUND"){
        message.error("Имэйл олдсонгүй!")
    }else if(err.response.data.error.message === "INVALID_PASSWORD"){
      message.error("Нууц үг буруу байна!")
    }else if(err.response.data.error.message === "INVALID_LOGIN_CREDENTIALS"){
      message.error("Имэйл олдсонгүй!");
    }
}) 
}; 
 
const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

const refreshToken = async(expIn) =>{ 
  await setTimeout(()=>{  
      localStorage.removeItem("localId");
      localStorage.removeItem("idToken");
      localStorage.removeItem("expiresIn");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("expireDate");
      document.location.replace("/");
      // history.push("/");
  },expIn)
}
const Login = () => (
  <div style={{display: "flex", alignItems:"center", justifyContent: "center", height: "100vh", width: "full"}}>
    <div style={{width: "38%"}}>
    <Form 
    name="basic"
    labelCol={{
      span: 8,
    }}
    wrapperCol={{
      span: 16,
    }}
   
    initialValues={{
      remember: true,
    }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
    <Form.Item
      label="Хэрэглэгчийн Емайл"
      name="email"
      rules={[
        {
          required: true,
          message: 'Емайл нэр ээ оруулна уу!',
        },
      ]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Нууц үг"
      name="password"
      rules={[
        {
          required: true,
          message: 'Нүүц үгээ оруулна уу!',
        },
      ]}
    >
      <Input.Password />
    </Form.Item>

    <Form.Item
      name="remember"
      valuePropName="checked"
      wrapperCol={{
        offset: 8,
        span: 16,
      }}
    >
      <Checkbox>Намайг санах</Checkbox>
    </Form.Item>

    <Form.Item
      wrapperCol={{
        offset: 8,
        span: 16,
      }}
    >
      <Button type="primary" htmlType="submit">
        Нэвтрэх
      </Button>
    </Form.Item>
  </Form>
    </div>

  </div>
);
export default Login;