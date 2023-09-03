import * as axios from 'axios';

export const axiosObj = axios.create({
    headers: {
       'Access-Control-Allow-Origin': 'https://localhost:5001/',
       "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",    
     },      
    //baseURL: "http://inventoryapi.local/",
      baseURL: "https://localhost:5001/",
});

export const checkToken = () =>{
    const token = localStorage.getItem("authority");
    axiosObj.defaults.headers.common['Authorization'] = token;
}