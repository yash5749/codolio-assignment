# Interactive Question Tracker Sheet

A single-page web application to manage a hierarchical question sheet (Topics → Subtopics → Questions) with full CRUD support, drag-and-drop reordering, solved tracking, progress visualization, search, and export features.

This project is inspired by Codolio-style question sheets.

---

## Features

### Core Requirements

- **Topics**
  - Add / Delete topics
  - Drag & drop reorder topics

- **Subtopics**
  - Add / Delete subtopics inside topics
  - Drag & drop reorder subtopics

- **Questions**
  - Add / Delete questions inside subtopics
  - Drag & drop reorder questions

---

### Bonus Improvements

- **Solved Tracker**
  - Mark questions as solved/unsolved
  - Solved questions show strike-through styling

- **Progress Bar**
  - Topic-level progress indicator  
    Example: `5 / 20 solved (25%)`

- **Search**
  - Search questions instantly across the sheet

- **Persistent Storage**
  - Sheet state is saved in browser localStorage using Zustand persist

- **Export**
  - Export full sheet structure as JSON (copy/download)

---

## Tech Stack

- **React + TypeScript**
- **Zustand** (state management)
- **Tailwind CSS** (UI styling)
- **@dnd-kit** (drag & drop)

---

## Project Structure

# Interactive Question Tracker Sheet

A single-page web application to manage a hierarchical question sheet (Topics → Subtopics → Questions) with full CRUD support, drag-and-drop reordering, solved tracking, progress visualization, search, and export features.

This project is inspired by Codolio-style question sheets.

---

## Features

### Core Requirements

- **Topics**
  - Add / Delete topics
  - Drag & drop reorder topics

- **Subtopics**
  - Add / Delete subtopics inside topics
  - Drag & drop reorder subtopics

- **Questions**
  - Add / Delete questions inside subtopics
  - Drag & drop reorder questions

---

### Bonus Improvements

- **Solved Tracker**
  - Mark questions as solved/unsolved
  - Solved questions show strike-through styling

- **Progress Bar**
  - Topic-level progress indicator  
    Example: `5 / 20 solved (25%)`

- **Search**
  - Search questions instantly across the sheet

- **Persistent Storage**
  - Sheet state is saved in browser localStorage using Zustand persist

- **Export**
  - Export full sheet structure as JSON (copy/download)

---

## Tech Stack

- **React + TypeScript**
- **Zustand** (state management)
- **Tailwind CSS** (UI styling)
- **@dnd-kit** (drag & drop)
- Optional: **jsPDF** (PDF export)

---

## Project Structure

# Interactive Question Tracker Sheet

A single-page web application to manage a hierarchical question sheet (Topics → Subtopics → Questions) with full CRUD support, drag-and-drop reordering, solved tracking, progress visualization, search, and export features.

This project is inspired by Codolio-style question sheets.

---

## Features

### Core Requirements

- **Topics**
  - Add / Delete topics
  - Drag & drop reorder topics

- **Subtopics**
  - Add / Delete subtopics inside topics
  - Drag & drop reorder subtopics

- **Questions**
  - Add / Delete questions inside subtopics
  - Drag & drop reorder questions

---

### Bonus Improvements

- **Solved Tracker**
  - Mark questions as solved/unsolved
  - Solved questions show strike-through styling

- **Progress Bar**
  - Topic-level progress indicator  
    Example: `5 / 20 solved (25%)`

- **Search**
  - Search questions instantly across the sheet

- **Persistent Storage**
  - Sheet state is saved in browser localStorage using Zustand persist

- **Export**
  - Export full sheet structure as JSON (copy/download)

---

## Tech Stack

- **React + TypeScript**
- **Zustand** (state management)
- **Tailwind CSS** (UI styling)
- **@dnd-kit** (drag & drop)
- Optional: **jsPDF** (PDF export)

---

## Project Structure

src
- components/

  - TopicCard.tsx
  - SubTopicCard.tsx
  - SortableQuestion.tsx

- pages/
  - SheetPage.tsx

- store/
  - sheetStore.ts

- types/
  - sheet.ts

- utils/
  - buildHierarchy.ts
  - arrayMove.ts

- data/
  - sheet.json

- App.tsx
- main.tsx
- index.css


---

## Setup Instructions

### 1. Clone Repository

```bash
git clone codolio-assignment
cd question-tracker-sheet
```
```shell
npm install
npm run dev
```
