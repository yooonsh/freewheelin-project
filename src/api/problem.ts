import API from 'config/axios';
import type { TProblem, TGetSimilarProblemsParams } from 'types';

// 문제 리스트 조회
export const getProblems = async () => {
  try {
    const response = await API.get('/problems');
    return response.data ?? [];
  } catch (error) {
    console.error(error);
    return [];
  }
};

// 유사문제 리스트 조회
export const getSimilarProblems = async (
  params: TGetSimilarProblemsParams,
): Promise<TProblem[]> => {
  const response = await API.get<TProblem[]>(`/problems/${params.problemId}/similarity`, {
    params: { excludedProblemIds: params.excludedProblemIds.join(',') },
  });
  return response.data;
};
