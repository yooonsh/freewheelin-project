//menu
import addCircleIcon from 'assets/icons/add-circle.svg';
import addCircleActiveIcon from 'assets/icons/add-circle-active.svg';
import deleteIcon from 'assets/icons/delete.svg';
import swapHorizIcon from 'assets/icons/swap-horiz.svg';

// 아래로 다른 아이콘들에 대한 import 추가해주세요

export const iconComponents = {
  //menu
  addCircle: addCircleIcon,
  addCircleActive: addCircleActiveIcon,
  delete: deleteIcon,
  swapHoriz: swapHorizIcon,
  // 아래로 다른 아이콘들에 대한 매핑 추가해주세요
} as const;
