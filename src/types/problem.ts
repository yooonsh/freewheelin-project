// 레벨
export const LEVELS = [1, 2, 3, 4, 5] as const;
export type TLevel = (typeof LEVELS)[number];
export const LEVEL_LABEL_MAP = {
  1: '하',
  2: '중하',
  3: '중',
  4: '상',
  5: '최상',
} as const;

export type TLevelLabel = (typeof LEVEL_LABEL_MAP)[TLevel];

// 타입
export type TProblemType = 1 | 2;

export const PROBLEM_TYPE_LABEL_MAP = {
  1: '객관식',
  2: '주관식',
} as const;

// 문제
export type TProblem = {
  id: number;
  level: TLevel;
  type: TProblemType;
  problemImageUrl: string;
  title: string;
  answerRate: number;
};

// 유사문제 조회 파라미터
export type TGetSimilarProblemsParams = {
  problemId: number;
  excludedProblemIds: number[];
};
