import data from "./local_storage.json";
import { supabase } from "./supabase";


export default function addWorkout(dayEntry, summaryEntry, totalTime) {
    const newEntry = {
        date: dayEntry,
        summary: summaryEntry,
        totalTime: totalTime
    }
    data[newEntry.date] = newEntry;

    console.log(newEntry);
}

export function getDayData() {
    console.log("getData called test");
}

export async function getAllData() {
    const { data: workouts, error } = await supabase
      .from("workouts")
      .select("*");

    if (error) {
      console.error("Error fetching workouts:", error);
    } else {
      console.log("Fetched workouts:", workouts);
    }
}