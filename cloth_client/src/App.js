import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Redirect
} from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from './pages/Home';
import UserHome from './UserPages/UserHome'
import WomenProduct from './pages/WomenProduct'
import UserWomenProduct from './UserPages/UserWomenProduct'
import MenProduct from './pages/MenProduct'
import UserMenProduct from './UserPages/UserMenProduct'
import ChildProduct from './pages/ChildProduct'
import UserChildProduct from './UserPages/UserChildProduct'
import Cart from './pages/Cart'
import UserCart from './UserPages/Usercart'
import SingleProduct from './pages/singleProduct';
import Address from './pages/Address'
import Order from './pages/order'
import Success from './pages/Success'
import { Provider } from 'react-redux';
import store from './store/store';
import Single from './UserPages/UserSinglePage'
function App() {
  return (
    <Provider store={store} >


      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<UserHome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/women" element={<WomenProduct />} />
          <Route path="/userwomen" element={<UserWomenProduct />} />
          <Route path="/men" element={<MenProduct />} />
          <Route path="/usermen" element={<UserMenProduct />} />
          <Route path="/child" element={<ChildProduct />} />
          <Route path="/userchild" element={<UserChildProduct />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/usercart" element={<UserCart />} />
          <Route path="/viewmore/:id" element={<SingleProduct />} />
          <Route path="/single/:id" element={<Single />} />
          <Route path="/address/:id" element={<Address />} />
          <Route path="/order/:id" element={<Order />} />
          <Route path="/success" element={<Success />} />


        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
