import axios, { AxiosResponse } from "axios";
import { toast } from "react-toastify";
import {history} from '../../'


axios.defaults.baseURL = "http://localhost:5000/";

axios.interceptors.response.use(undefined, error => {
    if (error.message === 'Network Error' && !error.response) {
        toast.error('Network error - make sure API is running!')
    }
    const {status,config, data} = error.response;
    if (status === 404) {
        history.push('/notfound');
    }
    if(status === 400 && config.method ==='get' && data.errors.hasOwnProperty('id')){
        history.push('/notfound');
    }
    if(status === 500)
    {
        toast.error('Server error - check the terminal for more info!')
    }
    throw error.response
})


axios.interceptors.request.use((config) =>{
    const token = window.localStorage.getItem('jwt');
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config;
        
},error =>{
    return Promise.reject(error);
})

const responseBody = (response) => response.data;


const requests = {
    get: (url) => axios.get(url).then(responseBody),
    post: (url, body) => axios.post(url, body).then(responseBody),
    put: (url, body) => axios.put(url, body).then(responseBody),
    del: (url) => axios.delete(url).then(responseBody),
};

const Vehicles = {
    list: () => requests.get("/vehicle"),
    details: id => requests.get(`/vehicle/${id}`),
    create: vehicle => requests.post("/vehicle", vehicle),
    update: vehicle => requests.put(`/vehicle/${vehicle.id}`, vehicle),
    delete: id => requests.del(`/vehicle/${id}`),
};


const User = {
    login: (user) => requests.post('./account/login',user),
    register: (user) => requests.post('./account/register',user),
}

export default {
    Vehicles,
    User
};
