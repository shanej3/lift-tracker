import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Calendar } from "react-native-calendars";
import { addData, deleteData, getDayData, getUniqueWorkoutDays, updateData } from "./database.jsx";

import AddWorkoutModal from '../components/AddWorkoutModal.jsx';
import DayModal from '../components/DayModal.jsx';
import EditModal from '../components/EditModal.jsx';

export default function GymCalendar() {
    // markedDates show which days have workouts logged
    const [markedDates, setMarkedDates] = useState({});
    const [dayModalVisible, setDayModalVisible] = useState(false);
    const [editModalVisible, setEditModalVisible] = useState(false);

    const [addModalVisible, setAddModalVisible] = useState(false);

    const [selectedDate, setSelectedDate] = useState(null);
    const [dayData, setDayData] = useState([]);
    const [selectedWorkout, setSelectedWorkout] = useState(null);  // workout currently being edited

    // Called when a day on the calendar is pressed
    const handleDayPress = async (day) => {
        const date = day.dateString;
        const data = await getDayData(date);

        setDayData(data || []);
        setSelectedDate(date);
        setDayModalVisible(true);
    }

    // Delete workout handler
    const handleDeleteWorkout = async (workoutId) => {
        try {
            await deleteData(workoutId);
            // update the UI by removing the deleted workout
            setDayData(prev => prev.filter(workout => workout.id !== workoutId));
        } catch (error) {
            alert('Failed to delete workout.');
        }
    }

    const handleAddWorkout = async (newWorkout) => {
        try {
            await addData(
                selectedDate,
                newWorkout.summary,
                newWorkout.length
            );
            setDayData(prev => [
                ...prev,
                {
                    id: newWorkout.id, // assuming newWorkout has an id
                    date: selectedDate,
                    summary: newWorkout.summary,
                    length: newWorkout.length
                }
            ]);
        } catch (error) {
            alert('Failed to add workout.');
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
            await updateData(selectedWorkout.id, { // from database.js
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
                onDayPress={handleDayPress}
            />

            <DayModal
                visible={dayModalVisible}
                onClose={() => setDayModalVisible(false)}
                date={selectedDate}
                workouts={dayData || []}
                onDeleteWorkout={handleDeleteWorkout}
                onEditWorkout={handleEditPress} // pass the function to open EditModal
                onAddWorkout={() => setAddModalVisible(true)}  // pass the function to add new workout
            />

            {selectedWorkout && (  // only renders when there is a workout selected
                <EditModal
                    visible={editModalVisible}
                    onClose={() => setEditModalVisible(false)}
                    onSave={handleSaveEdit}  // pass save handler
                    initialData={selectedWorkout}  // pass workout to edit
                />
            )}
            <AddWorkoutModal
                visible={addModalVisible}
                onClose={() => setAddModalVisible(false)}
                onSave={handleAddWorkout}  // pass add handler
                ></AddWorkoutModal>
        </View>
    );
}
