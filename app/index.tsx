// START WORKOUT page

import { useRouter } from "expo-router";
import { Dimensions, Text, TouchableOpacity, View } from "react-native";


const windowHeight = Dimensions.get("window").height;

export default function Start() {
    const router = useRouter();

    return (
        <View>
            <TouchableOpacity style={styles.startButton} onPress={() => router.push("/main")}>
                <Text>Start Workout</Text>
                </TouchableOpacity>
            <Text></Text>
        </View>
    )
}

const styles = {
    startButton: {
        backgroundColor: "red",
        borderRadius: 10,
        padding: 20,
        margin: 10,
        height: windowHeight * 0.75,
        justifyContent: "center" as const,
        alignItems: "center" as const,
    }
}