import { create } from "zustand";
import sheetData from "../data/sheet.json";
import { buildHierarchy } from "../utils/buildHierarchy";
import { arrayMove } from "../utils/arrayMove";
import type { Topic } from "../types/sheet";
import { persist } from "zustand/middleware";


type SheetStore = {
  topics: Topic[];

  // Topic CRUD
  addTopic: (title: string) => void;
  deleteTopic: (topicId: string) => void;

  // SubTopic CRUD
  addSubTopic: (topicId: string, title: string) => void;
  deleteSubTopic: (topicId: string, subTopicId: string) => void;

  // Question CRUD
  addQuestion: (topicId: string, subTopicId: string, title: string) => void;
  deleteQuestion: (
    topicId: string,
    subTopicId: string,
    questionId: string
  ) => void;

  toggleSolved: (
  topicId: string,
  subTopicId: string,
  questionId: string
) => void;


  // Reorder
  reorderTopics: (from: number, to: number) => void;
  reorderSubTopics: (topicId: string, from: number, to: number) => void;
  reorderQuestions: (topicId: string, subTopicId: string, from: number, to: number) => void;
  
};

export const useSheetStore = create<SheetStore>()(
  persist(
    (set) => ({
      topics: buildHierarchy(sheetData.data.questions),

      // ---------------- TOPIC CRUD ----------------
      addTopic: (title) =>
        set((state) => ({
          topics: [
            ...state.topics,
            {
              id: Date.now().toString(),
              title,
              subtopics: [],
            },
          ],
        })),

      deleteTopic: (topicId) =>
        set((state) => ({
          topics: state.topics.filter((t) => t.id !== topicId),
        })),

      // ---------------- SUBTOPIC CRUD ----------------
      addSubTopic: (topicId, title) =>
        set((state) => ({
          topics: state.topics.map((t) =>
            t.id === topicId
              ? {
                  ...t,
                  subtopics: [
                    ...t.subtopics,
                    {
                      id: Date.now().toString(),
                      title,
                      questions: [],
                    },
                  ],
                }
              : t
          ),
        })),

      deleteSubTopic: (topicId, subTopicId) =>
        set((state) => ({
          topics: state.topics.map((t) =>
            t.id === topicId
              ? {
                  ...t,
                  subtopics: t.subtopics.filter((s) => s.id !== subTopicId),
                }
              : t
          ),
        })),

      // ---------------- QUESTION CRUD ----------------
      addQuestion: (topicId, subTopicId, title) =>
        set((state) => ({
          topics: state.topics.map((t) =>
            t.id === topicId
              ? {
                  ...t,
                  subtopics: t.subtopics.map((s) =>
                    s.id === subTopicId
                      ? {
                          ...s,
                          questions: [
                            ...s.questions,
                            {
                              id: Date.now().toString(),
                              title,
                              difficulty: "Easy",
                              link: "#",
                              solved: false,
                            },
                          ],
                        }
                      : s
                  ),
                }
              : t
          ),
        })),

      deleteQuestion: (topicId, subTopicId, questionId) =>
        set((state) => ({
          topics: state.topics.map((t) =>
            t.id === topicId
              ? {
                  ...t,
                  subtopics: t.subtopics.map((s) =>
                    s.id === subTopicId
                      ? {
                          ...s,
                          questions: s.questions.filter(
                            (q) => q.id !== questionId
                          ),
                        }
                      : s
                  ),
                }
              : t
          ),
        })),

      // ---------------- REORDER TOPICS ----------------
      reorderTopics: (from, to) =>
        set((state) => ({
          topics: arrayMove(state.topics, from, to),
        })),

      // ---------------- REORDER SUBTOPICS ----------------
      reorderSubTopics: (topicId, from, to) =>
        set((state) => ({
          topics: state.topics.map((t) =>
            t.id === topicId
              ? {
                  ...t,
                  subtopics: arrayMove(t.subtopics, from, to),
                }
              : t
          ),
        })),

      // ---------------- REORDER QUESTIONS ----------------
      reorderQuestions: (topicId, subTopicId, from, to) =>
        set((state) => ({
          topics: state.topics.map((t) =>
            t.id === topicId
              ? {
                  ...t,
                  subtopics: t.subtopics.map((s) =>
                    s.id === subTopicId
                      ? {
                          ...s,
                          questions: arrayMove(s.questions, from, to),
                        }
                      : s
                  ),
                }
              : t
          ),
        })),

        // ---------------- TOGGLE SOLVED ----------------
toggleSolved: (topicId, subTopicId, questionId) =>
  set((state) => ({
    topics: state.topics.map((t) =>
      t.id === topicId
        ? {
            ...t,
            subtopics: t.subtopics.map((s) =>
              s.id === subTopicId
                ? {
                    ...s,
                    questions: s.questions.map((q) =>
                      q.id === questionId
                        ? { ...q, solved: !q.solved }
                        : q
                    ),
                  }
                : s
            ),
          }
        : t
    ),
  })),

    }),
    {
      name: "question-sheet-storage",
    }
  )
);


