export interface Category {
  index: number;
  label: String;
  score: number;
  selected: boolean;
  completed: boolean;
  scoreColor: string;
}

export function createCategory(index: number, label: String): Category {
  return {
    index: index,
    label: label,
    score: 0,
    selected: false,
    completed: false,
    scoreColor: ''
  }
}