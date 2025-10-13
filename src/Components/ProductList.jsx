import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from "react-native";
import { getAllProducts } from "../API/API"; // your axios API

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        setLoading(true);
        setMessage("");
        try {
            const res = await getAllProducts();
            setProducts(res.products || []); // adjust based on backend response
        } catch (err) {
            console.log("Error fetching products:", err);
            setMessage(err.message || "Failed to load products ❌");
        } finally {
            setLoading(false);
        }
    };

    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.model}>Model: {item.model}</Text>
            <Text style={styles.price}>Price: ${item.price}</Text>
            <Text style={styles.category}>Category: {item.category}</Text>
            <Text style={styles.stock}>Stock: {item.stock}</Text>
            <Text style={styles.seller}>Seller: {item.sellerName}</Text>
        </View>
    );

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color="#28a745" />
            </View>
        );
    }

    if (message) {
        return (
            <View style={styles.center}>
                <Text style={styles.message}>{message}</Text>
            </View>
        );
    }

    return (
        <FlatList
            data={products}
            keyExtractor={(item) => item._id} // adjust based on backend
            renderItem={renderItem}
            contentContainerStyle={styles.listContainer}
        />
    );
};

const styles = StyleSheet.create({
    listContainer: {
        padding: 15,
        backgroundColor: "#f2f2f2",
    },
    card: {
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    name: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 5,
    },
    model: {
        fontSize: 14,
        marginBottom: 2,
    },
    price: {
        fontSize: 14,
        marginBottom: 2,
        color: "#28a745",
        fontWeight: "bold",
    },
    category: {
        fontSize: 14,
        marginBottom: 2,
    },
    stock: {
        fontSize: 14,
        marginBottom: 2,
    },
    seller: {
        fontSize: 14,
        marginBottom: 2,
        fontStyle: "italic",
    },
    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    message: {
        fontSize: 16,
        color: "red",
        textAlign: "center",
    },
});

export default ProductList;
