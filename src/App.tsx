import React, { useEffect, useState } from 'react';
import { getProblems, getSimilarProblems } from 'api/problem';
import type { TProblem } from 'types/problem';
import { useQuery } from '@tanstack/react-query';
import { Problem } from 'components';

function App() {
  const [similarProblems, setSimilarProblems] = useState<TProblem[]>([]);

  const { data: problems } = useQuery<TProblem[]>({
    queryKey: ['problems'],
    queryFn: async () => {
      return await getProblems();
    },
  });

  const fetchSimilar = (problemId: number) => {
    const excludedIds = problems?.map((p) => p.id);
    getSimilarProblems({ problemId, excludedProblemIds: excludedIds ?? [] }).then(
      setSimilarProblems,
    );
  };

  return (
    <div className="m-auto flex w-full max-w-[1280px] flex-row gap-4 py-3.5">
      <div className="h-[calc(100vh-28px)] w-[504px] rounded-xl bg-[#E8E8E8] p-4">
        <h2 className="mb-4 text-base leading-6 font-bold tracking-[-0.01em] text-[#333]">
          유사 문제
        </h2>
        <div className="flex h-[calc(100vh-108px)] flex-col gap-4 overflow-y-auto">
          {similarProblems
            ? similarProblems.map((problem, index) => (
                <Problem key={problem.id} problem={problem} index={index} />
              ))
            : '유사 문제 버튼을 누르면 문제를 추가 또는 교체할수 있습니다.'}
        </div>
      </div>
      <div className="flex h-[calc(100vh-28px)] w-[712px] flex-col overflow-hidden rounded-xl bg-[#5C5C5C] p-4 pb-0">
        <h2 className="mb-4 text-base leading-6 font-bold tracking-[-0.01em] text-[#fff]">
          문제 리스트
        </h2>
        <div className="flex min-h-0 flex-col gap-4 overflow-y-auto">
          {problems
            ? problems.map((problem, index) => (
                <Problem
                  key={problem.id}
                  problem={problem}
                  index={index}
                  buttons={<button onClick={() => fetchSimilar(problem.id)}>유사 문제 보기</button>}
                />
              ))
            : '학습지 문제수가 없습니다. 다음단계로 넘어가기 위해 문제를 추가해주세요.'}
        </div>
        <div className="flex justify-end px-2 py-5">
          <p>하10 · 중하10 · 중10 · 상10 · 최상10 | 문제 수 50 개</p>
        </div>
      </div>
    </div>
  );
}

export default App;
