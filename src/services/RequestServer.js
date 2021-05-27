import * as axios from 'axios';

export const axiosObj = axios.create({
    baseURL: "https://localhost:5001/",
});

export const checkToken = () =>{
    const token = localStorage.getItem("authority");
    axiosObj.defaults.headers.common['Authorization'] = token;
}
