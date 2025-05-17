
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

import Stopwatch from "../components/Stopwatch";


export default function Index() {
  // "rest" stopwatch/timer resets when hit rest button
  const [restIsRunning, setRunning] = useState(false);
  const [restTime, setRestTime] = useState(0);
  // "total" stopwatch/timer is supposed to run for the entire workout
  const [totalIsRunning, setTotalRunning] = useState(true);
  const [totalTime, setTotalTime] = useState(0);

  // each time you rest, you finish/add a set
  const [sets, setSets] = useState(0);

  
  

  const [timerTime, setTimerTime] = useState(0);


  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* How long entire workout has elapsed */}
      <Stopwatch isRunning={totalIsRunning} time={totalTime} setTime={setTotalTime} size="small"/>

      {/* <TouchableOpacity style ={styles.mainButton} onPress={() => 
      {
        setTimerTime(timerTime + 30000);
        console.log(timerTime);
      }}> 
      <Text>  +  </Text>
      </TouchableOpacity> */}

      {/* rest button */}
      <TouchableOpacity style={styles.mainButton} onPress={() => { 
        setRunning(true); 
        setSets(sets + 1);
        setRestTime(0);
        setTimerTime(timerTime);
        
        }}>
        <Text
          style={styles.mainButtonText}>REST</Text>
      </TouchableOpacity>

      {/* reset button */}
      <TouchableOpacity style={styles.mainButton} onPress={() => {
        setRunning(false);
        setRestTime(0);
        setSets(0); 
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
