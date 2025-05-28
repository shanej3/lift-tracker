import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Calendar } from "react-native-calendars";
import { deleteData, getDayData, getUniqueWorkoutDays } from "./database.jsx";

import DayModal from '../components/DayModal.jsx';



export default function GymCalendar() {
    const [markedDates, setMarkedDates] = useState({});
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);

    const [dayData, setDayDayData] = useState([]);

    const dayPressed = async (day) => {
        const date = await day.dateString
        const data = await getDayData(date);

        setDayDayData(data || []);
        setSelectedDate(date);
        setModalVisible(true);
        //console.log("getDayDate", data)

}

    const onDeleteWorkout = async (workoutId) => {
        try {
            await deleteData(workoutId);
            setDayDayData(prev => prev.filter(workout => workout.id !== workoutId));
        } catch (error) {
            alert('Failed to delete workout.');
        }
    }

    useEffect(() => {
        async function fetchWorkoutDays() {
            const days = await getUniqueWorkoutDays();
             if (days) {
            // Convert array of "YYYY-MM-DD" to format required by Calendar
            const marked = {};
            days.forEach(day => {
            marked[day] = { marked: true };
            });
            setMarkedDates(marked);
      }
    }

      fetchWorkoutDays();
    }, []);


    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <Calendar 
        markedDates={markedDates}
        onDayPress={dayPressed}/>

        <DayModal
            visible={modalVisible}
            onClose={() => setModalVisible(false)}
            date={selectedDate}
            workouts={dayData || []}
            onDeleteWorkout={onDeleteWorkout}>

        </DayModal>

        </View>
        
    )
}