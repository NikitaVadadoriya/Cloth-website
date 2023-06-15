import React, { useEffect, useState } from 'react'
import axios from 'axios'
import '../style.css'
import { Link } from 'react-router-dom'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Button } from '@mui/material'
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Slider from '@mui/material/Slider';
import { add } from '../store/cartSlice'
import { useDispatch } from 'react-redux'

const Product = () => {
  const [products, setProducts] = useState([]);
  const [subcategory, setSubcategory] = useState([]);
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [filterdata, setFilterdata] = useState([]);
  const [pricefilter, setPriceFilter] = useState([])
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(3000);
  const dispatch = useDispatch();

  useEffect(() => {
    getAllProduct();
    getAllSubcategory();
  }, []);


  //GET ALL VARIANT COLOR AND SIZE
  useEffect(() => {
    const fetchVariantFields = async () => {
      try {
        const data = await axios.get('http://localhost:4000/api/variant/getallvariant')
          .then((res) => {
            setColors(res.data.colors);
            setSizes(res.data.sizes);
          })
      } catch (error) {
        console.error(error);
      }
    };
    fetchVariantFields();
  }, []);

  // GET ALL PRODUCT DETAILS
  const getAllProduct = async (req, res) => {
    const data = axios.get('http://localhost:4000/api/product/productcategory')
      .then((res) => {
        setProducts(res.data.data)
        setFilterdata(res.data.data);
        setPriceFilter(res.data.data)
        console.log("products", res.data.data)
      })
  }

  //GET ALL SUBCATEGORY
  const getAllSubcategory = async (req, res) => {
    const data = axios.get('http://localhost:4000/api/subcategory/getallsubcategory')
      .then((res) => {
        setSubcategory(res.data.subcategory_name);
      })
  }


  // ADD CART DATA IN LOCALSTORAGE
  useEffect(() => {
    const storedCartItems = localStorage.getItem('cartData');
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cartData', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (curEle) => {
    const info = {
      quantity: 1
    }
    const newItem = { ...curEle, ...info };
    dispatch(add(newItem))
    setCartItems((prevItems) => {
      const updatedItems = [...prevItems, newItem];
      // toast.info("Product Added 🛒",{
      //   position: toast.POSITION.BOTTOM_RIGHT,
      // })
      (localStorage.setItem('cartData', JSON.stringify(updatedItems)));
      return updatedItems;
    })
  };

  // COLOR SIZE AND SUBCATEGORY NAME WISE FILTER CODE

  const handleColorChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedColors((prevSelectedColors) => [...prevSelectedColors, value]);
    } else {
      setSelectedColors((prevSelectedColors) =>
        prevSelectedColors.filter((color) => color !== value)
      );
    }
  };

  const handleSizeChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedSizes((prevSelectedSizes) => [...prevSelectedSizes, value]);
    } else {
      setSelectedSizes((prevSelectedSizes) =>
        prevSelectedSizes.filter((size) => size !== value)
      );
    }
  };

  const handleSubcategoryChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedSubcategory((prevSelectedSubcategories) => [
        ...prevSelectedSubcategories,
        value,
      ]);
    } else {
      setSelectedSubcategory((prevSelectedSubcategories) =>
        prevSelectedSubcategories.filter((subcategory) => subcategory !== value)
      );
    }
  };

  //SEARCH PRODUCTS

  const handleFilterSubmit = async () => {
    try {
      const data = await axios.get('http://localhost:4000/api/variant/categories', {
        params: {
          colors: selectedColors.join(','),
          sizes: selectedSizes.join(','),
          subcategories: selectedSubcategory.join(','),
        },
      })
        .then((res) => {
          setProducts(res.data.data);
          console.log(res.data.data)
        })
    } catch (error) {
      console.error('Error filtering products:', error);
    }
  };

  const handleFilter = (e) => {
    const searchQuery = e.target.value.toLowerCase(); // Convert search query to lowercase for case-insensitive search
    if (searchQuery.length > 0) {
      const filteredProducts = products.filter((product) =>
        product.subcategory.subcategory_name.toLowerCase().includes(searchQuery)
      );
      setProducts(filteredProducts)
    }
    else {
      setProducts(filterdata);
    }
  };

  // PRICE FILTER

  useEffect(() => {
    fetchData();
  }, [minPrice, maxPrice])

  const fetchData = async () => {
    try {
      const data = await axios.get('http://localhost:4000/api/variant/price', {
        params: {
          minPrice,
          maxPrice,
        },
      })
        .then((res) => {
          setProducts(res.data.data);

        })
    } catch (error) {
      console.error('Error filtering products:', error);
    }
  };


  return (
    <>
      <div id="sidebar" style={{ marginTop: "-40px" }}>

        <Button onClick={getAllProduct} variant='contained' color='info'>All Products</Button>

        <input type='search' style={{ marginTop: "20px", height: "30px" }}
          onChange={(e) => handleFilter(e)}
          placeholder='Search Here...' />

        <h3>SUB CATEGORIES</h3>
        {
          Array.isArray(subcategory) ?
            subcategory.map((subcat, index) => {
              return (
                <>
                  <label key={index}>
                    <input
                      type="checkbox"
                      value={subcat}
                      checked={selectedSubcategory.includes(subcat)}
                      onChange={handleSubcategoryChange}
                    />
                    {subcat}
                  </label>
                </>
              )
            })
            : null
        }

        <h3>COLORS</h3>
        {
          Array.isArray(colors) ?
            colors.map((color, index) => (
              <div className="checklist colors">
                <label key={index}>
                  <input
                    type="checkbox"
                    value={color}
                    name="color"
                    checked={selectedColors.includes(color)}
                    onChange={handleColorChange}
                  />
                  {color}
                </label>
              </div>
            )) : null}

        <h3>SIZE</h3>
        {
          Array.isArray(sizes) ?
            sizes.map((size, index) => (
              <div class="checklist sizes">
                <label key={index}>
                  <input
                    type="checkbox"
                    value={size}
                    name='sizes'
                    checked={selectedSizes.includes(size)}
                    onChange={handleSizeChange}
                  />
                  {size}
                </label>
              </div>
            )) : null}
        <button className='btn btn-success' onClick={handleFilterSubmit} style={{ width: '100px', height: '30px' }}> Filter </button>
        <h3>PRICE RANGE</h3>

        <Slider
          value={[minPrice, maxPrice]}
          min={0}
          max={3000}
          onChange={(e, newValue) => {
            setMinPrice(newValue[0]);
            setMaxPrice(newValue[1]);
          }}
          valueLabelDisplay="auto"
          aria-labelledby="price-range-slider"
        />
      </div>
      <section className='main-card--product-cointainer' style={{ marginTop: "-700px", marginLeft: "270px", gridTemplateColumns: "repeat(3, minmax(200px, 500px))",height:'1200px' }}>
        {
          products.map((curEle) => {
            return (
              <>
                <div className='card-container' key={curEle.id}>
                  <div className='card'>
                    <div className="card-body">
                      <Link to={`/viewmore/${curEle.id}`}>
                        <img src={`http://localhost:4000/` + curEle.subcategory.image} alt="image" className='card-media' /><br />
                      </Link>
                      <span className='card-title'> {curEle.subcategory.subcategory_name}</span>  <br />
                      <span className='card-description '>
                        {curEle.description}
                      </span><br />
                      <button className='card-tag subtle' onClick={(e) => addToCart(curEle, 1)}><AddShoppingCartIcon size="small" />Add to cart</button>
                      <ToastContainer />
                      <span className='price'>
                        ₹{curEle.totle_price}
                      </span>
                    </div>
                  </div>
                </div >
              </>
            )
          })
        }
       
      </section >
    

    </>
  )
}

export default Product