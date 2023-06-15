import React,{useEffect} from "react";
import Announcement from "../components/Announcement";
import Categories from "../components/Categories";
import Footer from "../components/Footer";
import Usernavbar from "../components/Usernavbar";
import Newsletter from "../components/Newsletter";
import UserProduct from "../components/UserProduct";
import Slider from "../components/Slider";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate=useNavigate()
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/')
    }
  })
  return (
    <div className="container">
      <Announcement />
      <Usernavbar />
      <br/>
      <Slider />
      <Categories />
      <br/>
      <br/>
      <br/> <br/>                                           
      <br/> <br/>
      <br/> <br/>
      <UserProduct/>
      <Newsletter/>
      <Footer/>
    </div>
  );
};

export default Home;