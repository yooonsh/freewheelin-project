export type TProblem = {
  id: number;
  level: 1 | 2 | 3 | 4 | 5;
  type: 1 | 2;
  problemImageUrl: string;
  title: string;
  answerRate: number;
};

export type TGetSimilarProblemsParams = {
  problemId: number;
  excludedProblemIds: number[];
};
