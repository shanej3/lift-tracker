import { useRouter } from "expo-router";
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import 'react-native-url-polyfill/auto';

const windowHeight = Dimensions.get("window").height;

export default function Start() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.startButton} onPress={() => router.push("/main")}>
        <Text style={styles.buttonText}>Start Workout</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.calendarButton} onPress={() => router.push("/calendar")}>
        <Text style={styles.buttonText}>Logs</Text>
      </TouchableOpacity>
      {/* about button? */}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: windowHeight,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  startButton: {
    backgroundColor: "#4A90E2", 
    paddingVertical: 20,
    paddingHorizontal: 60,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#357ABD",
    marginBottom: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5, // shadow
  },
  calendarButton: {
    backgroundColor: "#7BBAFF",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#4A90E2",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  }
});
