import axios from "axios";
import { baseUrl } from '../../baseURL'


export const loginUser = async (body) => {
    try {
        const data = await axios.post(`${baseUrl}/user/login`, body);
        return data.data;
    } catch (error) {
        console.log(error);
        return error.response.data;
    }
}


export const addUser = async (body) => {
    try {
        const data = await axios.post(`${baseUrl}/user/add`, body);
        return data.data;
    } catch (error) {
        console.log(error);
        return error.response.data;
    }
}


export const getUserByToken = async (token) => {
    try {
        const data = await axios.get(`${baseUrl}/user/me`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return data.data;
    } catch (error) {
        console.log(error);
        return error.response.data;
    }
}