import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Announcement from '../components/Announcement'
import UserNavbar from '../components/Usernavbar'
import ClearIcon from '@mui/icons-material/Clear';
import './cart.css'
import './address.css'
import { useNavigate } from 'react-router-dom';

const CategoryItem = ({ item }) => {
  const [user, setUser] = useState('');
  const [category, setCategory] = useState([]);
  const [mess, setMess] = useState("");
  const navigate = useNavigate();
  const [order,setOrder]=useState("");
  const [address, setAddress] = useState({
    user_id: "",
    address: "",
    city: "",
    country: "",
    postcode: "",
    street: "",
    state: ""
  })
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/')
    }
  })

  useEffect(() => {
    getProfile();
  }, [])

  const handleChange = async (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value })
  }

  const addAddress = async (e, req, res) => {
    e.preventDefault();

    const info = {
      user_id: user,
      address: address.address,
      city: address.city,
      country: "India",
      postcode: address.postcode,
      street: address.street,
      state: address.state
    }
    const data = axios.post(`http://localhost:4000/api/add/addaddress`, info)
      .then((res) => {
        console.log('added')
        console.log(res.data.data);

        //add the order
        const order = {
          user_id: user,
          address_id: res.data.data.id,
          totle: totalPrice,
          status: "panding"
        }
        const data=axios.post('http://localhost:4000/api/order/addorder', order)
          .then((res) => {
            setOrder(res.data.data.id)
            console.log(res.data.data.id)
            console.log("order successfully...")
            navigate(`/order/${res.data.data.id}`)
            //delete cart data   
          })
      })
  }

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
      <div style={{ marginLeft: '750px', marginTop: '-450px', width: "480px" }}>
        <div class="containeradd">
          <div class="title1">
            <h2>Product Order Form</h2>
          </div>
          <div class="d-flex1">
            <form onSubmit={addAddress}>
              <label>
                <span class="fname">Address <span class="required">*</span></span>
                <input type="text" name="address" onChange={handleChange} />
              </label>
              <label>
                <span class="lname">Street <span class="required">*</span></span>
                <input type="text" name="street" onChange={handleChange} />
              </label>
              <label>
                <span>City</span>
                <input type="text" name="city" onChange={handleChange} />
              </label>
              <label>
                <span>State  <span class="required">*</span></span>
                <input type="text" name="state" onChange={handleChange} />
              </label>
              <label>
                <span>Postcode / ZIP <span class="required">*</span></span>
                <input type="text" name="postcode" onChange={handleChange} />
              </label>
              <button type="submit" className='button'>CheckOut</button>
            </form>
          </div>
        </div>
      </div>

      {/* totle Price of product  */}
      <footer id="site-footer">
        <div className="container1 clearfix">
          <div className="right"><br /><br />
            <h1 className="total" style={{ color: "black", marginRight: '550px', marginTop: '-200px' }}><span><h3>SubTotal:   ₹{totalPrice}   </h3>   </span> <h3>Shipping Cost : ₹0 </h3> </h1>
            <h1 className="total" style={{ color: "black", marginRight: '550px' }}><span>Total:      </span>₹{totalPrice}</h1>
          </div>
        </div>
      </footer>
    </>
  );
};

export default CategoryItem;