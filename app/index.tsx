import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

import Stopwatch from "../components/Stopwatch";


export default function Index() {

  const [isRunning, setRunning] = useState(false);
  const [reps, setReps] = useState(0);

  const [time, setTime] = useState(0);


 
  
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <TouchableOpacity style={styles.mainButton} onPress={() => { 
        setRunning(true); 
        setReps(reps + 1);
        setTime(0);
        
        }}>
        <Text
          style={styles.mainButtonText}>REST</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.mainButton} onPress={() => {
        setReps(0); 
      }}>
        <Text>RESET</Text>
      </TouchableOpacity>
      <Text>{isRunning ? 'Running' : 'stopped'}</Text>
      <Text>{reps}</Text>
      <Stopwatch isRunning={isRunning} time={time} setTime={setTime} />
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
