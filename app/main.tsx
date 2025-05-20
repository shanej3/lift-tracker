
import { useState } from "react";
import { ImageBackground, Text, TouchableOpacity, View } from "react-native";

import Stopwatch from "../components/Stopwatch";
import Timer from "../components/Timer";


export default function Index() {
  // "rest" stopwatch/timer resets when hit rest button
  const [restIsRunning, setRestRunning] = useState(false);
  const [restTime, setRestTime] = useState(0);
  const [restStartTime, setRestStartTime] = useState(0);
  // "total" stopwatch/timer is supposed to run for the entire workout
  const [totalIsRunning, setTotalRunning] = useState(true);
  const [totalTime, setTotalTime] = useState(0);
  const [totalStartTime, setTotalStartTime] = useState(Date.now());

  // each time you rest, you finish/add a set
  const [sets, setSets] = useState(0);

  // starts at 0 (disabled), increments by 30 sec whenver user wishes
  const [timerLength, setTimerLength] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [timerStartTime, setTimerStartTime] = useState(0);

  const mainButtonPressed = () => {
    setRestRunning(true); 
    setSets(sets + 1);
    setRestTime(0);
    setRestStartTime(Date.now());
  }

  const plusButtonPressed = () => {
    setTimerLength(timerLength + 1);
    console.log("Timer length: " + timerLength);
  }
  const minusButtonPressed = () => {
    if (timerLength > 0) {
      setTimerLength(timerLength - 1);
      console.log("timer length: " + timerLength);
    }
  }


  return (
    <ImageBackground
      source={require("../assets/background.png")}
      resizeMode="cover"
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}>
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
  
        
        <TouchableOpacity onPress={plusButtonPressed}>
          <Text
            style={styles.mainButtonText}>+</Text>
        </TouchableOpacity>
        <Text>{timerLength * 30}</Text>
        <TouchableOpacity onPress={minusButtonPressed}>
          <Text
            style={styles.mainButtonText}>-</Text>
        </TouchableOpacity>
      </View>

{/* middle row */}
      <View
      style={{
        flex: 3}}>

        <Text style={styles.setsText}>{sets}</Text>

        {timerLength > 0 ? 
        <Timer isRunning={restIsRunning} time={restTime} setTime={setRestTime} size="large" startTime={restStartTime} duration={timerLength} />
        : 
        <Stopwatch isRunning={restIsRunning} time={restTime} setTime={setRestTime} size="large" startTime={restStartTime} />
        
        }



        {/* rest button */}
        <TouchableOpacity style={styles.mainButton} onPress={() => { 
          mainButtonPressed();
          
          }}>
          <Text
            style={styles.mainButtonText}>REST</Text>
        </TouchableOpacity>

        {/* reset button */}
        <TouchableOpacity style={styles.resetButton} onPress={() => {
          setRestRunning(false);
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
    </ImageBackground>
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
    backgroundColor: "#a1c5e6",
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
