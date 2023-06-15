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
  const [subcategory_name, setSubcategoryName] = useState([]);
  const [category, setCategory] = useState([]);
const [name,setName]=useState("");
const [image,setImage]=useState("");
const [category_id,setCategoryId]=useState("");

  const [product, setProduct] = useState({
    product_name: "",
    totle_price: "",
    description: "",     
    subcategory_id: ""
  })

  useEffect(() => {
    getAllSubcategory();
    getAllCategory()
  }, [])

  const getAllSubcategory = async (req, res) => {
    const data = axios.get('http://localhost:4000/api/subcategory/getall')
      .then((res) => {
        setName(res.data.data);
      })
  }

  const getAllCategory = async (req, res) => {
    const data = axios.get('http://localhost:4000/api/category/getallcategory')
      .then((res) => {
        setCategory(res.data);
      })
  }

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    const info={
      product_name:product.product_name,
      totle_price:product.totle_price,
      description:product.description,
      subcategory_id:product.subcategory_id
    }
   const data = await axios.post('http://localhost:4000/api/product/addproduct',info)
    .then((res)=>{
      alert("addedd");
    })
  }

  const addSubcategory = async(e) => {
    e.preventDefault();
    const formdata= new FormData();
   formdata.append("subcategory_name",subcategory_name);
   formdata.append("category_id",category_id);
   formdata.append("image",image);
   const data = await axios.post('http://localhost:4000/api/subcategory/addsubcategory',formdata)
    .then((res)=>{
      alert("addedd subcategory");
    })
  }

  return (
    <>
      <Container>
        <Wrapper>
          <Title>ADD TO PRODUCT</Title>
          <Form onSubmit={handleSubmit} method="post" encType='multipart/form-data'>
            <Div>
              <Input placeholder="Product Name" type="text" name="product_name" onChange={handleChange} />
              <br />
              <Span></Span>
            </Div>
            <Div>
              <Input placeholder="Price" type="text" name="totle_price" onChange={handleChange} />
              <br />
              <Span></Span>
            </Div>
            <Div>
              <textarea placeholder="Description" rows={4} cols={47} name="description" style={{ marginTop: "20px", border: "1px solid grey", paddingTop: "15px", paddingLeft: '10px' }} onChange={handleChange} />
              <br />
              <Span></Span>
            </Div>
            <Div>
              <Select name="subcategory_id" style={{ width: "420px" }} onChange={handleChange}>
                {
                  Array.isArray(name) ?
                  name.map((subcat) => {
                    return (
                      <>
                        <Option value={subcat.id}>{subcat.subcategory_name}</Option>
                      </>
                    )
                  }) :null
                }
              </Select>
              <br />
              <Span></Span>
            </Div>
            <Button>ADD PRODUCT</Button>
          </Form>
        </Wrapper>

        <Wrapper>
          <Title>ADD SUBCATEGORY</Title>
          <Form onSubmit={addSubcategory} method="post" encType='multipart/form-data'>
            <Div>
              <Input placeholder="Subcategory Name" type="text" name="subcategory_name" onChange={(e)=>setSubcategoryName(e.target.value)} style={{ width: "420px" }} />
              <br />
              <Span></Span>
            </Div>
            <Div>
              <Input type="file" name="image" style={{ width: "420px" }}  onChange={(e)=>setImage(e.target.files[0])} />
              <br />
              <Span></Span>
            </Div>
            <Div>
              <Select name="category_id" style={{ width: "420px" }} onChange={(e)=>setCategoryId(e.target.value)}>
                {
                  category.map((cat) => {
                    return (
                      <>
                        <Option value={cat.id}>{cat.category_name}</Option>
                      </>
                    )
                  })
                }
              </Select>
              <br />
              <Span></Span>
            </Div>
            <Button>ADD SUBCATEGORY</Button>
          </Form>
        </Wrapper>
      </Container >
    </>
  )
}

export default AddProduct