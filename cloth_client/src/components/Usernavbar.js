import { Badge, Select } from "@mui/material";
import { Search, ShoppingCartOutlined } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { Link } from "react-router-dom";
import axios from 'axios'
import Logo from '../pages/niki.PNG'
import LogoutIcon from '@mui/icons-material/Logout';

const Container = styled.div`
height: 80px;
  ${mobile({ height: "50px" })}
`;
const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })}
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;

const Input = styled.input`
  border: none;
  ${mobile({ width: "50px" })}
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const Navbar = () => {
  const [user, setUser] = useState('');
  const [count, setCount] = useState(0);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    getAllCount()
  }, [])

  const getAllCount = async (req, res) => {
    const data = await axios.get(`http://localhost:4000/api/cart/getallcount`)
      .then((res) => {
        setCount(res.data.data)
      })
  }

  useEffect(() => {
    getProfile()
  }, [])
  const getProfile = async () => {
    const data = axios.get(`http://localhost:4000/api/user/profile`,
      {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': ' Bearer ' + localStorage.getItem("token")
        }
      }).then((res) => {
        setUser(res.data.data.user)
      })
  }
  return (
    <Container>
      <Wrapper>
        <Left>
          <Link to="/home"><img src={Logo} width='250px' height='90px' style={{ marginTop: "-5px" }} /></Link>
        </Left>
        {/* // <Center> */}
        <MenuItem><Link to='/userwomen' className="main-link" >WOMEN</Link></MenuItem>
        <MenuItem><Link to='/usermen'  className="main-link" >MEN</Link></MenuItem>
        <MenuItem><Link to='/userchild'  className="main-link" >CHILDREN</Link></MenuItem>
        <Right>
          <h2>{user.username} </h2> &nbsp;&nbsp;&nbsp;
                <Link to='/' style={{ textDecorationLine: "none", color: "black", }}><LogoutIcon 
                onClick={() => {
                localStorage.removeItem('token')}}
                 
            /></Link>
          <MenuItem>

            <Link to='/usercart'>
              <Badge color="primary" badgeContent={count.count}  >
                <ShoppingCartOutlined size="large" color="primary" />
              </Badge>
            </Link>
          </MenuItem>
          {/* </Link> */}
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;