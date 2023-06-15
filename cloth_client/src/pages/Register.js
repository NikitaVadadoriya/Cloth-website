import styled from "styled-components";
import { mobile } from "../responsive";
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react";
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;

`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
  
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;

const Register = () => {
  const [username,setUsername]=useState('')
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [image,setImage]=useState('')
  const [roleType,setRoleType]=useState(0)
  
const Navigate =useNavigate()

  const handleSubmit =(e)=>{
    e.preventDefault();
   const formdata= new FormData();
   formdata.append("username",username);
   formdata.append("email",email);
   formdata.append("password",password);
   formdata.append("image",image);
   formdata.append("roleType",roleType)
    const data = axios.post(`http://localhost:4000/api/user/register`,formdata)
    .then(async (res) => {
      await localStorage.setItem("token", res.data.token);
      })
      Navigate('/home')
  }
  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form onSubmit={handleSubmit} method="post" encType='multipart/form-data'>
          <Input placeholder="username"  name="username" onChange={(e)=>setUsername(e.target.value)} />
          <Input placeholder="email" type="email" name="email" onChange={(e)=>setEmail(e.target.value)}  />
          <Input placeholder="password" type="password"  name="password"  onChange={(e)=>setPassword(e.target.value)} />
          <Input type="file" name="image" onChange={(e)=>setImage(e.target.files[0])}  />
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          
          <Button>CREATE</Button>
          <br/><br/>
           <p style={{marginLeft:"10px"}}>Already Account Plaese Click <Link to="/login">Sign In</Link></p> 
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;