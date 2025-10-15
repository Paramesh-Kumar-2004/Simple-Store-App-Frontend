import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, ActivityIndicator } from "react-native";
import { createProduct } from "../API/API"; // your axios API


const AddProduct = ({ navigation }) => {
    const [formData, setFormData] = useState({
        name: "",
        model: "",
        price: "",
        category: "",
        description: "",
        stock: "",
        sellerName: "",
        sellerEmail: "",
        sellerPhone: "",
    });

    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    // Handle input changes
    const handleChange = (key, value) => {
        setFormData({ ...formData, [key]: value });
    };

    // Submit form
    const handleSubmit = async () => {
        setLoading(true);
        setMessage("");

        try {
            const res = await createProduct(formData); // send JSON, no FormData
            setMessage(res.message || "Product created successfully ✅");

            // Reset form
            setFormData({
                name: "",
                model: "",
                price: "",
                category: "",
                description: "",
                stock: "",
                sellerName: "",
                sellerEmail: "",
                sellerPhone: "",
            });
        } catch (err) {
            console.log("Error:", err);
            setMessage(err.message || "Failed to create product ❌");
        } finally {
            setLoading(false);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.heading}>Add New Product</Text>

            {Object.keys(formData).map(key => (
                <View key={key} style={styles.inputContainer}>
                    <Text style={styles.label}>{key}</Text>
                    <TextInput
                        style={styles.input}
                        placeholder={key}
                        value={formData[key]}
                        keyboardType={key === "price" || key === "stock" ? "numeric" : "default"}
                        onChangeText={text => handleChange(key, text)}
                    />
                </View>
            ))}

            <View style={{ flexDirection: "row", gap: 14 }}>
                <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={loading}>
                    {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Create Product</Text>}
                </TouchableOpacity>

                <TouchableOpacity style={styles.Backbutton} onPress={() => { navigation.replace("Home") }} >
                    <Text style={styles.buttonText}>Back</Text>
                </TouchableOpacity>
            </View>

            {message ? <Text style={styles.message}>{message}</Text> : null}

        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: "#f2f2f2",
        flexGrow: 1,
    },
    heading: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
    },
    inputContainer: {
        marginBottom: 15,
    },
    label: {
        fontSize: 14,
        marginBottom: 5,
        color: "#333",
        textTransform: "capitalize",
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 10,
        borderRadius: 6,
        backgroundColor: "#fff",
    },
    button: {
        backgroundColor: "#28a745",
        padding: 15,
        borderRadius: 6,
        alignItems: "center",
        marginTop: 10,
        flex: 1,
    },
    Backbutton: {
        backgroundColor: "red",
        padding: 15,
        borderRadius: 6,
        alignItems: "center",
        marginTop: 10,
        flex: 1,
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
    },
    message: {
        textAlign: "center",
        marginTop: 15,
        color: "#333",
        fontSize: 14,
    },
});

export default AddProduct;
