import { useState } from "react";
import TopicList from "../components/TopicList";
import { useSheetStore } from "../store/sheetStore";

export default function SheetPage() {
  const addTopic = useSheetStore((s) => s.addTopic);
  const topics = useSheetStore((s) => s.topics);


  const [title, setTitle] = useState("");
  const [search, setSearch] = useState("");

  function handleAdd() {
    if (!title.trim()) return;
    addTopic(title);
    setTitle("");
  }
  function handleExport() {
  const blob = new Blob(
    [JSON.stringify(topics, null, 2)],
    { type: "application/json" }
  );

  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "sheet-export.json";
  a.click();
}


  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="max-w-5xl mx-auto px-6 py-10">
        {/* HEADER */}
        <h1 className="text-3xl font-semibold mb-2">
            Question Tracker Sheet
        </h1>
        <p className="text-gray-400 mb-8">
            Manage topics, subtopics and questions with drag & drop.
        </p>

        {/* CONTROLS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8">
          {/* Add Topic */}
          <div className="flex gap-2">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="New topic..."
              className="w-full px-3 py-2 rounded bg-gray-900 border border-gray-700 text-white"
            />

            <button
              onClick={handleAdd}
              className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 transition"
            >
              Add
            </button>
          </div>

          {/* Search */}
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search questions..."
            className="px-3 py-2 rounded bg-gray-900 border border-gray-700 text-white md:col-span-2"
          />
        {/* Export Button */}
        <button
          onClick={handleExport}
          className="bg-gray-800 hover:bg-gray-700 px-4 py-2 mx-1  rounded-lg text-sm"
        >
          Export JSON
        </button>
        </div>

        {/* SHEET LIST */}
        <TopicList search={search} />
      </div>
    </div>
  );
}
