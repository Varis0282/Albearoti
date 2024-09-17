import axios from "axios";
import { baseUrl } from '../../baseURL'

const token = localStorage.getItem('token');

const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
}


export const getBlogsList = async (body) => {
    try {
        if (token) {
            const data = await axios.post(`/blog/list`, body, { headers });
            return data.data;
        } else {
            return { success: false, message: 'Token not found' };
        }
    } catch (error) {
        console.log(error);
        return error;
    }
}
export const getBlogSingle = async (body) => {
    try {
        if (token) {
            const data = await axios.get(`/blog/${body._id}`, { headers });
            return data.data;
        } else {
            return { success: false, message: 'Token not found' };
        }
    } catch (error) {
        console.log(error);
        return error;
    }
}

export const updateBlogWithId = async (body) => {
    try {
        if (token) {
            const data = await axios.put(`/blog/update`, body, { headers });
            return data.data;
        } else {
            return { success: false, message: 'Token not found' };
        }
    } catch (error) {
        console.log(error);
        return error;
    }
}

export const saveNewBlog = async (body) => {
    try {
        if (token) {
            const data = await axios.post(`/blog/add`, body, { headers });
            return data.data;
        } else {
            return { success: false, message: 'Token not found' };
        }
    } catch (error) {
        console.log(error);
        return error;
    }
}
export const publishBlog = async (body) => {
    try {
        if (token) {
            const data = await axios.put(`/blog/publish`, body, { headers });
            return data.data;
        } else {
            return { success: false, message: 'Token not found' };
        }
    } catch (error) {
        console.log(error);
        return error;
    }
}
export const deleteBlog = async (body) => {
    try {
        if (token) {
            const data = await axios.delete(`/blog/delete`, {
                headers: headers,
                data: body
            });
            return data.data;
        } else {
            return { success: false, message: 'Token not found' };
        }
    } catch (error) {
        console.log(error);
        return error;
    }
}