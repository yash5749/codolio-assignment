export type Question = {
  id: string;
  title: string;
  difficulty: string;
  link: string;
  resource?: string | null;
  solved: boolean;
};


export type SubTopic = {
  id: string;
  title: string;
  questions: Question[];
};

export type Topic = {
  id: string;
  title: string;
  subtopics: SubTopic[];
};
