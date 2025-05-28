
import { generateUUID, getCurrentUserID, supabase } from "./supabase";

export async function getDayData(day) {

  const userId = await getCurrentUserID();
  if (!userId) {
    console.error("No user ID found. Cannot fetch workouts for the specific day.");
    return null;
  }
    const { data, error } = await supabase
      .from("workouts")
      .select('*')
      .eq('date', day)
      .eq('user_id', userId);

    if (error) {
      console.error("Error fetching workouts:", error);
      return null;
    } else {
      //console.log(data);
      return data
    }

}

export async function getAllData() {
  const userId = await getCurrentUserID();
  if (!userId) {
    console.error("No user ID found. Cannot fetch all workouts.");
    return null;
  }
    const { data: workouts, error } = await supabase
      .from("workouts")
      .select("*")
      .eq('user_id', userId);

    if (error) {
      console.error("Error fetching workouts:", error);
      return null
    } else {
      // console.log("Fetched workouts:", workouts);
      return workouts;
    }
}

export async function getUniqueWorkoutDays() {
  const { data, error } = await supabase
    .from("workouts")
    .select("date")
    .order("date", { ascending: true })
    .not('date', 'is', null);

  if (error) {
    console.error("Error fetching unique workout days:", error);
    return null;
  }

  const uniqueDaysSet = new Set();
  data.forEach(entry => {
    if (entry.date) {
      const day = new Date(entry.date).toISOString().split('T')[0];
      uniqueDaysSet.add(day);
    }
  });

  return Array.from(uniqueDaysSet);
}



export async function addData(dayEntry, summaryEntry, totalTime) {
  // CHECK
  const userId = await getCurrentUserID();
  if (!userId) {
    console.error("No user ID found. Cannot add workout.");
    return null;
  }
  const { data, error } = await supabase
    .from("workouts")
    .insert([
      {
        id: generateUUID(),
        user_id: userId,
        date: dayEntry,
        summary: summaryEntry,
        length: totalTime
      }
    ]);
  if (error) {
    console.error("Error adding workout:", error);
    return null;
  }
  console.log("Added workout:", data);
  return data;
}

export async function deleteData(workoutId) {
  const userId = await getCurrentUserID();
  if (!userId) {
    console.error("No user ID found. Cannot delete workout.");
    return null;
  }
  // CHECK
  const { data, error } = await supabase
    .from("workouts")
    .delete()
    .eq('id', workoutId)
    .eq('user_id', userId)
  if (error) {
    console.error("Error deleting workout:", error);
    return null;
  }
  return data;
}

export async function updateData(workoutId, {dayEntry, summaryEntry, totalTime }) {
  const userId = await getCurrentUserID();
  if (!userId) {
    console.error("No user ID found. Cannot update workout.");
    return null;
  }
  // CHECK
  const { data, error } = await supabase
    .from("workouts")
    .update({
      date: dayEntry,
      summary: summaryEntry,
      length: totalTime
    })
    .eq('id', workoutId)
    .eq('user_id', userId);
  
  if (error) {
    console.error("Error updating workout:", error);
    return null;
  }
  return data;
}