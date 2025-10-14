import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import Toast from "react-native-toast-message";
import AsyncStorage from '@react-native-async-storage/async-storage';


import { loginUser } from "../API/API";


export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState("vp@gmail.com");
    const [password, setPassword] = useState("2004");
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert("Error", "Please enter all fields");
            return;
        }

        try {
            setLoading(true);
            const data = await loginUser({ email, password });
            console.log("Login Success:", data);
            Toast.show({
                type: "success",
                text1: "Log In successfull!",
                position: "top",
            });
            const userRole = await AsyncStorage.setItem('role', data.role);
            navigation.replace("Home")
        } catch (error) {
            console.log("Login Error:", error);
            Toast.show({
                type: "error",
                text1: "Failed to login!",
                position: "top",
            });
            // Alert.alert("Login Failed", error.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>

            <TextInput
                style={styles.input}
                placeholder="Enter Email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
            />

            <TextInput
                style={styles.input}
                placeholder="Enter Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            <TouchableOpacity
                style={[styles.button, loading && { opacity: 0.6 }]}
                onPress={handleLogin}
                disabled={loading}
            >
                <Text style={styles.buttonText}>
                    {loading ? "Logging in..." : "Login"}
                </Text>
            </TouchableOpacity>
            <Text style={styles.registerPart}>
                Don't Have Account
                <Text
                    style={styles.registerButton}
                    onPress={() => navigation.replace("Register")}
                > Register</Text> Here
            </Text>
        </View>
    );
}

// Simple, neat styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        padding: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 30,
        color: "#333",
    },
    input: {
        width: "100%",
        height: 50,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 15,
        marginBottom: 15,
        fontSize: 16,
    },
    button: {
        // backgroundColor: "#007BFF",
        backgroundColor: "green",
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
    registerPart: {
        marginTop: 12,
        fontSize: 14
    },
    registerButton: {
        color: "blue"
    }
});
