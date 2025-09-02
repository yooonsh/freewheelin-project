import type { TLevel, TProblem } from 'types/problem';
import { LEVEL_LABEL_MAP, PROBLEM_TYPE_LABEL_MAP } from 'types/problem';
import type { TLevelLabel } from 'types/problem';

type TTagProps = Partial<Pick<TProblem, 'level' | 'answerRate' | 'type'>>;

const BASE_TAG_CLASS =
  'text-center align-middle text-[12px] w-10 leading-[18px] font-normal tracking-[0%] bg-[#F5F5F5] rounded-s';

const LEVEL_META: Record<TLevel, { color: string; label: TLevelLabel }> = {
  1: { color: 'text-[#5C5C5C]', label: LEVEL_LABEL_MAP[1] }, // 하
  2: { color: 'text-[#00ABFF]', label: LEVEL_LABEL_MAP[2] }, // 중하
  3: { color: 'text-[#54C0B1]', label: LEVEL_LABEL_MAP[3] }, // 중
  4: { color: 'text-[#FFC64D]', label: LEVEL_LABEL_MAP[4] }, // 상
  5: { color: 'text-[#FD5354]', label: LEVEL_LABEL_MAP[5] }, // 최상
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
    text = PROBLEM_TYPE_LABEL_MAP[type];
    colorClass = 'text-[#959595]';
  }

  return <p className={BASE_TAG_CLASS}>{text && <span className={colorClass}>{text}</span>}</p>;
};
