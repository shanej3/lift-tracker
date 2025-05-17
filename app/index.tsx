import { Text, TouchableOpacity, View } from "react-native";



export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <TouchableOpacity style={styles.mainButton} onPress={() => }>
        <Text
          style={styles.mainButtonText}>START</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = {
  mainButton: {
    backgroundColor: "lightblue",
    padding: 10,
    borderRadius: 5,
  },
  mainButtonText: {
    color: "black",
    fontSize: 32,
  },
};
