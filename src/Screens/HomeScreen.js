import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import CallButton from "../Components/MakeCall";


export default function HomeScreen() {
    return (
        <View style={styles.container}>
            <View style={styles.Head}>
                <Image
                    source={require("../assets/Logo.jpg")}
                    style={styles.Logo}
                />
            </View>

            <View>
                <Text style={styles.text}>Home Screen</Text>
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
    },
    text: {
        color: "#333",
        fontSize: 24,
        fontWeight: "bold",
    },
});
