// src/components/SimilarList.tsx
import type { TProblem } from 'types/problem';
import { Problem } from 'components/problem';
import { Button, Icon } from 'components/common';

type Props = {
  problems: TProblem[];
  onReplace: (p: TProblem) => void;
  onAddAfter: (p: TProblem) => void;
};

export const SimilarList = ({ problems, onReplace, onAddAfter }: Props) => {
  return (
    <div className="h-[calc(100vh-28px)] w-[480px] rounded-xl bg-[#E8E8E8] p-4 xl:w-[504px]">
      {problems.length > 0 ? (
        <>
          <h2 className="mb-4 text-base leading-6 font-bold tracking-[-0.01em] text-[#333]">
            유사 문제
          </h2>
          <div className="flex h-[calc(100vh-108px)] flex-col gap-4 overflow-y-auto">
            {problems.map((problem, index) => (
              <Problem
                key={problem.id}
                problem={problem}
                index={index}
                buttons={
                  <div className="flex gap-3">
                    <Button icon="swapHoriz" onClick={() => onReplace(problem)}>
                      교체
                    </Button>
                    <Button icon="addCircle" onClick={() => onAddAfter(problem)}>
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
  );
};
