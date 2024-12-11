export interface DieData {
  index: number;
  selected: boolean;
  color: string;
  value: number;
}

export function createDie(index: number): DieData {
  return {
    index: index,
    selected: false,
    color: 'white',
    value: 0
  }
}

export function rollDie(die: DieData): DieData {
  die.value = generateNumber();
  die.color = generateColor();
  return die;
}

export function clearDie(die: DieData): DieData{
  die.selected = false;
  die.color = 'white';
  die.value = 0;
  return die;
}

function generateNumber(): number{
  const number = Math.floor(Math.random() * 6) + 1;
  return number;
}

function generateColor(): string{
  const number = Math.floor(Math.random() * 2);
  if(number == 0){
    return "white";
  }
  else{
    return "red";
  }
}