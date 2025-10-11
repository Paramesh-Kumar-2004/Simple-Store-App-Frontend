import React, { useEffect } from "react"
import { View, Text } from "react-native"
import { getUsers } from "../API/UserAPI"

export default function HomeScreen() {
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = "YOUR_JWT_TOKEN";
                const res = await getUsers(token);
                console.log(res);
            } catch (error) {
                console.error(error);
            }
        };

        fetchUsers();
    }, []);

    return (
        <View>
            <Text>Fetching Users...</Text>
        </View>
    );
}
