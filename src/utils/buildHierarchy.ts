import type { Topic } from "../types/sheet";

/**
 * Convert Codolio flat question array into:
 *
 * Topic[]
 *   └── SubTopic[]
 *         └── Question[]
 */
export function buildHierarchy(rawQuestions: any[]): Topic[] {
  const topicMap = new Map<string, Topic>();

  for (const item of rawQuestions) {
    // ---------------- SAFE FIELD EXTRACTION ----------------
    const topicTitle = item.topic ?? "Untitled Topic";
    const subTopicTitle = item.subTopic ?? "Untitled Subtopic";

    const questionDoc = item.questionId;

    const questionTitle =
      item.title ?? questionDoc?.name ?? "Untitled Question";

    const questionId = item._id ?? crypto.randomUUID();

    const problemUrl = questionDoc?.problemUrl ?? "#";
    const difficulty = questionDoc?.difficulty ?? "Unknown";

    const resource = item.resource ?? null;
    const solved = item.isSolved ?? false;

    // ---------------- CREATE TOPIC IF NOT EXISTS ----------------
    if (!topicMap.has(topicTitle)) {
      topicMap.set(topicTitle, {
        id: topicTitle, // stable key
        title: topicTitle,
        subtopics: [],
      });
    }

    const topicObj = topicMap.get(topicTitle)!;

    // ---------------- FIND / CREATE SUBTOPIC ----------------
    let subTopicObj = topicObj.subtopics.find(
      (s) => s.title === subTopicTitle
    );

    if (!subTopicObj) {
      subTopicObj = {
        id: `${topicTitle}-${subTopicTitle}`,
        title: subTopicTitle,
        questions: [],
      };

      topicObj.subtopics.push(subTopicObj);
    }

    // ---------------- PUSH QUESTION ----------------
    subTopicObj.questions.push({
      id: questionId,
      title: questionTitle,
      difficulty,
      link: problemUrl,
      resource,
      solved,
    });
  }

  return Array.from(topicMap.values());
}
