import React, { useEffect, useState } from "react";
import { AgGridColumn, AgGridReact } from "ag-grid-react";

import axios from 'axios';

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";
//import AtdData from "./data/MOCK_DATA.json";

const AllUsers = () => {
  const [AtdData , setAtdData]= useState([]);
  const [gridApi, setGridApi] = useState([]);
  const [gridColumnApi, setGridColumnApi] = useState([]);
  const [rowData, setRowData] = useState([]);
  console.log(gridColumnApi)
  const getEmployeeData = async () =>{
            try{
                const data = await axios.get("http://localhost:4000/all");
                console.log(data.data, "All User");
                setAtdData(data.data)
            }
            catch(err)
            {
                console.log(err)
                    
            }  
        } 

useEffect(()=>{
            getEmployeeData()
        },[])

  useEffect(() => {
    const formattedDates = AtdData.map(data => {
      return {
        name: data.name,
        email: data.email,
        phone: data.phone,
      };
    });
    setRowData(formattedDates);
  }, [AtdData]);

  useEffect(() => {
    console.log(gridApi);
  });

  // const resetAppliedFilters = () => {
  //   gridApi.setFilterModel(null);
  // };

  
 

  const onGridReady = params => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
    params.api.addGlobalListener((type, event) => {
      switch (type) {
        case "filterChanged":
          console.log(event);
          return;
        default:
          return null;
      }
    });
  };
console.log(onGridReady);
  return (
    <div className="App">
      {/* <Button onClick={resetAppliedFilters} variant="outlined">
        Reset Filters
      </Button> */}
      {/* <hr /> */}
      <div
        className={"ag-theme-balham"}
        style={{ height: "86vh", width: "100%" }}
      >
        <AgGridReact
          pagination={true}
          defaultColDef={{sortable: true , filter:true}}
          rowData={rowData}>
        <AgGridColumn headerName="Name" field="name" sortable={ true } editable={true} filter={ true }></AgGridColumn>
        <AgGridColumn headerName="Email" field="name" filter={ true } editable={true} ></AgGridColumn>
        <AgGridColumn headerName="Phone" field="phone" sortable={ true } filter={ true } editable={true}></AgGridColumn>

        </AgGridReact>
      </div>
    </div>
  );
};

export default AllUsers ;
