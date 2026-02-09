import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type Props = {
  id: string;
  title: string;
  difficulty: string;
  link: string;
  solved: boolean;
  onToggleSolved: () => void;
  onDelete: () => void;
};


export default function SortableQuestion({
  id,
  title,
  difficulty,
  link,
  solved,
  onToggleSolved,
  onDelete,
}: Props) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
        <div
    ref={setNodeRef}
    style={style}
    className="flex justify-between items-center bg-gray-950 border border-gray-700 px-3 py-2 rounded-lg"
    >
    {/* LEFT SIDE */}
    <div className="flex items-center gap-2">
        
        {/* Drag Handle ONLY */}
        <span
        {...attributes}
        {...listeners}
        className="cursor-grab text-gray-400 text-xs"
        >
        ☰
        </span>

        {/* Checkbox */}
        <input
        type="checkbox"
        checked={solved}
        onChange={onToggleSolved}
        className="w-4 h-4 accent-green-500"
        />

        {/* Title */}
        <span
        className={`text-sm font-medium ${
            solved ? "line-through text-gray-500" : ""
        }`}
        >
        {title}
        </span>

        {/* Difficulty */}
        <span className="text-xs px-2 py-0.5 rounded bg-gray-800 text-gray-300">
        {difficulty}
        </span>
    </div>

    {/* RIGHT SIDE */}
    <div className="flex items-center gap-3">
        <a
        href={link}
        target="_blank"
        rel="noreferrer"
        className="text-blue-400 hover:underline text-xs"
        >
        Open
        </a>

        <button
        onClick={onDelete}
        className="px-2 py-1 rounded bg-red-600 hover:bg-red-700 text-white text-xs"
        >
        ✕
        </button>
    </div>
    </div>

  );
}
