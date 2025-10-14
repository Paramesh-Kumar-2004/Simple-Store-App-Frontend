import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    ActivityIndicator,
    TouchableOpacity,
    TextInput
} from "react-native";
import { deleteProduct, getAllProducts } from "../API/API";
import CallButton from "./CallButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";



const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");
    const [userRole, setUserRole] = useState("normal")
    const [updateStack, setUpdateStack] = useState("")
    const [updateModal, setUpdateModal] = useState(true)


    useEffect(() => {
        fetchProducts();
        getUserRole()
    }, []);

    const getUserRole = async () => {
        const role = await AsyncStorage.getItem("role");
        if (role) {
            setUserRole(role);
        }
    }

    const fetchProducts = async () => {
        setLoading(true);
        setMessage("");
        try {
            const res = await getAllProducts();
            setProducts(res.products || []);
        } catch (err) {
            console.log("Error fetching products:", err);
            setMessage(err.message || "Failed to load products ❌");
        } finally {
            setLoading(false);
        }
    };

    async function HandleDeleteProduct(item) {
        console.log("ID", item._id)
        try {
            const response = await deleteProduct(item._id)
            console.log(response)
            Toast.show({
                type: "success",
                text1: "Product Deleted Successfully",
                position: "top",
            });
        } catch (error) {
            console.log(error)
        } finally {
            fetchProducts()
        }
    }

    async function HandleUpdateStack(id) {
        console.log(id)
    }

    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <Text style={styles.name}>{item.name}</Text>
            <View style={{ flex: 1, flexDirection: "row" }}>

                <View style={{ flex: 1 }}>
                    <Text style={styles.price}>Price: ${item.price}</Text>
                    <Text style={styles.model}>
                        <Text style={{ fontWeight: "bold" }}>Model: </Text>
                        {item.model}
                    </Text>
                    <Text style={styles.category}>
                        <Text style={{ fontWeight: "bold" }}>Category: </Text>
                        {item.category}
                    </Text>
                </View>

                <View style={{ flex: 1 }}>
                    <Text style={styles.stock}>
                        <Text style={{ fontWeight: "bold" }}>Stock: </Text>
                        {item.stock}
                    </Text>
                    <Text style={styles.seller}>
                        <Text style={{ fontWeight: "bold" }}>Seller: </Text>
                        {item.sellerName}
                    </Text>
                    <Text style={styles.seller}>
                        <Text style={{ fontWeight: "bold" }}>Phone: </Text>
                        {item.sellerPhone}
                    </Text>
                </View>

            </View>

            {userRole == "admin" && (
                <View style={styles.Buttons}>
                    <TouchableOpacity style={styles.UpdateStackButton}
                        onPress={() => {
                            setUpdateModal(!updateModal)
                            console.log(updateModal)
                        }}
                    >
                        <Text style={styles.UpdateStackButtonText}>Update Stack</Text>
                    </TouchableOpacity>
                </View>
            )}

            <View style={styles.Buttons}>
                {userRole == "admin" && (
                    <TouchableOpacity style={styles.DeleteButton}
                        onPress={() => HandleDeleteProduct(item)}
                    >
                        <Text style={styles.DeletebuttonText}>Delete</Text>
                    </TouchableOpacity>
                )}
                <CallButton />
            </View>
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
        <View>
            <FlatList
                data={products}
                keyExtractor={(item) => item._id}
                renderItem={renderItem}
                contentContainerStyle={styles.listContainer}
                showsVerticalScrollIndicator={false}
            />

            {updateModal && (
                <View style={styles.StackModal}>

                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Text style={{
                            fontSize: 18,
                            fontWeight: "bold",
                            margin: 5,
                        }}>Stack :</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter The Stack"
                            onChangeText={(text) => {
                                setUpdateStack(text)
                            }}
                        />
                    </View>

                    <View style={styles.Buttons}>

                        <TouchableOpacity style={styles.UpdateStackButton}
                            onPress={() => {
                                setUpdateModal(!updateModal)
                                console.log(updateModal)
                            }}
                        >
                            <Text style={styles.UpdateStackButtonText}>Update Stack</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.CloseStackButton}
                            onPress={() => {
                                setUpdateModal(!updateModal)
                                console.log(updateModal)
                            }}
                        >
                            <Text style={styles.UpdateStackButtonText}>Close</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    listContainer: {
        // padding: 10,
        // backgroundColor: "#f2f2f2",
        // borderRadius:10,
        // backgroundColor: "skyblue",
    },
    card: {
        backgroundColor: "#fff",
        borderColor: "skyblue",
        borderWidth: 1,
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
    Buttons: {
        justifyContent: "space-evenly",
        alignItems: "center",
        flexDirection: "row",
        flex: 1,
        width: "100%"
    }
    ,
    DeleteButton: {
        backgroundColor: "red",
        padding: 12,
        borderRadius: 8,
        width: "50%",
        alignItems: "center",
    },
    DeletebuttonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 18,
    },
    UpdateStackButton: {
        backgroundColor: "skyblue",
        padding: 12,
        borderRadius: 8,
        // width: "40%",
        flex: 1,
        marginHorizontal: 12,
        alignItems: "center",
    },
    CloseStackButton: {
        backgroundColor: "red",
        marginVertical: 12,
        padding: 12,
        borderRadius: 8,
        // width: "40%",
        flex: 1,
        marginHorizontal: 12,
        alignItems: "center",
    },
    UpdateStackButtonText: {
        color: "white",
    },
    StackModal: {
        padding: 10,
        position: "absolute",
        top: 12,
        borderRadius: 12,
        backgroundColor: "lightgray",
        height: "50%",
        alignSelf: "center",
        alignItems: "center",
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 10,
        borderRadius: 6,
        backgroundColor: "#fff",
    },
});

export default ProductList;
