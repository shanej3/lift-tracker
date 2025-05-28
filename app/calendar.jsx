import { useEffect, useState } from 'react';
import { Calendar } from "react-native-calendars";
import { getDayData, getUniqueWorkoutDays } from "./database.jsx";

const dayPressed = (day) => {
    getDayData(day.dateString); // turn data into "YEAR-MONTH-DAY" format
    //getAllData();

}

export default function GymCalendar() {
    const [markedDates, setMarkedDates] = useState({});

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
        <Calendar 
        markedDates={markedDates}
        onDayPress={dayPressed}/>
    )
}