import data from "./local_storage.json";

export default function DatabaseHandler(dayEntry, summaryEntry) {
    const newEntry = {
        date: dayEntry,
        summary: summaryEntry
    }
    data[newEntry.date] = newEntry;

    console.log(newEntry);
}