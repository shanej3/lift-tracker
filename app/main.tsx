
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

import Stopwatch from "../components/Stopwatch";


export default function Index() {
  // "rest" stopwatch/timer resets when hit rest button
  const [restIsRunning, setRunning] = useState(false);
  const [restTime, setRestTime] = useState(0);
  const [restStartTime, setRestStartTime] = useState(0);
  // "total" stopwatch/timer is supposed to run for the entire workout
  const [totalIsRunning, setTotalRunning] = useState(true);
  const [totalTime, setTotalTime] = useState(0);
  const [totalStartTime, setTotalStartTime] = useState(Date.now());

  // each time you rest, you finish/add a set
  const [sets, setSets] = useState(0);


  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column"
      }}
    >

{/* top row */}
      <View 
      style={{
        flex: 1,
        }}>
        <Stopwatch isRunning={totalIsRunning} time={totalTime} setTime={setTotalTime} size="small" startTime={totalStartTime}/>
      </View>
{/* middle row */}
      <View
      style={{
        flex: 3}}>

        <Text style={styles.setsText}>{sets}</Text>

        <Stopwatch isRunning={restIsRunning} time={restTime} setTime={setRestTime} size="large" startTime={restStartTime} />
        
        {/* rest button */}
        <TouchableOpacity style={styles.mainButton} onPress={() => { 
          setRunning(true); 
          setSets(sets + 1);
          setRestTime(0);
          setRestStartTime(Date.now());
          }}>
          <Text
            style={styles.mainButtonText}>REST</Text>
        </TouchableOpacity>

        {/* reset button */}
        <TouchableOpacity style={styles.resetButton} onPress={() => {
          setRunning(false);
          setRestTime(0);
          setSets(0); 
        }}>
          <Text>NEW</Text>
        </TouchableOpacity>
        
        
      </View>
{/* bottom row */}
        <View style={{
          flex: 1,
        }}></View>
      
      
      
    </View>
  );
}

const styles = {
  mainButton: {
    backgroundColor: "lightblue",
    paddingLeft: 100,
    paddingRight: 100,
    paddingTop: 50,
    paddingBottom: 50,
    borderRadius: 5,
    alignSelf: "center" as const,
    borderWidth: 1,
  },
  resetButton: {
    backgroundColor: "pink",
    paddingLeft: 50,
    paddingRight: 50,
    paddingTop: 25,
    paddingBottom: 25,
    borderRadius: 5,
    marginTop: 20,
    alignSelf: "center" as const,
    borderWidth: 1,
  },

  mainButtonText: {
    color: "black",
    fontSize: 32,
  },
  setsText: {
    fontSize: 100,
    fontWeight: 'bold' as 'bold',
    color: "black",
    textAlign: "center" as const,
    marginTop: 50,
  }
};
