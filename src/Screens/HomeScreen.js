import React from "react";
import { View, Text, StyleSheet } from "react-native";
import CallButton from "../Components/MakeCall";


export default function HomeScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Home Screen</Text>
            <CallButton />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        color: "#333",
        fontSize: 24,
        fontWeight: "bold",
    },
});
