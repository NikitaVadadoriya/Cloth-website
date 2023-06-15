import React,{ useEffect, useState } from 'react';
import axios from 'axios'
import { GridComponent, ColumnsDirective, ColumnDirective, Resize, Sort, ContextMenu, Filter,Edit, Page, ExcelExport, PdfExport, Inject,CommandColumn } from '@syncfusion/ej2-react-grids';
import{ Link} from 'react-router-dom'
import {Header} from '../Components';

const Calendar = () => {
  const [variant, setVariant] = useState([]);

  useEffect(() => {
    getAllVariant();
  }, []);

  const getAllVariant = async (req, res) => {
    const data = axios.get('http://localhost:4000/api/variant/getvariant')
      .then((res) => {
        setVariant(res.data.data)
        console.log("user", res.data.data)
      })
  }

  function gridTemplate(props) {
    var src = 'http://localhost:4000/' + props.Product.subcategory.image;
    return (<div >
        <img src={src} alt={props.id}  style={{borderRadius:"100%",width:'70px' ,height:'70px'}}/>
    </div>);
}
const editSettings= { allowEditing: true, allowAdding: true, allowDeleting: true, allowEditOnDblClick: false };
const commands= [{ 
  type: 'Edit', buttonOption: { iconCss: 'e-icons e-edit', cssClass: 'e-flat' } },
{ type: 'Delete', buttonOption: { iconCss: 'e-icons e-delete', cssClass: 'e-flat' } },
{ type: 'Save', buttonOption: { iconCss: 'e-icons e-update', cssClass: 'e-flat' } },
{ type: 'Cancel', buttonOption: { iconCss: 'e-icons e-cancel-icon', cssClass: 'e-flat' } }];

  return (
    <div className='m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl '>
        <Header category="App" title="Variant"/>
      <Link to='/addVariant'><button style={{float:"right",width:"130px",height:"45px",marginTop:"-50px",backgroundColor:"#24a0ed",color:"white",fontSize:'20px'}}>Add New </button></Link>
        <GridComponent dataSource={variant} locale='en-US' allowPaging={true} height={550} pageSettings={{ pageCount: 4, pageSizes: true }} editSettings={editSettings}>
      <ColumnsDirective>
            <ColumnDirective template={gridTemplate} headerText='Image'  />
            <ColumnDirective field='Product.product_name' headerText='Product Name'  />
            <ColumnDirective field='color' headerText='Color Name' width="300px"/>
            <ColumnDirective field='size' headerText='size' />
            <ColumnDirective field='Action' headerText='Action' commands={commands}/>
        </ColumnsDirective>
        <Inject services={[Resize, Sort, ContextMenu, Filter, Page, ExcelExport, Edit, PdfExport,CommandColumn]} />
      </GridComponent>
    </div>
  )
}

export default Calendar