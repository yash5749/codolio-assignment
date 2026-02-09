import { useState } from "react";
import type { SubTopic } from "../types/sheet";
import { useSheetStore } from "../store/sheetStore";
import {
  DndContext,
  closestCenter,
  
} from "@dnd-kit/core";
import type {DragEndEvent} from "@dnd-kit/core";

import { useSortable, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import SortableQuestion from "./SortableQuestion";

type Props = {
  subtopic: SubTopic;
  topicId: string;
};

export default function SubTopicCard({ subtopic, topicId }: Props) {
  const reorderQuestions = useSheetStore((s) => s.reorderQuestions);
  const deleteSubTopic = useSheetStore((s) => s.deleteSubTopic);
  const addQuestion = useSheetStore((s) => s.addQuestion);
  const deleteQuestion = useSheetStore((s) => s.deleteQuestion);
  const toggleSolved = useSheetStore((s) => s.toggleSolved);
  const [open, setOpen] = useState(false);

  const [qTitle, setQTitle] = useState("");
  function handleQuestionDragEnd(event: DragEndEvent) {
  const { active, over } = event;
  if (!over) return;

  const oldIndex = subtopic.questions.findIndex((q) => q.id === active.id);
  const newIndex = subtopic.questions.findIndex((q) => q.id === over.id);

  if (oldIndex === -1 || newIndex === -1) return;
  if (oldIndex === newIndex) return;

  reorderQuestions(topicId, subtopic.id, oldIndex, newIndex);
}

  // ✅ Hook MUST be inside component
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: subtopic.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  function handleAddQuestion() {
    if (!qTitle.trim()) return;
    addQuestion(topicId, subtopic.id, qTitle);
    setQTitle("");
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-gray-800 border border-gray-700 rounded-xl p-4 mt-4"
    >
      {/* SUBTOPIC HEADER (Drag Handle) */}
      <div className="flex justify-between items-center">
        <div
  className="flex items-center gap-2 cursor-grab"
  {...attributes}
  {...listeners}
>
  <span className="text-gray-400 text-xs">☰</span>
  <h3 className="font-semibold text-sm">{subtopic.title}</h3>
</div>


        <button
          onClick={() => deleteSubTopic(topicId, subtopic.id)}
          className="px-2 py-1 rounded bg-red-600 hover:bg-red-600 text-white text-xs"
        >
          x
        </button>
      </div>

      {/* ADD QUESTION INPUT */}
      <div className="flex gap-2 mt-2">
        <input
          value={qTitle}
          onChange={(e) => setQTitle(e.target.value)}
          placeholder="Add new question..."
          className="border px-2 py-1 rounded w-full text-black text-sm"
        />

        <button
          onClick={handleAddQuestion}
          className="bg-green-600 text-white px-3 rounded text-sm"
        >
          Add
        </button>
      </div>

      {/* QUESTIONS LIST */}
      {/* QUESTIONS DRAG + DROP */}

      <button
  onClick={() => setOpen(!open)}
  className="text-gray-400 text-sm"
>
  {open ? "Hide" : "Show"}
</button> 
        {open && (
            <DndContext
        collisionDetection={closestCenter}
        onDragEnd={handleQuestionDragEnd}
        >
        <SortableContext
            items={subtopic.questions.map((q) => q.id)}
            strategy={verticalListSortingStrategy}
        >
            <div className="ml-6 mt-4 space-y-3">
            {subtopic.questions.map((q) => (
                <SortableQuestion
                    key={q.id}
                    id={q.id}
                    title={q.title}
                    difficulty={q.difficulty}
                    link={q.link}
                    solved={q.solved}
                    onToggleSolved={() => {
                        toggleSolved(topicId, subtopic.id, q.id)
                    }}
                    onDelete={() =>
                        deleteQuestion(topicId, subtopic.id, q.id)
                    }
                    />

            ))}
            </div>
        </SortableContext>
        </DndContext>
        )}
        
    </div>
  );
}
