import styled from "styled-components";
import { categories } from "../data";
import { mobile } from "../responsive";
import CategoryItem from "../pages/Cart";
import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import axios from 'axios';

const Container = styled.div`
padding: 0px;
display: flex;
margin-top:-100px;
flex-wrap: flex;
justify-content: space-between;
z-index: 3;
  ${mobile({ padding: "0px", flexDirection: "column" })}
  
`;
const Image = styled.img`
  width: 380px;
  height: 500px;
  object-fit: cover;
  justify-content: space-between;
  ${mobile({ height: "20vh" })}

`;

const Title = styled.h1`
    color:white;
    font-size:40px;
    margin-top: -300px;
    margin-left:200px;
    text-decoration:white
`;

const Button = styled.button`
    border:none;
    padding: 10px;
    background-color: teal;
    color:white;
    width:150px;
    cursor: pointer;
    font-weight: 700;
    margin-left:200px
`;

const Categories = () => {
  const [category, setCategory] = useState([]);

  useEffect(() => {
    getAllProduct();
  }, []);

  const getAllProduct = async (req, res) => {
    const data = axios.get('http://localhost:4000/api/category/getallcategory')
      .then((res) => {
        setCategory(res.data)
      })
  }
  return (
    <Container>
      {
        Array.isArray(category)
          ? category.map((category) => (
            <Link to={`${category.category_name}`}>
              <Image src={'http://localhost:4000/' + category.image} alt='cat' />
              {/* <Title>{category.category_name}</Title>
              <Button>SHOP NOW</Button> */}
            </Link>
          )) : null}
    </Container>
  );
};

export default Categories;