import axios from 'axios'
import './assests/css/login.css'

//creating a axios-instnce
const axiosInstance = axios.create({
    baseURL:'https://api.coindesk.com/v1/bpi'
})

//displaying loading
// intercepting the requests
axiosInstance.interceptors.request.use(config => {
    document.body.classList.add('loading-indicator');
    return config;
}, error => {
    return Promise.reject(error);
});

//intercepting the responce
axiosInstance.interceptors.response.use(response => {
    document.body.classList.remove('loading-indicator');
    return response;
}, error => {
    document.body.classList.remove('loading-indicator');
  
    //handling  errors casually
    if(error  )
    alert('Please check your internet connection...')
   
      return Promise.reject( error && error.response && error.response.data)
})




export default axiosInstance