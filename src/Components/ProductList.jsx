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
    const [updateModal, setUpdateModal] = useState(false)
    const [selectedProductId, setSelectedProductId] = useState(null);


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

    async function HandleUpdateProduct() {
        if (!updateStack || !selectedProductId) {
            Toast.show({
                type: "error",
                text1: "Please enter stock value",
                position: "top",
            });
            return;
        }

        try {
            const response = await updateProduct(selectedProductId, { stock: updateStack })
            console.log("Updated Product:", response);

            Toast.show({
                type: "success",
                text1: "Stock Updated Successfully",
                position: "top",
            });

            fetchProducts();
        } catch (error) {
            console.log("Update Error:", error);
            Toast.show({
                type: "error",
                text1: "Failed to update stock",
                position: "top",
            });
        } finally {
            setUpdateModal(false);
            setUpdateStack("");
            setSelectedProductId(null);
        }
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

            <View style={{ alignItems: "center", marginTop: 12 }}>
                {userRole == "admin" && (
                    <View style={styles.Buttons}>

                        {/* Update Stock Button */}
                        <TouchableOpacity style={styles.UpdateStackButton}
                            onPress={() => {
                                setSelectedProductId(item._id);
                                setUpdateModal(!updateModal)
                                console.log(updateModal)
                            }}
                        >
                            <Text style={styles.UpdateStackButtonText}>Update</Text>
                        </TouchableOpacity>


                        {/* Product Delete Button */}
                        <TouchableOpacity style={styles.DeleteButton}
                            onPress={() => HandleDeleteProduct(item)}
                        >
                            <Text style={styles.DeletebuttonText}>Delete</Text>
                        </TouchableOpacity>

                    </View>
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
                    <View style={{ backgroundColor: "white", padding: 20, borderRadius: 12, width: "80%", height: "50%", alignItems: "center", justifyContent: "space-around" }}>

                        <Text style={{
                            fontSize: 18,
                            fontWeight: "bold",
                            marginBottom: 10,
                            textAlign: "center"
                        }}>
                            Update Stock
                        </Text>

                        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 20 }}
                        >
                            <Text style={{ fontSize: 16, fontWeight: "bold", marginRight: 8 }}>Stock:</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter new stock"
                                keyboardType="numeric"
                                value={updateStack}
                                onChangeText={setUpdateStack}
                            />
                        </View>

                        <View style={styles.Buttons}>
                            <TouchableOpacity
                                style={styles.UpdateModalBtn}
                                onPress={HandleUpdateProduct}
                            >
                                <Text style={styles.ModalBtnText}>Update Stock</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.ModalCloseBtn}
                                onPress={() => setUpdateModal(false)}
                            >
                                <Text style={styles.ModalBtnText}>Close</Text>
                            </TouchableOpacity>
                        </View>

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
        flexWrap: "nowrap",
        justifyContent: "space-around",
        gap: 12,
        alignItems: "center",
        flexDirection: "row",
        flex: 1,
        width: "100%",
        // backgroundColor: "pink",
    },
    DeleteButton: {
        backgroundColor: "red",
        padding: 12,
        borderRadius: 8,
        minWidth: 100,
        flex: 1,
        alignItems: "center",
    },
    DeletebuttonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 18,
    },
    UpdateStackButton: {
        backgroundColor: "blue",
        padding: 12,
        borderRadius: 8,
        minWidth: 100,
        flex: 1,
        alignItems: "center",
    },
    UpdateStackButtonText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 18,
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
    StackModal: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.2)",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 10,
    },
    UpdateModalBtn: {
        backgroundColor: "green",
        padding: 12,
        borderRadius: 8,
        flex: 1,
        alignItems: "center",
        marginHorizontal: 5,
    },
    ModalCloseBtn: {
        backgroundColor: "red",
        padding: 12,
        borderRadius: 8,
        flex: 1,
        alignItems: "center",
        marginHorizontal: 5,
    },
    ModalBtnText: {
        textAlign: "center",
        color: "white",
        fontWeight: "bold",
        fontSize: 14,
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
