import React, { useEffect, useState } from 'react'
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { add } from '../store/cartSlice'
import { useDispatch } from 'react-redux'

const Home = () => {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/home')
    }
  })
  useEffect(() => {
    getAllProduct();
  }, []);

  const getAllProduct = async (req, res) => {
    const data = axios.get('http://localhost:4000/api/product/women')
      .then((res) => {
        setProducts(res.data.data)
        //console.log(res.data.data)
      })
  }

  // add to cart code
  const addToCart = (curEle) => {
    const info = {
      quantity: 1
    }
    const newItem = { ...curEle, ...info };
    dispatch(add(newItem))
    setCartItems((prevItems) => {
      const updatedItems = [...prevItems, newItem];
      // cartItems.push(curEle);
      localStorage.setItem('cartData', JSON.stringify(updatedItems));
      return updatedItems;
    });
  };

  const removeFromCart = (itemId) => {
    setCartItems((prevItems) => {
      const updatedItems = prevItems.filter((item) => item.id !== itemId);
      localStorage.setItem('cartData', JSON.stringify(updatedItems));
      return updatedItems;
    });
  };

  return (

    <div>

      <Announcement />
      <Navbar />
      <br /> <br /> <br /> <br />
      <section className='main-card--product-cointainer'>
        {products.map((curEle) => {
          return (
            <>
              <div className='card-container' key={curEle.id}>
                <div className='card'>
                  <div className="card-body">
                    {/* <span className='card-number card-circle subtle'>{curEle.id}</span><br />
                      <span className='card-title'> {curEle.subcategory.subcategory_name}</span>  <br/><br/> */}
                    <Link to={`/viewmore/${curEle.id}`}>
                      <img src={`http://localhost:4000/` + curEle.subcategory.image} alt="image" className='card-media' /><br />
                    </Link>
                    <span className='card-title'> {curEle.subcategory.subcategory_name}</span>  <br />
                    <span className='card-description '>
                      {curEle.description}
                    </span><br />
                    <button className='card-tag subtle' onClick={(e) => addToCart(curEle, 1)}><AddShoppingCartIcon />Add To cart</button>
                    <span className='price'>
                      ₹{curEle.totle_price}
                    </span>
                    {/* <button onClick={clearCart}>Clear Cart</button> */}
                  </div>
                </div>
              </div >
            </>
          );
        })
        }
      </section>
      <br />
      <br />
      <br />
      <Footer />
    </div>


  );
};

export default Home;