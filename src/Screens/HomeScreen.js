import React from "react";
import { View, Text, StyleSheet } from "react-native";
import CallButton from "../Components/MakeCall";


export default function HomeScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Home Screen</Text>
            <Text style={styles.text}>Home Screen</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 24,
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: "space-between",
        alignItems: "center",
    },
    text: {
        color: "#333",
        fontSize: 24,
        fontWeight: "bold",
    },
});
