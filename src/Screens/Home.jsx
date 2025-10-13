import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from "react-native";
import CallButton from "../Components/MakeCall";
import { getChars, logoutUser } from "../API/API";
import ProductList from "../Components/ProductList";


export default function HomeScreen({ navigation }) {

    const logout = async () => {
        const response = await logoutUser()
        navigation.replace("Welcome")
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

            <Text
                onPress={() => navigation.replace("AddProducts")}
            > Register</Text>


            <View>
                <ProductList />
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 24,
        flex: 1,
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
    }
});
