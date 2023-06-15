import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Announcement from '../components/Announcement'
import UserNavbar from '../components/Usernavbar'
import ClearIcon from '@mui/icons-material/Clear';
import './cart.css'
import './address.css'
import { useNavigate } from 'react-router-dom';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";


const CategoryItem = ({ item }) => {
  const [user, setUser] = useState('');
  const [category, setCategory] = useState([]);
  const [mess, setMess] = useState("");
  const navigate = useNavigate();
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/')
    }
  })

  useEffect(() => {
    getProfile();
    getAllCount()
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
        setUser(res.data.data.user.id)
      })
  }
  useEffect(() => {
    const getAllProduct = async (req, res) => {
      try {
        const data = axios.get(`http://localhost:4000/api/cart/all/${user}`)
          .then((res) => {
            setCategory(res.data.data)
          })
      } catch (error) {
        console.error(error);
      }
    }
    getAllProduct()
  }, [user])

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    category.map((product) => {
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
      const deleteData = await axios.delete(`http://localhost:4000/api/cart/${id}`).then((res) => {
      })
      console.log(deleteData);
      setMess(deleteData)
    }
  };

  const getAllCount = async (req, res) => {
    const data = await axios.get(`http://localhost:4000/api/cart/getallcount`)
    .then((res)=>{
      setCount(res.data.data)
    })
  }

  const deleteCartData=async(user)=>{
  const data =await axios.delete(`http://localhost:4000/api/cart/delete/${user}`)
  .then((res)=>{
    console.log('delete')

  })
  }

  const totalPrice = calculateTotalPrice();
  return (
    <>
      <Announcement />
      <UserNavbar />
      <div className="carts-container" style={{ width: '600px', marginLeft: '40px' }}>
        {
          category.map((cat) => {
            return (
              <section id="carts" key={cat.id}>
                <article className="products">
                  <header>
                    <img src={`http://localhost:4000/` + cat.product.subcategory.image} alt="Gamming Mouse" style={{ height: '200px' }} />
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
      {/* this is Billing address form  */}
      <div className="Yorder" style={{marginLeft:"750px",marginTop:'-500px',width:"400px"}}>
    <table>
      <tr>
        <th colspan="2"><h2 style={{marginTop:"-20px"}}>Your order</h2></th>
      </tr>
      <hr/>
      <tr>
        <td>Totle Product x 2(Qty)</td>
        <td>{count.count}</td>
      </tr>
      <tr>
        <td>Subtotal</td>
        <td>{totalPrice}</td>
      </tr>
      <tr>
        <td>Shipping</td>
        <td>Free shipping</td>
      </tr>
    </table><br/>
    <div>
      <input type="radio" name="dbt" value="dbt" checked/> Direct Bank Transfer
    </div>
    <p>
        Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.
    </p>
    <div>
      <input type="radio" name="dbt" value="cd"/> Cash on Delivery
    </div>
    <div>
      <input type="radio" name="dbt" value="cd"/> Paypal <span>
      <img src="https://www.logolynx.com/images/logolynx/c3/c36093ca9fb6c250f74d319550acac4d.jpeg" alt="" width="50"/>
      </span>
    </div>


    <PayPalScriptProvider
        options={{ "client-id": "Aa0biPSnfq6RqbkZdv-v0u8kTRBUd2CMb6ZwZKi8NSqsW5KsbQkMwgKKBzr87Y3q9qDfCbnNb3f7g1nk" }}
      >
        <PayPalButtons
          createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: totalPrice,
                  },
                },
              ], 
            });
          }}
          onClick={()=>deleteCartData(user)}
          onApprove={async (data, actions) => {
            const details = await actions.order.capture();
            const name = details.payer.name.given_name;
            navigate('/success')
          }}
        />
      </PayPalScriptProvider>
  </div>
    </>
  );
};

export default CategoryItem;