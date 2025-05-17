import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

import Stopwatch from "../components/Stopwatch";


export default function Index() {

  const [restIsRunning, setRunning] = useState(false);
  const [totalIsRunning, setTotalRunning] = useState(true);

  const [sets, setReps] = useState(0);

  const [restTime, setRestTime] = useState(0);
  const [totalTime, setTotalTime] = useState(0);

  const [timerTime, setTimerTime] = useState(0);


  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Stopwatch isRunning={totalIsRunning} time={totalTime} setTime={setTotalTime} size="small"/>

      <TouchableOpacity style ={styles.mainButton} onPress={() => 
      {
        setTimerTime(timerTime + 30000);
        console.log(timerTime);
      }}> 
      <Text>  +  </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.mainButton} onPress={() => { 
        setRunning(true); 
        setReps(sets + 1);
        setRestTime(0);
        setTimerTime(timerTime);
        
        }}>
        <Text
          style={styles.mainButtonText}>REST</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.mainButton} onPress={() => {
        setReps(0); 
      }}>
        <Text>RESET</Text>
      </TouchableOpacity>
      <Text>{restIsRunning ? 'Running' : 'stopped'}</Text>
      <Text>{sets}</Text>
      <Stopwatch isRunning={restIsRunning} time={restTime} setTime={setRestTime} size="large" />
      
      
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
