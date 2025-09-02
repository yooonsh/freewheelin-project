import { useState } from 'react';
import { getProblems, getSimilarProblems } from 'api/problem';
import type { TProblem } from 'types/problem';
import { useQuery } from '@tanstack/react-query';
import { SimilarList, ProblemList } from 'components/problem';
import { cn } from 'lib/cn';

function App() {
  const [problems, setProblems] = useState<TProblem[]>([]);
  const [selectedProblemId, setSelectedProblemId] = useState<number | null>(null);
  const [similarProblems, setSimilarProblems] = useState<TProblem[]>([]);

  // 문제 리스트 조회
  useQuery<TProblem[]>({
    queryKey: ['problems'],
    queryFn: async () => {
      const data = await getProblems();
      setProblems(data);
      return data;
    },
    staleTime: 60 * 1000,
    gcTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
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
      {/* 유사문제 리스트 */}
      <SimilarList
        problems={similarProblems}
        onReplace={replaceSelectedWith}
        onAddAfter={addAfterSelected}
      />
      {/* 문제 리스트 */}
      <ProblemList
        problems={problems}
        selectedId={selectedProblemId}
        onClickSimilar={fetchSimilar}
        onDelete={deleteFromMain}
        footer={
          <p className="text-[16px] leading-[24px] font-normal tracking-[-0.01em] text-white">
            {totalCount > 0 && (
              <span className="opacity-80">
                {([1, 2, 3, 4, 5] as const)
                  .filter((lv) => levelCounts[lv] > 0)
                  .map((lv) => `${levelLabel[lv]}${levelCounts[lv]}`)
                  .join(' · ')}
                <span className="relative bottom-[1px] ml-2">|</span>
              </span>
            )}
            <span
              className={cn('ml-1 font-bold', totalCount === 0 ? 'text-[#FD5354]' : 'text-white')}
            >
              문제 수 {totalCount} 개
            </span>
          </p>
        }
      />
    </div>
  );
}

export default App;
