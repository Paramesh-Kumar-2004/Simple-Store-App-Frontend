import React, { useEffect } from "react"
import { View, Text, StyleSheet } from "react-native"
import { getUsers } from "../API/UserAPI"

export default function HomeScreen() {
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await getUsers();
                console.log(res);
            } catch (error) {
                console.error(error);
            }
        };

        fetchUsers();
    }, []);

    return (
        <View style={styles.container}>
            <View>
                <Text>Fetching Users...</Text>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 24,
        paddingHorizontal: 20,
        backgroundColor: "pink"
    }
})