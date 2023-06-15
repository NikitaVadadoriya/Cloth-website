import { useEffect, useState } from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'
import Cart from './Cart'
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://burst.shopifycdn.com/photos/minimalist-retail-clothing-display.jpg?width=1200&format=pjpg&exif=1&iptc=1")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
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
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  &:disabled {
    color: green;
    cursor: not-allowed;
  }
`;
const Error = styled.span`
  color: red;
`;

const Login = () => {
  const [userId, setUserId] = useState('');
  const [formValue, setFormValue] = useState({
    email: "",
    password: ""
  })
  const [error, setError] = useState("");
  const [perror, setPerror] = useState("");

  const Navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem('token')) {
      Navigate('/home')
    }
  })
  const handleChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value })
    if (e.target.name == 'email') {
      const checkEmail = /^\S+@\S+\.\S+$/
      if (!checkEmail.test(formValue.email)) {
        setError('email is not valid')
      }
      else {
        setError('')
      }
      if (!e.target.value) {
        setError('email is required')
      }
    }
    if (e.target.name == 'password') {
      const checkPass = /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,}$/;
      if (!checkPass.test(formValue.password)) {
        setPerror('password is not valid')
      }
      else {
        setPerror('')
      }
      if (!e.target.value) {
        setPerror('password is required')
      }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await axios.post(`http://localhost:4000/api/user/login`, formValue)
      .then(async (res) => {
        await localStorage.setItem("token", res.data.data.token);
        const cartData = JSON.parse(localStorage.getItem("cartData"));
        if (cartData && cartData.length > 0) {
          await axios.post('http://localhost:4000/api/cart/addtocart',
            { data: JSON.stringify(cartData), user_id: res.data.data.user.id })
            .then((response) => {
              console.log('Data saved to backend:', response.data);
            })
            .catch((error) => {
              toast.error("Something are wrong..", {
                position: toast.POSITION.BOTTOM_RIGHT,
              })
            });
        }
        Navigate('/home')
      })
  };

  return (
    <Container>
      <Wrapper>
        <Title>SIGN IN</Title>
        <Form onSubmit={handleSubmit}>
          <Input
            placeholder="email"
            type="email"
            name="email"
            onChange={handleChange}
          />
          <div style={{ color: "red" }}>{error}</div>
          <Input
            placeholder="password"
            type="password"
            name="password"
            onChange={handleChange}
          />
          <div style={{ color: "red" }}>{perror}</div><br />
          <Button >
            LOGIN
          </Button>
          <ToastContainer />
          {userId && <Cart userId={userId} />}
          <Link to="/forgotPassword" style={{ textDecoration: 'none' }}>Forgot Password</Link>
          <Link to="/register" style={{ marginLeft: 170 }}>  Create A New Account</Link>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;