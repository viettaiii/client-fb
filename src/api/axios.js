import axios from 'axios';
const httpsRequest = axios.create({
    baseURL:"http://localhost:5500",
    withCredentials: true,
    // headers : {
    //     Authorization : `Bearer +${token}`
    // }
})

export default httpsRequest;