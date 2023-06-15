import React,{ useEffect, useState } from 'react';
import axios from 'axios'
import { GridComponent, ColumnsDirective, ColumnDirective, Resize, Sort, ContextMenu, Filter,Edit, Page, ExcelExport, PdfExport, Inject,CommandColumn } from '@syncfusion/ej2-react-grids';
import {Header} from '../Components';
import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

const Customers = () => {
  const [user, setUsers] = useState([]);

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = async (req, res) => {
    const data = axios.get('http://localhost:4000/api/user/getuser')
      .then((res) => {
        setUsers(res.data.data)
        console.log("user", res.data.data)
      })
  }

const columns = [
    //  {valueGetter:(orders)=>orders.rows },
    { field: 'id', headerName: 'id' },
    {
      field: 'image', headerName: 'Image', renderCell: (user) =>
        <img src={`http://localhost:4000/` + user.row.image} alt="User Image" style={{ width: '80px', height: '80px', borderRadius: '50%' }} />
    },
    { field: 'username', headerName: 'user_name', width: '200'},
    { field: 'email', headerName: 'email',width:"300" },
    {
      field: 'actions', headerName: 'Actions', width: 400, renderCell: (params) => {
        return (
          <>
            <button style={{ border: "none" }} 
            onClick={() => handleDelete(params.id)}> <DeleteIcon color='error' /></button>
             &nbsp; &nbsp; &nbsp;<Link to={`/useredit/${params.id}`} >
              <EditIcon color='info' /></Link>
          </>
        );
      }
    }
  ]

  const handleDelete = async (id) => {

  }
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Users List" />
      <DataGrid style={{ color: "black", height: 800, width: "85%", padding: 50 }}
        key={user.id || user.Id}
        getRowId={row => row.id || row.Id}
        columns={columns}
        rows={user}
        pageSize={6}
        rowHeight={100}
        components={{ Toolbar: GridToolbar }}
        initialState={{
          pagination: { paginationModel: { pageSize: 5 } },
        }}
        pageSizeOptions={[5, 10, 25]}

      />
    </div>
  )
}

export default Customers