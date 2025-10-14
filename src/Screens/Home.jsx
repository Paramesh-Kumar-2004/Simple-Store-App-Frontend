import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from "react-native";
import CallButton from "../Components/CallButton";
import { getChars, logoutUser } from "../API/API";
import ProductList from "../Components/ProductList";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function HomeScreen({ navigation }) {

    const [userRole, setUserRole] = useState("normal")

    const logout = async () => {
        const response = await logoutUser()
        navigation.replace("Welcome")
    }

    useEffect(() => {
        getUserRole()
    }, []);


    const getUserRole = async () => {
        const role = await AsyncStorage.getItem("role");
        if (role) {
            setUserRole(role);
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.Head}>
                <Image
                    source={require("../assets/Logo.jpg")}
                    style={styles.Logo}
                />
                <TouchableOpacity onPress={logout}>
                    <Image style={styles.Logout}
                        source={require("../assets/Logout.jpg")}
                    />
                </TouchableOpacity>
            </View>

            <View style={styles.ProductItems}>
                <ProductList />
            </View>

            {userRole == "admin" && (
                <TouchableOpacity
                    style={styles.Registerbutton}
                    onPress={() => navigation.replace("AddProducts")}
                >
                    <Text style={styles.buttonText}>Add New Product</Text>
                </TouchableOpacity>
            )}

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 24,
        paddingHorizontal: 12,
        // flex: 1,
        backgroundColor: "#fff",
        justifyContent: "space-between",
        // alignItems: "center",
    },
    Logo: {
        width: 50,
        height: 50,
        borderRadius: 50,
    },
    Head: {
        marginTop: 24,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: 'center',
    },
    text: {
        color: "#333",
        fontSize: 24,
        fontWeight: "bold",
    },
    Logout: {
        width: 40,
        height: 40,
        borderRadius: 50,
    },
    Registerbutton: {
        backgroundColor: "#007BFF",
        paddingVertical: 14,
        borderRadius: 8,
        width: "100%",
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 18,
    },
    ProductItems: {
        height: "80%",
    }
});
