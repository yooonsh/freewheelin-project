import type { TProblem } from 'types/problem';
import { Tag } from '../common/Tag';
import { cn } from 'lib/cn';
import { useEffect } from 'react';

type TProblemProps = {
  problem: TProblem;
  index: number;
  buttons?: React.ReactNode;
  isSelected?: boolean;
};

export const Problem = ({ problem, index, buttons, isSelected }: TProblemProps) => {
  useEffect(() => {
    console.log(isSelected, problem.id);
  }, [isSelected, problem.id]);
  return (
    <div
      className={cn(
        'shadow-problem flex flex-col rounded-xl bg-white',
        isSelected && 'border-[3px] border-solid border-[#00ABFF]',
      )}
    >
      <div className="flex items-center justify-between gap-[13px] rounded-t-xl bg-[#FAFAFA] px-4 py-2.5">
        <p className="flex min-w-0 items-center gap-2">
          <span className="min-w-10 text-center text-[18px] leading-[24px] font-bold tracking-[-0.01em]">
            {index + 1}
          </span>
          <span className="truncate text-[14px] leading-[21px] tracking-[-0.002em]">
            {problem.title}
          </span>
        </p>
        <div className="flex shrink-0 gap-3">{buttons}</div>
      </div>
      <div className="flex px-4 py-6">
        <div className="mr-[15px] flex w-10 flex-col gap-1">
          <Tag level={problem.level} />
          <Tag answerRate={problem.answerRate} />
          <Tag type={problem.type} />
        </div>
        <div>
          <img loading="lazy" className="w-4/5" src={problem.problemImageUrl} alt={problem.title} />
        </div>
      </div>
    </div>
  );
};
