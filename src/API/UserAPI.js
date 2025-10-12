const axios = require("axios");


const api = axios.create({
    baseURL: "http://10.57.195.238:2004/api/v1",
});



// 1. REGISTER USER
export async function registerUser(data) {
    try {
        const response = await api.post("/register", data);
        return response.data;
    } catch (error) {
        console.error("Register Error:", error.response?.data || error.message);
        throw error.response?.data || { message: error.message };
    }
}


// 2. LOGIN USER
export async function loginUser(data) {
    try {
        const response = await api.post("/login", data);
        return response.data;
    } catch (error) {
        console.error("Login Error:", error.response?.data || error.message);
        throw error.response?.data || { message: error.message };
    }
}


// 3 GET ALL USERS
export async function getUsers() {
    try {
        const response = await api.get("/users");
        return response.data;
    } catch (error) {
        console.error("Get Users Error:", error.response?.data || error.message);
        throw error.response?.data || { message: error.message };
    }
}


// 4 GET SINGLE USER
export async function getSingleUser(id) {
    try {
        const response = await api.get(`/user/${id}`);
        return response.data;
    } catch (error) {
        console.error("Get Single User Error:", error.response?.data || error.message);
        throw error.response?.data || { message: error.message };
    }
}


// 5 CREATE USER (ADMIN)
export async function createUser(data) {
    try {
        const response = await api.post("/users", data);
        return response.data;
    } catch (error) {
        console.error("Create User Error:", error.response?.data || error.message);
        throw error.response?.data || { message: error.message };
    }
}


// 6 UPDATE USER
export async function updateUser(id, data) {
    try {
        const response = await api.put(`/user/${id}`, data);
        return response.data;
    } catch (error) {
        console.error("Update User Error:", error.response?.data || error.message);
        throw error.response?.data || { message: error.message };
    }
}


// 7 DELETE USER
export async function deleteUser(id) {
    try {
        const response = await api.delete(`/user/${id}`);
        return response.data;
    } catch (error) {
        console.error("Delete User Error:", error.response?.data || error.message);
        throw error.response?.data || { message: error.message };
    }
}


// 8 LOGOUT USER
export async function logoutUser() {
    try {
        const response = await api.get("/logout")
        console.log(response.data)
        return (response.data)
    }
    catch (error) {
        console.error("Logout User Error:", error.response?.data || error.message);
        throw error.response?.data || { message: error.message };
    }

}