import type { Question } from "../types/sheet";

export default function QuestionItem({ question }: { question: Question }) {
    console.log(question.link);
    
  return (
    <div className="flex justify-between items-center border border-gray-700 px-3 py-2 rounded-lg bg-gray-900">
      {/* Title */}
      <span className="text-sm text-white">
        {question.title}
      </span>

      {/* Link */}
      <a
        href={question.link}
        
        target="_blank"
        rel="noreferrer"
        className="text-blue-400 hover:underline text-xs"
      >
        Open
      </a>
    </div>
  );
}
