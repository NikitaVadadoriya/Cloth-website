import { useParams } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
// import '../css/product.css'
import styled from "styled-components";
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  width: 100vw;
  height: 70vh;
  display: flex;

`;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
  margin-left:300px;
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


const ProductEdit = () => {
    const { id } = useParams();
    const [product_name, setProduct_name] = useState("");
    const [totle_price, setTotle_price] = useState("");
    const [description, setDescription] = useState("");
    const [subcategory_id, setSubcategory_id] = useState("");
    const [image, setImage] = useState(null);
    const [name, setName] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
        getAllSubcategory();
    }, [])
    useEffect(() => {
        const getProduct = async () => {
            const { data } = await axios.get(`http://localhost:4000/api/product/singleproduct/${id}`);
            console.log(data);
            setProduct_name(data.data.product_name);
            // setImage(data.data.image);
            setTotle_price(data.data.totle_price);
            setDescription(data.data.description);
            setSubcategory_id(data.data.subcategory_id);
        }
        getProduct();
    }, [id]);

    const handlesubmit = async (e) => {
        e.preventDefault();
       const info ={
        product_name:product_name,
        description:description,
        totle_price:totle_price,
        subcategory_id:subcategory_id
       }
        const data = await axios.put(`http://localhost:4000/api/product/updateproduct/${id}`,info)
        console.log("data", data);
        navigate('/products')
    }

    const getAllSubcategory = async (req, res) => {
        const data = axios.get('http://localhost:4000/api/subcategory/getall')
            .then((res) => {
                setName(res.data.data);
            })
    }

    return (
        <>
            <Container>
                <Wrapper>
                    <Title>UPDATE PRODUCT</Title>
                    <Form method="post" encType='multipart/form-data'>
                        <Div>
                            <Input type="text" name="product_name" value={product_name} onChange={(e) => setProduct_name(e.target.value)} />
                            <br />
                            <Span></Span>
                        </Div>
                        <Div>
                            <Input type="text" name="totle_price" value={totle_price} onChange={(e) => setTotle_price(e.target.value)} />
                            <br />
                            <Span></Span>
                        </Div>
                        <Div>
                            <textarea rows={4} cols={47} name="description" style={{ marginTop: "20px", border: "1px solid grey", paddingTop: "15px", paddingLeft: '10px' }}
                                value={description} onChange={(e) => setDescription(e.target.value)} />
                            <br />
                            <Span></Span>
                        </Div>
                        <Div>
                            <Select style={{ width: "420px" }}
                                value={subcategory_id} onChange={(e) => setSubcategory_id(e.target.value)}>
                                {
                                    Array.isArray(name) ?
                                        name.map((subcat) => {
                                            return (
                                                <>
                                                    <Option value={subcat.id}>{subcat.subcategory_name}</Option>
                                                </>
                                            )
                                        }) : null
                                }
                            </Select>
                            <br />
                            <Span></Span>
                        </Div>
                        <Button  type="submit" onClick={handlesubmit}>UPDATE PRODUCT</Button>
                    </Form>
                </Wrapper>
            </Container>
        </>
    )
}

export default ProductEdit