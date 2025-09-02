// src/components/ProblemList.tsx
import React from 'react';
import type { TProblem } from 'types/problem';
import { Button } from 'components/common';
import { Problem } from 'components/problem';

type Props = {
  problems: TProblem[];
  selectedId: number | null;
  onClickSimilar: (id: number) => void;
  onDelete: (id: number) => void;
  footer?: React.ReactNode;
};

export const ProblemList = ({ problems, selectedId, onClickSimilar, onDelete, footer }: Props) => {
  return (
    <div className="flex h-[calc(100vh-28px)] w-[480px] flex-col justify-between overflow-hidden rounded-xl bg-[#5C5C5C] p-4 pb-0 xl:w-[712px]">
      <div className="h-[calc(100%-64px)]">
        <h2 className="mb-4 text-base leading-6 font-bold tracking-[-0.01em] text-[#fff]">
          학습지 상세 편집
        </h2>
        {problems.length > 0 ? (
          <div className="flex h-[calc(100%-40px)] flex-col gap-4 overflow-y-auto">
            {problems.map((problem, index) => (
              <Problem
                key={problem.id}
                problem={problem}
                index={index}
                isSelected={selectedId === problem.id}
                buttons={
                  <div className="flex gap-3">
                    <Button
                      icon={selectedId === problem.id ? 'addCircleActive' : 'addCircle'}
                      onClick={() => onClickSimilar(problem.id)}
                      className={selectedId === problem.id ? 'text-[#00ABFF]' : ''}
                    >
                      유사문제
                    </Button>
                    <Button icon="delete" onClick={() => onDelete(problem.id)}>
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
      <div className="flex justify-end px-2 py-5">{footer}</div>
    </div>
  );
};
