import React,{useEffect} from 'react'
import payment from './payment.png'
import { Link,useNavigate } from 'react-router-dom'
import HomeIcon from '@mui/icons-material/Home';
const Success = () => {
    const navigate=useNavigate()
    useEffect(() => {
        if (!localStorage.getItem('token')) {
          navigate('/')
        }
      })    
      const removeCart =()=>{
        navigate('/home')
      }
  return (
    <div>
        <img src={payment} style={{marginLeft:'250px'}}/>
        <center>
     <button onClick={removeCart} style={{textAlign:"center", width:"180px",height:"30px",color:"white",fontSize:"20px",backgroundColor:"green"}} ><HomeIcon />  Back to Home</button>
     </center>
    </div>
  )
}

export default Success