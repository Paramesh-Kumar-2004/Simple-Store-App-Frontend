import axios from "axios";

const API_URL = "http://10.0.2.2:5000/api/v1";


const axiosInstance = axios.create({
    baseURL: API_URL,
    withCredentials: true, // Important for cookies / JWT
    headers: {
        "Content-Type": "application/json",
    },
});


// 1. REGISTER USER
export const registerUser = async (data) => {
    try {
        const res = await axiosInstance.post("/register", data);
        return res.data;
    } catch (error) {
        throw error.response?.data || { message: error.message };
    }
};


// 2. LOGIN USER
export const loginUser = async (data) => {
    try {
        const res = await axiosInstance.post("/login", data);
        return res.data;
    } catch (error) {
        throw error.response?.data || { message: error.message };
    }
};


// 3. GET ALL USERS (ADMIN ONLY)
export const getUsers = async (token) => {
    try {
        const res = await axiosInstance.get("/users", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res.data;
    } catch (error) {
        throw error.response?.data || { message: error.message };
    }
};


// 4. GET SINGLE USER
export const getSingleUser = async (id, token) => {
    try {
        const res = await axiosInstance.get(`/user/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res.data;
    } catch (error) {
        throw error.response?.data || { message: error.message };
    }
};



// 5. CREATE USER (ADMIN ONLY)
export const createUser = async (data, token) => {
    try {
        const res = await axiosInstance.post("/users", data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res.data;
    } catch (error) {
        throw error.response?.data || { message: error.message };
    }
};



// 6. UPDATE USER (ADMIN ONLY)
export const updateUser = async (id, data, token) => {
    try {
        const res = await axiosInstance.put(`/user/${id}`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res.data;
    } catch (error) {
        throw error.response?.data || { message: error.message };
    }
};


// 7. DELETE USER (ADMIN ONLY)
export const deleteUser = async (id, token) => {
    try {
        const res = await axiosInstance.delete(`/user/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res.data;
    } catch (error) {
        throw error.response?.data || { message: error.message };
    }
};
