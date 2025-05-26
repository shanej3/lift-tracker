import data from "./local_storage.json";

export default function DatabaseHandler(dayEntry, summaryEntry, totalTime) {
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