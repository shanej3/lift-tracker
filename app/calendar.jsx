import { Calendar } from "react-native-calendars";
import { getAllData, getDayData } from "./database.jsx";
import data from "./local_storage.json";

const test = (day) => {
    console.log("Selected day", day);
    getDayData();
    getAllData()

}

export default function GymCalendar() {

    const markedDates = Object.keys(data).reduce((acc, key) => {
        // Object.keys(data) returns an array of IDs [1, 2 , 3, ...]
        // .reduce goes through each and builds a new object
        // we want to map over the dates and create objects like "date: {marked: true, dotColor: 'lightgreen', textColor: 'lightgreen'}"
        const entry = data[key];
        const date = entry.date;
        acc[date] = {  // acc = accumulator
            marked: true,
            dotColor: 'lightgreen',
            textColor: 'lightgreen'
        };
        return acc;
    }, {}); // initial value is an empty object
    return (
        <Calendar 
        markedDates={markedDates}
        onDayPress={test}/>
    );
}