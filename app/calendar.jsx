import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Calendar } from "react-native-calendars";
import { getDayData, getUniqueWorkoutDays } from "./database.jsx";

import DayModal from '../components/DayModal.jsx';



export default function GymCalendar() {
    const [markedDates, setMarkedDates] = useState({});
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [summary, setSummary] = useState(null);
    const [length, setLength] = useState(null);

    const dayPressed = async (day) => {
        const date = day.dateString
        const data = await getDayData(day.dateString);
        setSelectedDate(date);
        setModalVisible(true);

        if (data && data.length > 0) {
            setSummary(data[0].summary);
            setLength(data[0].length);
        }
        else {
            setSummary(null);
            setLength(null);
        }



        //getAllData();

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
            summary={summary}
            length={length}>

            </DayModal>

        </View>
        
    )
}