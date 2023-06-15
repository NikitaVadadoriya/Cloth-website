import React, { useEffect } from "react";
import Announcement from "../components/Announcement";
import Categories from "../components/Categories";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import Products from "../components/Products";
import Slider from "../components/Slider";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate()
  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/home')
    }
  })
  return (
    <div className="container">
      <Announcement />
      <Navbar />
      <br />
      <br />
      <Slider />
      <Categories />
      <br />
      <br />
      <br /> <br />
      <br /> <br />
      <br />
      <h1 style={{ textAlign: "center", marginTop: '-100px' }}>All newest Product</h1>
      <hr style={{ width: "310px", marginLeft: "480px", height: "4px", backgroundColor: "black" }} />
      <br /> <br />
      <br /> <br />
      <Products />
      <br /> <br />
      <Newsletter/>
      <br /> <br />
      <Footer/>
    </div>
  );
};

export default Home;