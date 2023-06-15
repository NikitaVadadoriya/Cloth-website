import React, { useEffect, useState } from 'react'
import './single.css'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Announcement from '../components/Announcement';
import UserNavbar from '../components/Usernavbar';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { add } from '../store/cartSlice'
import { useDispatch } from 'react-redux'

const UserSingleProduct = () => {
    const [products, setProducts] = useState('');
    const [price, setPrice] = useState([]);
    const [variantFields, setVariantFields] = useState({ colors: [], sizes: [] });
    const [media, setMedia] = useState("");
    const [cartItems, setCartItems] = useState([]);
  const dispatch = useDispatch();

    useEffect(() => {
        getProduct();
    }, [])

    const { id } = useParams();
    const getProduct = async () => {
        const data = axios.get(`http://localhost:4000/api/subcategory/get/${id}`)
            .then((res) => {
                setProducts(res.data.data);
                setPrice(res.data.data.subcategory)
                console.log("product", res.data.data.subcategory)
                // setPrice(res.data.data.products);
            })
    }

    useEffect(() => {
        const getAllImages = async () => {
            const data = await axios.get(`http://localhost:4000/api/media/getimages/${id}`)
                .then((res) => {
                    setMedia(res.data.images);
                    console.log(res.data.images)
                })
        }
        getAllImages()
    }, [])

    useEffect(() => {
        const fetchVariantFields = async () => {
            try {
                const data = await axios.get(`http://localhost:4000/api/variant/getallvariant/${id}`)
                    .then((res) => {
                        setVariantFields(res.data);
                        console.log(res.data)
                    })
            } catch (error) {
                console.error(error);
            }
        };
        fetchVariantFields();
    }, []);

    //Store cart data in localstorage
    useEffect(() => {
        const storedCartItems = localStorage.getItem('cartData');
        if (storedCartItems) {
            setCartItems(JSON.parse(storedCartItems));
        }
    }, []);

    useEffect(() => {
        // Save cart items to local storage whenever cartItems state changes
        localStorage.setItem('cartData', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (p) => {
        const info = {
            quantity: 1
        }
        const newItem = { ...p, ...info };
        dispatch(add(newItem))
        setCartItems((prevItems) => {
            const updatedItems = [...prevItems, newItem];
            //   toast.info("Product Added 🛒",{
            //     position: toast.POSITION.BOTTOM_RIGHT,
            //   })
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
        <>
            <Announcement />
            <UserNavbar />
            <main className="cart-container">
                <div className='left-column'>
                    <img className='img' src={`http://localhost:4000/` + price.image} alt="cnbvbdnvb" />
                </div>

                {/* <!-- Right Column --> */}
                <div className="right-column">

                    {/* <!-- Product Description --> */}
                    <div className="product-description">
                        <h1>{price.subcategory_name}</h1>
                        <p> {products.description}</p>
                    </div>

                    {/* <!-- Product Configuration --> */}
                    <div className="product-configuration">
                        {/* <!-- Product Color --> */}
                        <div className="product-color">
                            <span>Color</span>
                            {variantFields.colors.map((color, index) => (
                                <div className="color-choose">
                                    <div class="row" >
                                        <input type="radio" name="color" value={color} />
                                        <label for={color}><span style={{ background: color, flexWrap: "flex", position: "relative" }}></span></label>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="cable-config">
                            <span>SIZE</span><br />
                            {variantFields.sizes.map((size, index) => (
                                <button key={index} style={{ width: '80px', height: "40px", marginLeft: "10px" }}>{size}</button>
                            ))}
                            <br /> <a href="#">How to configurate your headphones</a>
                        </div>
                    </div>
                    <div className="product-price">
                        
                                    <span> ₹{products.totle_price}</span>

                                    <button className="cart-btn" onClick={(e) => addToCart(products, 1)}>Add to cart</button>
                                </div>
                    </div>
            </main>
            <center>
                <br /><br />
                <h1>Related Products</h1>
                <br />
            </center>
            <div className='images'>
                {Array.isArray(media) ?
                    media.map((image, index) => (
                        <img key={index} src={`http://localhost:4000/` + image} alt={`Image ${index}`} width="300px" height="300px" style={{ padding: "50px", }} />
                    )) : null
                }
            </div>
            <br />
            <br />
        </>
    );
}

export default UserSingleProduct
