import React, { useState } from "react";
import * as XLSX from "xlsx";
import MetaTags from "react-meta-tags";
import { withRouter } from "react-router-dom";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import AlertCommon from "src/components/Common/AlertCommon";
import SpinnerLoader from "../../components/Common/Spinner";
import {GetSampleApiUrl
} from "../../slices/Students/thunk";
import {
  Card,
  CardBody,
  Container,
  CardHeader,
  Col,
  Row
} from "reactstrap";
//redux
import {   useSelector,useDispatch } from "react-redux";
import { SetUnsetLoader } from "../../slices/Students/thunk";
import StudentImportView from "./studentImportView";
const StudentImport = ()=>{
const { loading } = useSelector((state) => ({
    loading: state.student.loading
}));
// on change states
const [excelFile, setExcelFile] = useState(null);
const [excelFileError, setExcelFileError] = useState(null);
const dispatch = useDispatch();
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
    //console.log(selectedFile.type);
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
  setExcelData(null);
  if (excelFile !== null) {
   
    const workbook = XLSX.read(excelFile, { type: "buffer" });
    const worksheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[worksheetName];
    const data = XLSX.utils.sheet_to_json(worksheet);
    var _studentExcelData = [];
    console.log(data);
    data.map((v,i)=>{
      if(v.Parent_ParentID !== "---"){
        _studentExcelData.push({
           "firstName":v.FirstName
        })
      }
    });
    console.log(_studentExcelData);
    /* Convert array of arrays */
    //const data2 = XLSX.utils.sheet_to_csv(worksheet, { header: 1 });
    //setExcelData(data);
  } else {
    setExcelData(null);
  }
};
return (
  <React.Fragment>
    {
      loading?(<SpinnerLoader />):(
        <div className="page-content">
        <MetaTags>
                <title>Students | Pupil ERP</title>
        </MetaTags>
        <Container fluid>
        <Breadcrumbs
                  title="Application"
                  breadcrumbItem={`Student Import`}
                />
          <Row>
          <AlertCommon />
          <Col lg="12">
          <Card>
          <CardHeader className="justify-content-between d-flex align-items-center">
                      <h4 className="card-title">Upload Excel file</h4>
                      <a  onClick={()=>dispatch(GetSampleApiUrl())}><p className="m-0 badge badge-soft-primary py-2">Download Sample File.</p></a>
                    </CardHeader>
          <CardBody>
          <div className='form'>
          <form className='form-group' autoComplete="off"
          onSubmit={handleSubmit}>
            
            <input type='file' className='form-control'
            onChange={handleFile} required></input>                  
            {excelFileError&&<div className='text-danger'
            style={{marginTop:5+'px'}}>{excelFileError}</div>}
            <button type='submit' className='btn btn-success'
            style={{marginTop:5+'px'}}>Import</button>
            
          </form>
        </div>
        <br></br>
        <hr></hr>
    
        {/* view file section */}
        <h5>View Excel file</h5>
        <div className='viewer'>
          {excelData===null&&<>No file selected</>}
          {excelData!==null&&(
            <StudentImportView students={excelData} />
          )}       
        </div>
          </CardBody>
            </Card>
          </Col>
          </Row>
        </Container>
        </div>

      )
    }
   
  </React.Fragment>
  
);
}
export default withRouter(StudentImport);