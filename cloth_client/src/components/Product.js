// import React, { useEffect, useState } from 'react'
// import styled from "styled-components";
// import { Link } from "react-router-dom";
// import axios from 

// const Card =()=> {
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     getAllProduct();
//   }, []);

//   const getAllProduct = async (req, res) => {
//     const data = axios.get('http://localhost:4000/api/product/productcategory')
//       .then((res) => {
//         setProducts(res.data.data)
//         //console.log(res.data.data)
//       })
//   }


//   return (
//     <Container>
//       {
//         products.map((p) => {
//           <>
//         <Image>
//         <img src={`http://localhost:4000/`+p.image} alt="" />
//       </Image>
//       <Description>
//         <h5>{p.subcategory_name}</h5>
//         <p>₹ {p.products.totle_price}</p>

//         <button>Add to Cart</button>
//       </Description>
//       </>
//         })}

//     </Container>
//   );
// }

// const Container = styled.div`
//   width: 100%;
//   height: 100%;

//   display: flex;
//   flex-direction: column;
//   background-color: #fff;
//   z-index: 10;
// `;
// const Image = styled.div`
//   width: 100%;

//   display: flex;
//   flex-direction: column;

//   justify-content: center;
//   align-items: center;
//   margin-top: 20px;
//   flex: 0.3;
//   img {
//     width: 180px;
//     height: 200px;
//   }
// `;
// const Description = styled.div`
//   width: 90%;
//   margin: auto;
//   display: flex;
//   flex-direction: column;
//   justify-content: space-evenly;
//   flex: 0.7;

//   h5 {
//     font-size: 16px;
//     font-weight: 600;
//   }

//   p {
//     font-weight: 600;
//   }

//   button {
//     width: 100%;
//     height: 33px;
//     background-color: #fa8900;
//     border: none;
//     border-radius: 10px;
//     cursor: pointer;
//   }
// `;
// export default Card;
