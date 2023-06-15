import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { GridComponent, ColumnsDirective, ColumnDirective, Resize, Sort, ContextMenu, Filter, Edit, Page, ExcelExport, PdfExport, Inject, CommandColumn }
  from '@syncfusion/ej2-react-grids';
import { Header } from '../Components'
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const Employees = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getAllOrders();
  }, []);

  const getAllOrders = async (req, res) => {
    const data = axios.get('http://localhost:4000/api/order/allorder')
      .then((res) => {
        setOrders(res.data.data)
        console.log("order", res.data.data)
      })
  }

  const columns = [
    //  {valueGetter:(orders)=>orders.rows },
    { field: 'id', headerName: 'id' },
    {
      field: 'image', headerName: 'Image', renderCell: (orders) =>
        <img src={`http://localhost:4000/` + orders.row.user.image} alt="User Image" style={{ width: '80px', height: '80px', borderRadius: '50%' }} />
    },
    { field: 'username', headerName: 'Username', width: '200', valueGetter: (orders) => orders.row.user.username },
    { field: 'address', headerName: 'Address', width: '300', valueGetter: (orders) => orders.row.address.address },
    { field: 'city', headerName: 'city', valueGetter: (orders) => orders.row.address.city },
    { field: 'totle', headerName: 'totle' },
    { field: 'status', headerName: 'status' },
    {
      field: 'actions', headerName: 'Actions', width: 400, renderCell: (params) => {
        return (
          <>
            <button style={{ border: "none" }} 
            onClick={() => handleDelete(params.id)}> <DeleteIcon color='error' />Delete</button>
             &nbsp; &nbsp; &nbsp;
                     </>
        );
      }
    }
  ]

  const handleDelete = async (id) => {
    const answer = window.confirm('are you sure delete Product')
    if (answer == false) { } else {
        const deleteData = await axios.delete(`http://localhost:4000/api/cart/${id}`).then((res) => {
          getAllOrders();
        })
        console.log(deleteData);
        // setMess(deleteData)
    }
  }

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Orders Data" />
      <DataGrid style={{ color: "black", height: 500, width: "100%", padding: 50 }}
        key={orders.id || orders.Id}
        getRowId={row => row.id || row.Id}
        columns={columns}
        rows={orders}
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
export default Employees;