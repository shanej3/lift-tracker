
import { useState } from "react";
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import LogWorkoutModal from "../components/LogWorkoutModal.jsx";
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

  const logWorkoutButton = (startTime: any, summaryText: string, totalTime: any) => {
    setTotalRunning(false);
    setRestRunning(false);
    // setTotalTime(0);
    // setRestTime(0);
    // setSets(0);
    // setTimerLength(0);
    // setTimerRunning(false);
    // setTimerStartTime(0);
    setModalVisible(false);

    // convert startTime to a date string
    const time = startTime;
    const date = new Date(time);
    const yearMonthDay = date.toLocaleDateString('en-CA');

    // convert totalTime to a string
    const totalSeconds = Math.floor(totalTime / 1000);
    const totalMinutes = Math.floor(totalSeconds / 60);
    const totalHours = Math.floor(totalMinutes / 60);
    const remainingSeconds = totalSeconds % 60;
    const remainingMinutes = totalMinutes % 60;
    const totalTimeString = `${totalHours.toString().padStart(2, '0')}:${remainingMinutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;

    addData(yearMonthDay, summaryText, totalTimeString);
    router.push("/calendar"); 
    
  }


  return (
    <ImageBackground
      resizeMode="cover"
      style={styles.background}
    >
      <View style={styles.container}>
        {/* Top Row */}
        <View style={styles.topRow}>
          <Stopwatch
            isRunning={totalIsRunning}
            time={totalTime}
            setTime={setTotalTime}
            size="small"
            startTime={totalStartTime}
          />

          <TouchableOpacity
            style={styles.stopButton}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.stopButtonText}>STOP</Text>
          </TouchableOpacity>

          <LogWorkoutModal
            visible={modalVisible}
            onClose={() => setModalVisible(false)}
            onSubmit={logWorkoutButton}
            initialStartTime={totalStartTime}
            totalTime={totalTime}
          />
          

          <View style={styles.adjustButtonsRow}>
            <TouchableOpacity onPress={minusButtonPressed} style={styles.adjustButton}>
              <Text style={styles.adjustButtonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.timerLengthText}>{timerLength * 30}</Text>
            <TouchableOpacity onPress={plusButtonPressed} style={styles.adjustButton}>
              <Text style={styles.adjustButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Middle Row */}
        <View style={styles.middleRow}>
          <Text style={styles.setsText}>{sets}</Text>

          {timerLength > 0 ? (
            <Timer
              isRunning={restIsRunning}
              time={restTime}
              setTime={setRestTime}
              size="large"
              startTime={restStartTime}
              duration={timerLength}
            />
          ) : (
            <Stopwatch
              isRunning={restIsRunning}
              time={restTime}
              setTime={setRestTime}
              size="large"
              startTime={restStartTime}
            />
          )}

          <TouchableOpacity style={styles.restButton} onPress={mainButtonPressed}>
            <Text style={styles.restButtonText}>REST</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.resetButton}
            onPress={() => {
              setRestRunning(false);
              setRestTime(0);
              setSets(0);
            }}
          >
            <Text style={styles.resetButtonText}>NEW</Text>
          </TouchableOpacity>
        </View>

        {/* Bottom Row */}
        <View style={styles.bottomRow} />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    flexDirection: "column",
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  topRow: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
  },
  stopButton: {
    backgroundColor: "#E74C3C",
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#C0392B",
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
  stopButtonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  modalBox: {
    backgroundColor: "white",
    width: "90%",
    maxWidth: 350,
    borderRadius: 15,
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    marginBottom: 15,
    textAlign: "center",
  },
  input: {
    width: "100%",
    height: 45,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 25,
    fontSize: 16,
  },
  modalButton: {
    backgroundColor: "#4A90E2",
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 10,
  },
  modalButtonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 18,
    textAlign: "center",
  },
  adjustButtonsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
  },
  adjustButton: {
    backgroundColor: "#7BBAFF",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    marginHorizontal: 15,
  },
  adjustButtonText: {
    fontSize: 24,
    color: "white",
    fontWeight: "700",
  },
  timerLengthText: {
    fontSize: 24,
    fontWeight: "700",
    color: "black",
  },
  middleRow: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  setsText: {
    fontSize: 80,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
    marginBottom: 25,
  },
  restButton: {
    backgroundColor: "#4A90E2",
    paddingVertical: 20,
    paddingHorizontal: 80,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#357ABD",
    marginVertical: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  restButtonText: {
    color: "white",
    fontSize: 22,
    fontWeight: "600",
    textAlign: "center",
  },
  resetButton: {
    backgroundColor: "#a1c5e6",
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 10,
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#7ea3cc",
    alignSelf: "center",
  },
  resetButtonText: {
    color: "#34495e",
    fontWeight: "600",
    fontSize: 18,
    textAlign: "center",
  },
  bottomRow: {
    flex: 0,
  },
});
