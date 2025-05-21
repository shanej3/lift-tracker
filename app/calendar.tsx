import { Calendar } from "react-native-calendars";

const test = (day: any) => {
    console.log("Selected day", day);
    console.log("Selected day", day.dateString);
}

export default function GymCalendar() {
    return (
        <Calendar 
        markedDates={{
            '2025-05-22': {marked: true, dotColor: 'lightgreen', textColor: 'lightgreen'},
        }}
        onDayPress={test}/>
    );
}