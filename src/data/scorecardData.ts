import { Category, createCategory } from './category.js';
import { DieData } from './dieData.js';
import { Colors } from '../constants/colors.js';

export interface ScorecardData {
  categories: Array<Category>;
  leftTotal: number;
  leftBonus: number;
  leftCompleted: boolean;
  numYahtZs: number;
  totalScore: number;
}

export function createScorecard(): ScorecardData {
  return {
    leftTotal: 0,
    leftBonus: 0,
    leftCompleted: false,
    numYahtZs: 0,
    totalScore: 0,
    categories: [
      createCategory(0, 'Ones'),
      createCategory(1, 'Twos'),
      createCategory(2, 'Threes'),
      createCategory(3, 'Fours'),
      createCategory(4, 'Fives'),
      createCategory(5, 'Sixes'),
      createCategory(6, 'Chance'),
      createCategory(7, 'Full House'),
      createCategory(8, 'Sm Straight'),
      createCategory(9, 'Lg Straight'),
      createCategory(10, '3 of a Kind'),
      createCategory(11, '4 of a Kind'),
      createCategory(12, 'Yaht-Z'),
    ]
  }
}

export function propertiesEqual(arr: Array<any>, prop: string): boolean{
  const firstVal = arr[0][prop];
  return arr.every(obj => obj[prop] === firstVal);
}

function sum(dice: Array<DieData>): number {
  return dice.reduce((n, {value}) => n + value, 0);
}

export function calculateScores(scorecard: ScorecardData, dice: Array<DieData>): ScorecardData {
  let numValues = [0, 0, 0, 0, 0, 0]

  // Tally how many dice of each number are present
  dice.forEach((die: DieData) => {
    numValues[die.value-1]++;
  });

  const flush = propertiesEqual(dice, 'color');
  const jokerRules = numValues.includes(5) && scorecard.categories[12].completed;

  for(let i=0; i<13; i++){

    // Set the text color
    if(!scorecard.categories[i].completed){
      if(flush){
        scorecard.categories[i].scoreColor = Colors.red;
      }
      else{
        scorecard.categories[i].scoreColor = Colors.gray;
      }
    }

    // Left categories - sum of each number
    if(i < 6){
      if(!scorecard.categories[i].completed){
        let score = numValues[i] * (i+1);
        if(flush){
          score = score * 2;
        }
        scorecard.categories[i].score = score;
      }
    }

    // Chance - sum of all
    if(i == 6 && !scorecard.categories[6].completed){
      let score = sum(dice);
      if(flush){
        score = score * 2;
      }
      scorecard.categories[6].score = score;
    }

    // Full House - 25
    if(i == 7 && !scorecard.categories[7].completed){
      let score = 0;
      if((numValues.includes(3) && numValues.includes(2)) || jokerRules){
        score = 25;
        if(flush){
          score = score * 2;
        }
      }
      scorecard.categories[7].score = score;
    }

    // Small Straight - 30
    if(i == 8 && !scorecard.categories[8].completed){
      let score = 0;
      if(numValues[0] >= 1 && numValues[1] >= 1 && numValues[2] >= 1 && numValues[3] >= 1){
        score = 30;
      }
      else if(numValues[1] >= 1 && numValues[2] >= 1 && numValues[3] >= 1 && numValues[4] >= 1){
        score = 30;
      }
      else if(numValues[2] >= 1 && numValues[3] >= 1 && numValues[4] >= 1 && numValues[5] >= 1){
        score = 30;
      }
      else if(jokerRules){
        score = 30;
      }

      if(flush){
        score = score * 2;
      }
      scorecard.categories[8].score = score;
    }

    // Large Straight - 40
    if(i == 9 && !scorecard.categories[9].completed){
      let score = 0;
      if(numValues[0] >= 1 && numValues[1] >= 1 && numValues[2] >= 1 && numValues[3] >= 1 && numValues[4] >= 1){
        score = 40;
      }
      else if(numValues[1] >= 1 && numValues[2] >= 1 && numValues[3] >= 1 && numValues[4] >= 1 && numValues[5] >= 1){
        score = 40;
      }
      else if(jokerRules){
        score = 40;
      }
    
      if(flush){
        score = score * 2;
      }
      scorecard.categories[9].score = score;
    }

    // 3 of a Kind - sum of all, if achieved
    if(i == 10 && !scorecard.categories[10].completed){
      let score = 0;
      if(numValues.includes(3) || numValues.includes(4) || numValues.includes(5)){
        score = sum(dice);
        if(flush){
          score = score * 2;
        }
      }
      scorecard.categories[10].score = score;
    }

    // 4 of a Kind - sum of all, if achieved
    if(i == 11 && !scorecard.categories[11].completed){
      let score = 0;
      if(numValues.includes(4) || numValues.includes(5)){
        score = sum(dice);
        if(flush){
          score = score * 2;
        }
      }
      scorecard.categories[11].score = score;
    }

    // Yaht-Z - 50
    if(i == 12 && !scorecard.categories[12].completed){
      let score = 0;
      if(numValues.includes(5)){
        score = 50;
        if(flush){
          score = score * 2;
        }
      }
      scorecard.categories[12].score = score;
    }
  }

  return scorecard;
}
