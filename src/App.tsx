import React, { useEffect, useState } from 'react';
import { getProblems, getSimilarProblems } from 'api/problem';
import type { TProblem } from 'types/problem';
import { useQuery } from '@tanstack/react-query';
import { Problem, Button, Icon } from 'components';
import { cn } from 'lib/cn';

function App() {
  const [problems, setProblems] = useState<TProblem[]>([]);
  const [selectedProblemId, setSelectedProblemId] = useState<number | null>(null);
  const [similarProblems, setSimilarProblems] = useState<TProblem[]>([]);

  // 문제 리스트 조회
  const { data: problemsData } = useQuery<TProblem[]>({
    queryKey: ['problems'],
    queryFn: async () => {
      const data = await getProblems();
      setProblems(data);
      return data;
    },
  });

  // 유사 문제 조회
  const fetchSimilar = (problemId: number) => {
    const excludedIds = problems?.map((p) => p.id);
    setSelectedProblemId(problemId);
    getSimilarProblems({ problemId, excludedProblemIds: excludedIds ?? [] }).then(
      setSimilarProblems,
    );
  };

  // 선택된 문제 교체
  const replaceSelectedWith = (item: TProblem) => {
    if (selectedProblemId == null) return;

    const mainIdx = problems.findIndex((p) => p.id === selectedProblemId);
    if (mainIdx < 0) return;

    const similarIdx = similarProblems.findIndex((p) => p.id === item.id);

    const nextMain = [...problems];
    const nextSimilar = [...similarProblems];

    const prevSelected = nextMain[mainIdx];

    nextMain[mainIdx] = item;

    // 유사문제: 클릭한 자리에는 기존 선택 문제로 교체
    if (similarIdx >= 0) {
      nextSimilar[similarIdx] = prevSelected;
    } else {
      // 혹시 목록에 없으면 앞에 추가 (안전장치)
      nextSimilar.unshift(prevSelected);
    }

    setProblems(nextMain);
    setSimilarProblems(nextSimilar);
    setSelectedProblemId(item.id); // 스왑된 아이템을 선택 상태로 유지
  };

  // 선택된 문제 뒤에 추가
  const addAfterSelected = (item: TProblem) => {
    if (selectedProblemId == null) return;
    const idx = problems.findIndex((p) => p.id === selectedProblemId);
    if (idx < 0) return;

    // 메인 리스트에 선택된 문제 바로 뒤에 추가(중복 방지 옵션)
    setProblems((prev) => {
      if (prev.some((p) => p.id === item.id)) return prev;
      return [...prev.slice(0, idx + 1), item, ...prev.slice(idx + 1)];
    });

    // 유사문제 리스트에서 제거
    setSimilarProblems((prev) => prev.filter((p) => p.id !== item.id));
  };
  const deleteFromMain = (targetId: number) => {
    const wasSelected = selectedProblemId === targetId;
    setProblems((prev) => prev.filter((p) => p.id !== targetId));
    if (wasSelected) {
      setSelectedProblemId(null);
      setSimilarProblems([]);
    }
  };

  // 문제 수 계산
  const levelCounts = problems.reduce<Record<1 | 2 | 3 | 4 | 5, number>>(
    (acc, p) => {
      acc[p.level] += 1;
      return acc;
    },
    { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
  );
  const totalCount = problems.length;

  const levelLabel: Record<1 | 2 | 3 | 4 | 5, string> = {
    1: '하',
    2: '중하',
    3: '중',
    4: '상',
    5: '최상',
  };

  return (
    <div className="m-auto flex min-h-[740px] w-fit flex-row gap-4 px-6 py-3.5">
      {/* 유사문제 리스트 영역 */}
      <div className="h-[calc(100vh-28px)] w-[480px] rounded-xl bg-[#E8E8E8] p-4 xl:w-[504px]">
        {similarProblems.length > 0 ? (
          <>
            <h2 className="mb-4 text-base leading-6 font-bold tracking-[-0.01em] text-[#333]">
              유사 문제
            </h2>
            <div className="flex h-[calc(100vh-108px)] flex-col gap-4 overflow-y-auto">
              {similarProblems.map((problem, index) => (
                <Problem
                  key={problem.id}
                  problem={problem}
                  index={index}
                  buttons={
                    <div className="flex gap-3">
                      <Button icon="swapHoriz" onClick={() => replaceSelectedWith(problem)}>
                        교체
                      </Button>
                      <Button icon="addCircle" onClick={() => addAfterSelected(problem)}>
                        추가
                      </Button>
                    </div>
                  }
                />
              ))}
            </div>
          </>
        ) : (
          <div className="flex h-full items-center justify-center">
            <p className="text-center text-[14px] leading-[21px] font-normal tracking-[-0.002em] text-[#333333]">
              <span className="mr-1.5 inline-flex h-6 w-[57px] items-center justify-center gap-[1px] rounded-xs border-[0.6px] border-[#E0E0E0] bg-white text-[9px] leading-[12px] font-normal tracking-normal text-[#959595]">
                <Icon name="addCircle" width={10} height={10} />
                유사문제
              </span>
              버튼을 누르면
              <br />
              문제를 추가 또는 교체할수 있습니다.
            </p>
          </div>
        )}
      </div>
      {/* 문제 리스트 영역 */}
      <div className="flex h-[calc(100vh-28px)] w-[480px] flex-col justify-between overflow-hidden rounded-xl bg-[#5C5C5C] p-4 pb-0 xl:w-[712px]">
        <div className="h-[calc(100%-64px)]">
          <h2 className="mb-4 text-base leading-6 font-bold tracking-[-0.01em] text-[#fff]">
            문제 리스트
          </h2>
          {problems.length > 0 ? (
            <div className="flex h-[calc(100%-40px)] flex-col gap-4 overflow-y-auto">
              {problems.map((problem, index) => (
                <Problem
                  key={problem.id}
                  problem={problem}
                  index={index}
                  isSelected={selectedProblemId === problem.id}
                  buttons={
                    <div className="flex gap-3">
                      <Button
                        icon={selectedProblemId === problem.id ? 'addCircleActive' : 'addCircle'}
                        onClick={() => fetchSimilar(problem.id)}
                        className={selectedProblemId === problem.id ? 'text-[#00ABFF]' : ''}
                      >
                        유사문제
                      </Button>
                      <Button icon="delete" onClick={() => deleteFromMain(problem.id)}>
                        삭제
                      </Button>
                    </div>
                  }
                />
              ))}
            </div>
          ) : (
            <div className="flex h-[calc(100%-40px)] items-center justify-center">
              <p className="flex items-center justify-center text-center text-[14px] leading-[21px] font-normal tracking-[-0.002em] text-white">
                학습지 문제수가 없습니다.
                <br />
                다음단계로 넘어가기 위해 문제를 추가해주세요.
              </p>
            </div>
          )}
        </div>
        <div className="flex justify-end px-2 py-5">
          <p className="text-[16px] leading-[24px] font-normal tracking-[-0.01em] text-white">
            {totalCount > 0 && (
              <>
                {([1, 2, 3, 4, 5] as const)
                  .map((lv) => `${levelLabel[lv]}${levelCounts[lv]}`)
                  .join(' · ')}
                <span className="relative bottom-[1px] ml-2">|</span>
              </>
            )}
            <span
              className={cn('ml-1 font-bold', totalCount === 0 ? 'text-[#FD5354]' : 'text-white')}
            >
              {' '}
              문제 수 {totalCount} 개
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
