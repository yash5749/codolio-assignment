import  {
  DndContext,
  closestCenter,
} from "@dnd-kit/core";
import type {DragEndEvent} from "@dnd-kit/core";

import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { useSheetStore } from "../store/sheetStore";
import TopicCard from "./TopicCard";
type Props = {
  search: string;
};

export default function TopicList({ search }: Props) {
  const topics = useSheetStore((s) => s.topics);
  const reorderTopics = useSheetStore((s) => s.reorderTopics);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) return;

    const oldIndex = topics.findIndex((t) => t.id === active.id);
    const newIndex = topics.findIndex((t) => t.id === over.id);

    reorderTopics(oldIndex, newIndex);
  }

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext
        items={topics}
        strategy={verticalListSortingStrategy}
      >
        {topics
            .map((topic) => {
                // Filter subtopics/questions by search
                const filteredSubtopics = topic.subtopics
                .map((sub) => ({
                    ...sub,
                    questions: sub.questions.filter((q) =>
                    q.title.toLowerCase().includes(search.toLowerCase())
                    ),
                }))
                .filter((sub) => sub.questions.length > 0 || search === "");

                return search === ""
                ? topic
                : { ...topic, subtopics: filteredSubtopics };
            })
            .filter((t) => t.subtopics.length > 0 || search === "")
            .map((topic) => (
                <TopicCard key={topic.id} topic={topic} />
        ))}

      </SortableContext>
    </DndContext>
  );
}
