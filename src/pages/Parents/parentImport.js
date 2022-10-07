import React, { useState } from "react";
import * as XLSX from "xlsx";
import MetaTags from "react-meta-tags";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import {
  Card,
  CardBody,
  Container,
  Col,
  Row
} from "reactstrap";
import ParentImportView from "./parentImportView";
const ParentImport = ()=>{
// on change states
const [excelFile, setExcelFile] = useState(null);
const [excelFileError, setExcelFileError] = useState(null);

// submit
const [excelData, setExcelData] = useState(null);
// it will contain array of objects

// handle File
const fileType = [
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
];
const handleFile = (e) => {
  let selectedFile = e.target.files[0];
  if (selectedFile) {
    console.log(selectedFile.type);
    if (selectedFile && fileType.includes(selectedFile.type)) {
      let reader = new FileReader();
      reader.readAsArrayBuffer(selectedFile);
      reader.onload = e => {
        setExcelFileError(null);
        setExcelFile(e.target.result);
      };
    } else {
      setExcelFileError("Please select only excel file types");
      setExcelFile(null);
    }
  } else {
    console.log("plz select your file");
  }
};
const convertToJson=(csv)=> {
  var lines = csv.split("\n");

  var result = [];

  var headers = lines[0].split(",");

  for (var i = 1; i < lines.length; i++) {
    var obj = {};
    var currentline = lines[i].split(",");

    for (var j = 0; j < headers.length; j++) {
      obj[headers[j]] = currentline[j];
    }

    result.push(obj);
  }

  //return result; //JavaScript object
  return JSON.stringify(result); //JSON
}
// submit function
const handleSubmit = e => {
  e.preventDefault();
  if (excelFile !== null) {
    const workbook = XLSX.read(excelFile, { type: "buffer" });
    const worksheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[worksheetName];
    const data = XLSX.utils.sheet_to_json(worksheet);
    /* Convert array of arrays */
    const data2 = XLSX.utils.sheet_to_csv(worksheet, { header: 1 });
    setExcelData(data);
  } else {
    setExcelData(null);
  }
};
return (
  <React.Fragment>
    <div className="page-content">
    <MetaTags>
            <title>Parents | Pupil ERP</title>
    </MetaTags>
    <Container fluid>
    <Breadcrumbs
              title="Application"
              breadcrumbItem={`Parent Import`}
            />
      <Row>
      <Col lg="12">
      <Card>
      <CardBody>
      <div className='form'>
      <form className='form-group' autoComplete="off"
      onSubmit={handleSubmit}>
        <label><h5>Upload Excel file</h5></label>
        <br></br>
        <input type='file' className='form-control'
        onChange={handleFile} required></input>                  
        {excelFileError&&<div className='text-danger'
        style={{marginTop:5+'px'}}>{excelFileError}</div>}
        <button type='submit' className='btn btn-success'
        style={{marginTop:5+'px'}}>Submit</button>
      </form>
    </div>
    <br></br>
    <hr></hr>

    {/* view file section */}
    <h5>View Excel file</h5>
    <div className='viewer'>
      {excelData===null&&<>No file selected</>}
      {excelData!==null&&(
        <ParentImportView parents={excelData} />
      )}       
    </div>
      </CardBody>
        </Card>
      </Col>
      </Row>
    </Container>
    </div>
  </React.Fragment>
  
);
}
export default ParentImport;