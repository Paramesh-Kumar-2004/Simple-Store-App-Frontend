const axios = require("axios");

// ⚠️ Use 10.0.2.2 for Android emulator, localhost works in Node.js directly
const api = axios.create({
    // baseURL: "http://10.0.2.2:2004/api/v1",
    baseURL: "http://10.57.195.238:2004/api/v1",
});

// Function to fetch all products
async function fetchAllProducts() {
    try {
        console.log("Fetching products...");
        const res = await api.get("/getAllProducts");
        console.log("Products fetched:", res.data); // actual response
        return res.data; // returns { products: [...] } if backend sends like that
    } catch (error) {
        console.error("Error fetching products:", error.response?.data || error.message);
        return null;
    }
}

// Example usage
fetchAllProducts();
