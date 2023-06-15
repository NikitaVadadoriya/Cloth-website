import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {Header} from '../Components'
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const Orders = () => {

  const [products, setProducts] = useState([]);
  useEffect(() => {
    getAllProduct();
  }, []);
  const getAllProduct = async (req, res) => {
    const data = axios.get('http://localhost:4000/api/product/productcategory')
      .then((res) => {
        setProducts(res.data.data)
        console.log("products", res.data.data)
      })
  }
 const columns = [
    { field: 'id', headerName: 'id' },
    {field: 'image', headerName: 'Image', renderCell: (product) =>
        <img src={`http://localhost:4000/` + product.row.subcategory.image} alt="User Image" style={{ width: '80px', height: '80px', borderRadius: '50%' }} />
    },
    { field: 'product_name', headerName: 'product_name', width: '200'},
    { field: 'totle_price', headerName: 'totle_price' },
    { field: 'description', headerName: 'description',width:"400" },
    {
      field: 'actions', headerName: 'Actions', width: 400, renderCell: (params) => {
        return (
          <>  
            <button style={{ border: "none" }} 
            onClick={() => handleDelete(params.id)}> <DeleteIcon color='error' /></button>
             &nbsp; &nbsp; &nbsp;<Link to={`/productedit/${params.id}`} >
              <EditIcon color='info' /></Link>
          </>
        );
      }
    }
  ]

  const handleDelete = async (id) => {
    const answer = window.confirm('are you sure delete Product')
    if (answer == false) { } else {
        const deleteData = await axios.delete(`http://localhost:4000/api/product/${id}`).then((res) => {
         getAllProduct();
        })
        console.log(deleteData);
    }
  }
  return (
    <div className="m-2 md:m-10 m
    t-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Product" />  
      <Link to='/addProduct'><button style={{marginLeft:"990px",width:"130px",height:"45px",marginTop:"-50px",backgroundColor:"#24a0ed",color:"white",fontSize:'20px'}}> Add New </button></Link>
    <br/>
      <DataGrid style={{ color: "black", height: 800, width: "80%", padding: 50 }}
        key={products.id || products.Id}
        getRowId={row => row.id || row.Id}
        columns={columns}
        rows={products}
        pageSize={6}
        rowHeight={100}
        components={{ Toolbar: GridToolbar }}
        initialState={{
          pagination: { paginationModel: { pageSize: 5 } },
        }}
        pageSizeOptions={[5, 10, 25]}
      />
    </div>
  );
};

export default Orders;