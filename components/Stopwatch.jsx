import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Stopwatch({ isRunning, time, setTime}) {

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
      setTime(prev => prev + 10); // increase by 10ms every 10ms
    }, 10);
    }

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (time) => {
    const ms = ('0' + Math.floor((time % 1000) / 10)).slice(-2);
    const secs = ('0' + Math.floor((time / 1000) % 60)).slice(-2);
    const mins = ('0' + Math.floor(time / 60000)).slice(-2);
    return `${mins}:${secs}:${ms}`;
  };

    return (
        <View>
            <Text style={styles.time}>{formatTime(time)}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    time: {
        fontSize: 48,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 20,
    },
});