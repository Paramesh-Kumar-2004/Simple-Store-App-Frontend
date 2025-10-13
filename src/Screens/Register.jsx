import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
} from "react-native";
import Toast from "react-native-toast-message";
import { registerUser } from "../API/API";
import { useNavigation } from "@react-navigation/native";



export default function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigation = useNavigation();

    const handleRegister = async () => {
        if (!name || !email || !password) {
            Toast.show({
                type: "error",
                text1: "All fields are required!",
                position: "top",
            });
            return;
        }

        try {
            const data = { name, email, password };
            const response = await registerUser(data);

            Toast.show({
                type: "success",
                text1: "Registration Successful 🎉",
                position: "top",
            });

            console.log("Registered:", response);
            navigation.replace("Login"); // Go to Login after success
        } catch (error) {
            console.error("Register Error:", error);
            Toast.show({
                type: "error",
                text1: error.message || "Registration Failed",
                position: "top",
            });
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Create Account</Text>

            <TextInput
                style={styles.input}
                placeholder="Enter Name"
                value={name}
                onChangeText={setName}
            />

            <TextInput
                style={styles.input}
                placeholder="Enter Email"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
            />

            <TextInput
                style={styles.input}
                placeholder="Enter Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />

            <TouchableOpacity style={styles.button} onPress={handleRegister}>
                <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text style={styles.loginText}>
                    Already have an account?{" "}
                    <Text style={{ fontWeight: "bold", color: "#007bff" }}>Login</Text>
                </Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        paddingHorizontal: 24,
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#222",
        marginBottom: 30,
    },
    input: {
        width: "100%",
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        marginBottom: 15,
    },
    button: {
        backgroundColor: "#007bff",
        paddingVertical: 12,
        borderRadius: 8,
        width: "100%",
        alignItems: "center",
        marginTop: 10,
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 18,
    },
    loginText: {
        marginTop: 20,
        color: "#333",
        fontSize: 15,
    },
});
