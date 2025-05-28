
import { useState } from "react";
import { ImageBackground, Modal, Text, TextInput, TouchableOpacity, View } from "react-native";

import Stopwatch from "../components/Stopwatch.jsx";
import Timer from "../components/Timer.jsx";

import { router } from "expo-router";
import { addData } from "./database.jsx";

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

  //Modal 
  const [modalVisible, setModalVisible] = useState(false);
  const [summaryText, setSummaryText] = useState("");

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

  const logWorkout = (startTime: any, summaryText: string, totalTime: any) => {
    setTotalRunning(false);
    setRestRunning(false);
    // setTotalTime(0);
    // setRestTime(0);
    // setSets(0);
    // setTimerLength(0);
    // setTimerRunning(false);
    // setTimerStartTime(0);
    setModalVisible(true);

    // convert startTime to a date string
    const time = startTime;
    const date = new Date(time);
    const yearMonthDay = date.toISOString().split("T")[0];

    // convert totalTime to a string
    const totalSeconds = Math.floor(totalTime / 1000);
    const totalMinutes = Math.floor(totalSeconds / 60);
    const totalHours = Math.floor(totalMinutes / 60);
    const remainingSeconds = totalSeconds % 60;
    const remainingMinutes = totalMinutes % 60;
    const totalTimeString = `${totalHours.toString().padStart(2, '0')}:${remainingMinutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    

    //console.log(yearMonthDay);
    addData(yearMonthDay, summaryText, totalTimeString);
    router.push("/calendar")

    
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
  
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Text style={styles.mainButtonText}>STOP</Text>
        </TouchableOpacity>
        <Modal
          visible={modalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.overlay}>
            <View style={styles.box}>
              <Text>Would you like to log this exercise?</Text>
              <TextInput 
                style={styles.input}
                onChangeText={setSummaryText} 
                value={summaryText}
                placeholder="Workout summary">

              </TextInput>
              <TouchableOpacity onPress={() => logWorkout(totalStartTime, summaryText, totalTime)}>
                <Text>Yes</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

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
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center" as const,
    alignItems: "center" as const,
  },
  box: {
    width: 300,
    height: 300,
    backgroundColor: "white",
    borderRadius: 10,
    justifyContent: "center" as const,
    alignItems: "center" as const,
    marginBottom: 250,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    width: 200,}
};
