import type { TProblem } from 'types/problem';
import { Tag } from './Tag';

type TProblemProps = {
  problem: TProblem;
  index: number;
  buttons?: React.ReactNode;
};

export const Problem = ({ problem, index, buttons }: TProblemProps) => {
  return (
    <div className="shadow-problem flex flex-col rounded-xl bg-white">
      <div className="flex items-center justify-between rounded-t-xl bg-[#FAFAFA] px-4 py-2.5">
        <p className="flex items-center gap-2">
          <span className="w-10 text-center text-[18px] leading-[24px] font-bold tracking-[-0.01em]">
            {index + 1}
          </span>
          <span className="text-[14px] leading-[21px] tracking-[-0.002em]">{problem.title}</span>
        </p>
        <div className="flex gap-3">{buttons}</div>
      </div>
      <div className="flex px-4 py-6">
        <div className="mr-[15px] flex w-10 flex-col gap-1">
          <Tag level={problem.level} />
          <Tag answerRate={problem.answerRate} />
          <Tag type={problem.type} />
        </div>
        <div>
          <img className="w-4/5" src={problem.problemImageUrl} alt={problem.title} />
        </div>
      </div>
    </div>
  );
};
