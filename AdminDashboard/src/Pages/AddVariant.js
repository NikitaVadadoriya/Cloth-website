import React, { useEffect, useState } from 'react'
// import '../css/product.css'
import styled from "styled-components";
import axios from 'axios'
const Container = styled.div`
  width: 100vw;
  height: 70vh;
  display: flex;
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
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
  min-width: 100px;
  margin: 20px 10px 0px 0px;
  padding: 10px;
  border:1px solid grey;
`;

const Select = styled.select`
flex: 1;
min-width: 50%;
margin: 20px 10px 0px 0px;
padding: 10px;
border:1px solid grey;
`;

const Option = styled.option`
`;
const Span = styled.span`
`;
const Div = styled.div`
`;
const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-top:40px;
  float:left
`;

const AddProduct = () => {
const [product,setProduct]=useState([]);
  const [value, setValue] = useState({
    colors: "",
    sizes: "",
    pid:'',     
  })

  useEffect(() => {
    getAllProduct()
  }, [])

  const getAllProduct = async (req, res) => {
    const data = axios.get('http://localhost:4000/api/product/allproduct')
      .then((res) => {
        setProduct(res.data.data);
      })
  }

  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  }

  const handleSubmit = async(e) => {
debugger;
    e.preventDefault();
    const info = {
      color:value.colors,
      size:value.sizes,
      pid:value.pid
    }
   const data = await axios.post('http://localhost:4000/api/variant/addvariant',{color:info.color,size:info.size,pid:info.pid})
    .then((res)=>{
      alert("addedd");
    })
  }

  return (
    <>
      <Container>
        <Wrapper>
          <Title>ADD PRODUCT VARIANT</Title>
          <Form onSubmit={handleSubmit} method="post"> 
            <Div>
              <Select name="pid" style={{ width: "420px" }} onChange={handleChange}>
                {
                  Array.isArray(product) ?
                  product.map((p) => {
                    return (
                      <>
                        <Option value={p.id}>{p.product_name}</Option>
                      </>
                    )
                  }) :null
                }
              </Select>
              <br />
              <Span></Span>
            </Div>
            <Div>
              <Input placeholder="Colors" type="text" name="colors" onChange={handleChange} />
              <br />
              <Span></Span>
            </Div>
            <Div>
              <Input placeholder="Sizes" type="text" name="sizes" onChange={handleChange} />
              <br />
            </Div>
            <Button>ADD VARIANT</Button>
          </Form>
        </Wrapper>
      </Container >
    </>
  )
}

export default AddProduct