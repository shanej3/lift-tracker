// START WORKOUT page
import 'react-native-url-polyfill/auto';

import { useRouter } from "expo-router";
import { Dimensions, Text, TouchableOpacity, View } from "react-native";





const windowHeight = Dimensions.get("window").height;

export default function Start() {
    const router = useRouter();

    return (
        <View style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            height: windowHeight,
            backgroundColor: "white"
        }}>
            <TouchableOpacity style={styles.startButton} onPress={() => router.push("/main")}>
                <Text>Start Workout</Text>
                </TouchableOpacity>
            <TouchableOpacity style={styles.calendarButton} onPress={() => router.push("/calendar")}>
                <Text>Calendar</Text>
            </TouchableOpacity>
            
        </View>
    )
}

const styles = {
    startButton: {
        backgroundColor: "lightblue",
        paddingLeft: 100,
        paddingRight: 100,
        paddingTop: 250,
        paddingBottom: 250,
        borderRadius: 5,
        alignSelf: "center" as const,
        borderWidth: 1,
    },
    calendarButton: {
        backgroundColor: "lightblue",
        paddingLeft: 25,
        paddingRight: 25,
        paddingTop: 25,
        paddingBottom: 25,
        borderRadius: 5,
        alignSelf: "center" as const,
        borderWidth: 1,
    }
}