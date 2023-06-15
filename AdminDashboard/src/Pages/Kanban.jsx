import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { GridComponent, ColumnsDirective, ColumnDirective, Resize, Sort, ContextMenu, Filter,Edit, Page, ExcelExport, PdfExport, Inject,CommandColumn } from '@syncfusion/ej2-react-grids';
import { Header } from "../Components";

const Kanban = () => {
  const [category, setCategory] = useState([]);
  useEffect(() => {
    getAllCategory();
  }, []);
  const getAllCategory = async (req, res) => {
    const data = axios.get('http://localhost:4000/api/category/getallcategory')
      .then((res) => {
        setCategory(res.data)
        console.log("products", res.data)
      })
  }
  function gridTemplate(props) {
    var src = 'http://localhost:4000/' + props.image;
    return (<div >
        <img src={src} alt={props.id}  style={{borderRadius:"100%",width:'70px' ,height:'70px'}}/>
    </div>);
}


  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl ">
      <Header category="App" title="Category" />
       <GridComponent dataSource={category} locale='en-US' allowPaging={true} height={450} pageSettings={{ pageCount: 4, pageSizes: true }} >
      <ColumnsDirective height='500px'>
            <ColumnDirective field='id' headerText='id' />
            <ColumnDirective  template={gridTemplate}  headerText='image' />
            <ColumnDirective field='category_name' headerText='Category Name' width="200px" height="500px" />
        </ColumnsDirective>
        <Inject services={[Resize, Sort, ContextMenu, Filter, Page, ExcelExport, Edit, PdfExport,CommandColumn]} />
      </GridComponent>
    </div>
  );
};

export default Kanban;
