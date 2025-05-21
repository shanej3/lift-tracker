import data from "./local_storage.json";

export default function DatabaseHandler(dayEntry, summaryEntry) {
    const newEntry = {
        date: dayEntry,
        summaryEntry: summaryEntry
    }
    data[newEntry.date] = newEntry;
}