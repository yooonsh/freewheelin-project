import type { TProblem } from 'types/problem';

type TTagProps = Partial<Pick<TProblem, 'level' | 'answerRate' | 'type'>>;

const BASE_TAG_CLASS =
  'text-center align-middle text-[12px] w-10 leading-[18px] font-normal tracking-[0%] bg-[#F5F5F5] rounded-s';

const LEVEL_META: Record<1 | 2 | 3 | 4 | 5, { color: string; label: string }> = {
  1: { color: 'text-[#5C5C5C]', label: '하' },
  2: { color: 'text-[#00ABFF]', label: '중하' },
  3: { color: 'text-[#54C0B1]', label: '중' },
  4: { color: 'text-[#FFC64D]', label: '상' },
  5: { color: 'text-[#FD5354]', label: '최상' },
};

export const Tag = ({ level, answerRate, type }: TTagProps) => {
  let text: string | undefined;
  let colorClass = '';

  if (level !== undefined) {
    const meta = LEVEL_META[level];
    text = meta.label;
    colorClass = meta.color;
  } else if (answerRate !== undefined) {
    text = `${answerRate}%`;
    colorClass = 'text-[#707070]';
  } else if (type !== undefined) {
    text = type === 1 ? '객관식' : '주관식';
    colorClass = 'text-[#959595]';
  }

  return <p className={BASE_TAG_CLASS}>{text && <span className={colorClass}>{text}</span>}</p>;
};
