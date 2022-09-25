import axios from "axios";
    
const setAuthToken = (tenantId) => {
    axios.defaults.baseURL='http://localhost:30803';
  if (tenantId) {
    axios.defaults.headers.common["tenant"] = tenantId;
    axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
    axios.defaults.headers.common["Access-Control-Allow-Methods"] = "GET,PUT,POST,DELETE,PATCH,OPTIONS";
    //axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}
  } else {
    
    delete axios.defaults.headers.commom["Authorization"];
    //delete axios.defaults.headers.commom["x-auth-token"];
  }
};



export default setAuthToken;