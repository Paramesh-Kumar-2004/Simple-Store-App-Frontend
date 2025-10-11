import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

export default function WelcomeScreen({ navigation }) {
    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.replace("Home");
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Welcome 👋</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#2196F3",
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        color: "#fff",
        fontSize: 32,
        fontWeight: "bold",
    },
});