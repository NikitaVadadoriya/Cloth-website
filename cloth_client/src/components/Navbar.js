import { Badge } from "@mui/material";
import { Search, ShoppingCartOutlined } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { Link } from "react-router-dom";
import Logo from '../pages/niki.PNG'
import { useSelector } from "react-redux";
import '../extra.css'

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

  const cart = useSelector((state) => state.cart);
  const [count, setCount] = useState(0);
  useEffect(() => {
    getAllCount()
  }, [])

  const getAllCount = async (req, res) => {
    const storedData = localStorage.getItem("cartData");
    const parsedData = JSON.parse(storedData);
    //console.log(parsedData)
    const count = parsedData ? parsedData.length : 0;
    setCount(count)
  }

  return (
    <Container>
      <Wrapper>
        <Left>
          <Link to="/"><img src={Logo} width='250px' height='90px' style={{ marginTop: "-5 px" }} /></Link>
        </Left>
        <MenuItem><Link to='/women' className="main-link" >WOMEN</Link></MenuItem>
        <MenuItem><Link to='/men'  className="main-link" >MEN</Link></MenuItem>
        <MenuItem><Link to='/child'  className="main-link" >CHILDREN</Link></MenuItem>
        <Right>
          <MenuItem><Link to='/login' style={{ textDecoration: 'none', color: "teal", fontSize: 17 }}>SIGN IN</Link></MenuItem>
          <Link >
            <MenuItem>
              <Link to='/cart'>
                <Badge color="primary" badgeContent={cart.length} >
                  <ShoppingCartOutlined fontSize="large" color="primary" />
                </Badge>
              </Link>
            </MenuItem>
          </Link>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;