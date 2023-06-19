import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Announcement from '../components/Announcement'
import Navbar from '../components/Navbar'
import ClearIcon from '@mui/icons-material/Clear';
import './cart.css'
import { useNavigate,Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

const CategoryItem = ({ item }) => {
    const [category, setCategory] = useState([]);
    const [mess, setMess] = useState("");
    // const [totalPrice, setTotalPrice] = useState(0);
    const navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem('token')) {
          navigate('/home')
        }
      })
    useEffect(() => {
        getAllProduct()
    }, []);
    
    const getAllProduct = async (req, res) => {
        try {
            const storedCartItems = await localStorage.getItem("cartData") || []
            if (storedCartItems) {
                setCategory(JSON.parse(storedCartItems));
                console.log(storedCartItems)
            }
        } catch (error) {
            console.error(error);
        }
    }
    const calculateTotalPrice = () => {
        let totalPrice = 0;
        category.map((product) => {
            //   const { price, quantity } = product;
            totalPrice += product.totle_price * product.quantity;
        });
        return totalPrice;
    };

    const handleIncrement = (id) => {
        const updatedCartItems = category.map((item) =>
            item.id === id
                ? { ...item, quantity: item.quantity + 1 }
                : item
        );
        localStorage.setItem('cartData', JSON.stringify(updatedCartItems));
        setCategory(updatedCartItems);
        // fetch(`http://localhost:4000/api/cart/${id}/increment`, { method: 'PUT' });
    };

    const handleDecrement = (id) => {
        const updatedCartItems = category.map((item) =>
            item.id === id
                ? { ...item, quantity: Math.max(item.quantity - 1, 0) }
                : item
        );
        localStorage.setItem('cartData', JSON.stringify(updatedCartItems));
        setCategory(updatedCartItems);
        // fetch(`http://localhost:4000/api/cart/${id}/decrement`, { method: 'PUT' });
    };

    const handleDelete = async (id) => {
        console.log(id);
        const answer = window.confirm('are you sure delete task')
        if (answer == false) { } else {
            const deleteData = await axios.delete(`http://localhost:4000/api/cart/${id}`).then((res) => {
             getAllProduct();
            })
            console.log(deleteData);
            setMess(deleteData)
        }
    };
    const handleCheckout = async() => {
      
        navigate('/login');
    };
    const totalPrice = calculateTotalPrice();

    
if (category.length === 0) {
    
    return (
        <div>
             <Announcement />
            <Navbar /><br/><br/><br/><br/><br/><br/><br/><br/>
            <h1 style={{ textAlign: "center" }}>Cart are Currently empty</h1><br />
            <center> <Link to='/'><button style={{ width: "200px", height: "30px", backgroundColor: 'teal', color: "white", alignItems: "center" }}><KeyboardBackspaceIcon /> &nbsp;Continue to shopping</button></Link></center>
        </div>) 
}
    return (
        <>
            <Announcement />
            <Navbar />
            <div className="carts-container">
                {
                    category.map((cat) => {
                        // const totle = <p>₹{cat.product.totle_price * cat.quantity}</p>
                        return (
                            <section id="carts" key={cat.id}>
                                <article className="products">
                                    <header>
                                            <img src={`http://localhost:4000/` + cat.subcategory.image} alt="Gamming Mouse" />
                                    </header>
                                    <div className="contents">
                                        <h1>{cat.product_name}</h1>
                                        {cat.description}
                                        <div title="You have selected this product to be shipped in the color yellow." style={{ top: "0" }} className="color yellow">
                                            <button onClick={() => handleDelete(cat.id)}><ClearIcon color='error' /></button>
                                        </div>
                                    </div>
                                    <footer className="contents">
                                        <button className="qt-minus" onClick={() => handleDecrement(cat.id)}>-</button>
                                        <span className="qt">{cat.quantity}</span>
                                        <button className="qt-plus" onClick={() => handleIncrement(cat.id)} >+</button>
                                        <h2 className="full-price"> {cat.totle_price * cat.quantity} </h2>
                                        <h2 className="price" style={{ fontSize: '25px' }}>
                                            ₹{cat.totle_price}
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
                        <button className="btn" style={{ color: "white" ,marginBottom:"10px"}} onClick={handleCheckout}>Checkout</button>
                    </div>
                    <br/>
                    <br/>
                </div>
            </footer>
        </>
    );
};

export default CategoryItem;