import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Calendar } from "react-native-calendars";
import { deleteData, getDayData, getUniqueWorkoutDays, updateData } from "./database.jsx";

import DayModal from '../components/DayModal.jsx';
import EditModal from '../components/EditModal.jsx';

export default function GymCalendar() {
    const [markedDates, setMarkedDates] = useState({});
    const [dayModalVisible, setDayModalVisible] = useState(false);
    const [editModalVisible, setEditModalVisible] = useState(false);

    const [selectedDate, setSelectedDate] = useState(null);
    const [dayData, setDayData] = useState([]);
    const [selectedWorkout, setSelectedWorkout] = useState(null);  // workout currently being edited

    // Called when a day on the calendar is pressed
    const dayPressed = async (day) => {
        const date = day.dateString;
        const data = await getDayData(date);

        setDayData(data || []);
        setSelectedDate(date);
        setDayModalVisible(true);
    }

    // Delete workout handler
    const onDeleteWorkout = async (workoutId) => {
        try {
            await deleteData(workoutId);
            setDayData(prev => prev.filter(workout => workout.id !== workoutId));
        } catch (error) {
            alert('Failed to delete workout.');
        }
    }

    // Called when Edit button is pressed in DayModal
    const handleEditPress = (workoutId) => {
        const workoutToEdit = dayData.find(w => w.id === workoutId);
        setSelectedWorkout(workoutToEdit);
        setEditModalVisible(true);
    }

    // Called when Save is pressed in EditModal
    const handleSaveEdit = async (updatedData) => {
        try {
            await await updateData(selectedWorkout.id, { // from database.js
                dayEntry: selectedWorkout.date,
                summaryEntry: updatedData.summary,
                totalTime: updatedData.length
});

            // Update local dayData with updated workout
            setDayData(prev => prev.map(w =>
                w.id === selectedWorkout.id ? { ...w, ...updatedData } : w
            ));
        } catch (error) {
            alert('Failed to edit workout.');
        }
        setEditModalVisible(false);
        setSelectedWorkout(null);
    }

    useEffect(() => {
        async function fetchWorkoutDays() {
            const days = await getUniqueWorkoutDays();
            if (days) {
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
                onDayPress={dayPressed}
            />

            <DayModal
                visible={dayModalVisible}
                onClose={() => setDayModalVisible(false)}
                date={selectedDate}
                workouts={dayData || []}
                onDeleteWorkout={onDeleteWorkout}
                onEditWorkout={handleEditPress} // pass the function to open EditModal
            />

            {selectedWorkout && (  // only renders when there is a workout selected
                <EditModal
                    visible={editModalVisible}
                    onClose={() => setEditModalVisible(false)}
                    onSave={handleSaveEdit}  // pass save handler
                    initialData={selectedWorkout}  // pass workout to edit
                />
            )}
        </View>
    );
}
