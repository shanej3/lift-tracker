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

export async function getDayData(day) {
    const { data, error } = await supabase
      .from("workouts")
      .select('*')
      .eq('date', day);

    if (error) {
      console.error("Error fetching workouts:", error);
      return null;
    } else {
      //console.log(data);
      return data
    }

}

export async function getAllData() {
    const { data: workouts, error } = await supabase
      .from("workouts")
      .select("*");

    if (error) {
      console.error("Error fetching workouts:", error);
      return null
    } else {
      // console.log("Fetched workouts:", workouts);
      return workouts;
    }
}