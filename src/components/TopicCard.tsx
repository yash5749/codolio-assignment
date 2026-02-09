import { useState } from "react";
import type { Topic } from "../types/sheet";
import { useSheetStore } from "../store/sheetStore";
import SubTopicCard from "./SubTopicCard";
import {
  DndContext,
  closestCenter,
  
} from "@dnd-kit/core";
import type {DragEndEvent} from "@dnd-kit/core";

import { useSortable, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type Props = {
  topic: Topic;
};

export default function TopicCard({ topic }: Props) {
  const deleteTopic = useSheetStore((s) => s.deleteTopic);
  const addSubTopic = useSheetStore((s) => s.addSubTopic);
  const reorderSubTopics = useSheetStore((s) => s.reorderSubTopics);
  const [open, setOpen] = useState(false);

  const [subTitle, setSubTitle] = useState("");

  function handleAddSubTopic() {
    if (!subTitle.trim()) return;
    addSubTopic(topic.id, subTitle);
    setSubTitle("");
  }
  function handleSubDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) return;

    const oldIndex = topic.subtopics.findIndex((s) => s.id === active.id);
    const newIndex = topic.subtopics.findIndex((s) => s.id === over.id);
    if (oldIndex === -1 || newIndex === -1) return;
    if (oldIndex === newIndex) return;
    reorderSubTopics(topic.id, oldIndex, newIndex);
   }

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: topic.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const totalQuestions = topic.subtopics.reduce(
  (acc, s) => acc + s.questions.length,
  0
);

const solvedQuestions = topic.subtopics.reduce(
  (acc, s) => acc + s.questions.filter((q) => q.solved).length,
  0
);

const percent =
  totalQuestions === 0
    ? 0
    : Math.round((solvedQuestions / totalQuestions) * 100);


  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-gray-900 border border-gray-800 rounded-2xl p-6 mb-8"

    >
        {/* Progress */}
<div className="mt-3">
  <div className="flex justify-between text-xs text-gray-400 mb-1">
    <span>
      {solvedQuestions} / {totalQuestions} solved
    </span>
    <span>{percent}%</span>
  </div>

  <div className="w-full h-2 bg-gray-800 rounded">
    <div
      className="h-2 bg-green-500 rounded"
      style={{ width: `${percent}%` }}
    />
  </div>
</div>

      {/* HEADER */}
      <div className="flex justify-between items-center">
        
        <div
  className="flex items-center gap-2 cursor-grab"
  {...attributes}
  {...listeners}
>   
  <span className="text-gray-400">☰</span>
  
  <h2 className="font-bold text-lg">{topic.title}</h2>
  <span className="text-gray-400 text-sm">
  ({topic.subtopics.length} subtopics)
</span>

</div>


        <button
          onClick={() => deleteTopic(topic.id)}
          className="px-3 py-1 rounded bg-red-600 hover:bg-red-700 text-white text-xs"
        >
          Delete Topic
        </button>
      </div>

      {/* ADD SUBTOPIC INPUT */}
      <div className="flex gap-2 mt-3">
        <input
          value={subTitle}
          onChange={(e) => setSubTitle(e.target.value)}
          placeholder="Add new sub-topic..."
          className="border px-2 py-1 rounded w-full text-black"
        />

        <button
          onClick={handleAddSubTopic}
          className="bg-green-600 text-white px-3 rounded"
        >
          Add
        </button>
      </div>

      {/* SUBTOPICS */}

      <button
  onClick={() => setOpen(!open)}
  className="text-gray-400 text-sm"
>
  {open ? "Hide" : "Show"}
</button>

      {open && (
        <DndContext
  collisionDetection={closestCenter}
  onDragEnd={handleSubDragEnd}
>
  <SortableContext
    items={topic.subtopics.map((s) => s.id)}
    strategy={verticalListSortingStrategy}
  >
    <div className="ml-6 mt-6 space-y-4">
      {topic.subtopics.map((s) => (
        <SubTopicCard key={s.id} subtopic={s} topicId={topic.id} />
      ))}
    </div>
  </SortableContext>
</DndContext>
      )}

    </div>
  );
}
