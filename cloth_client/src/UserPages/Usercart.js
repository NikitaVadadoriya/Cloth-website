import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Announcement from '../components/Announcement'
import UserNavbar from '../components/Usernavbar'
import ClearIcon from '@mui/icons-material/Clear';
import './cart.css'
import { useNavigate } from 'react-router-dom';

const CategoryItem = ({ item }) => {
  const [user, setUser] = useState('');
  const [category, setCategory] = useState([]);
  const [mess, setMess] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/')
    }
  })

  useEffect(() => {
    getProfile();
  },[])
  
  const getProfile = async () => {
    const data = axios.get(`http://localhost:4000/api/user/profile`,
      {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': ' Bearer ' + localStorage.getItem("token")
        }
      }).then((res) => {
        setUser(res.data.data.user.id)
         console.log(res.data.data.user.id)
      })
  }
  useEffect(()=>{
    const getAllProduct = async (req, res) => {
      try {
        const data = axios.get(`http://localhost:4000/api/cart/all/${user}`)
          .then((res) => {
            setCategory(res.data.data)
            //console.log(res.data.data)
          })
      } catch (error) {
        console.error(error);
      }
    }
    getAllProduct()
  },[user])
  

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    category.map((product) => {
      //   const { price, quantity } = product;
      totalPrice += product.product.totle_price * product.quantity;
    });
    return totalPrice;
  };

  const handleIncrement = (id) => {
    const updatedCartItems = category.map((item) =>
      item.id === id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
    setCategory(updatedCartItems);
   fetch(`http://localhost:4000/api/cart/${id}/increment`, { method: 'PUT' });
  };

  const handleDecrement = (id) => {
    const updatedCartItems = category.map((item) =>
      item.id === id
        ? { ...item, quantity: Math.max(item.quantity - 1, 0) }
        : item
    );
    setCategory(updatedCartItems);
     fetch(`http://localhost:4000/api/cart/${id}/decrement`, { method: 'PUT' });
  };

  const handleDelete = async (id) => {
    console.log(id);
    const answer = window.confirm('are you sure delete task')
    if (answer == false) { } else {
      const deleteData = await axios.delete(`http://localhost:4000/api/cart/${id}`)
      .then((res) => {
        // getAllProduct( );
      })
      console.log(deleteData);
      setMess(deleteData)
    }
  };
  const handleCheckout = async () => {
    navigate(`/address/${user}`);
  };
  const totalPrice = calculateTotalPrice();
  return (
    <>
      <Announcement />
      <UserNavbar />
      <div className="carts-container">
        {
          category.map((cat) => {
            // const totle = <p>₹{cat.product.totle_price * cat.quantity}</p>
            return (
              <section id="carts" key={cat.id}>
                <article className="products">
                  <header>
                    <a className="remove">
                      <img src={`http://localhost:4000/` + cat.product.subcategory.image} alt="Gamming Mouse" />
                      <h3>{cat.product.product_name}</h3>
                    </a>
                  </header>
                  <div className="contents">
                    <h1>{cat.product.product_name}</h1>
                    {cat.product.description}
                    <div title="You have selected this product to be shipped in the color yellow." style={{ top: "0" }} className="color yellow">
                      <button onClick={() => handleDelete(cat.id)}><ClearIcon color='error' /></button>
                    </div>
                  </div>
                  <footer className="contents">
                    <button className="qt-minus" onClick={() => handleDecrement(cat.id)}>-</button>
                    <span className="qt">{cat.quantity}</span>
                    <button className="qt-plus" onClick={() => handleIncrement(cat.id)} >+</button>
                    <h2 className="full-price"> {cat.product.totle_price * cat.quantity} </h2>
                    <h2 className="price" style={{ fontSize: '25px' }}>
                      ₹{cat.product.totle_price}
                    </h2>
                  </footer>
                </article>
              </section>
            )
          })
        }
      </div>
      <footer id="site-footer">
        <div className="container1 clearfix">
          <div className="right"><br /><br />

            <h1 className="total" style={{ color: "black" }}><span>Total: </span>₹{totalPrice}</h1>
            <button className="btn" style={{ color: "white" }} onClick={handleCheckout}>Checkout</button>
          </div>
        </div>
      </footer>
    </>
  );
};

export default CategoryItem;