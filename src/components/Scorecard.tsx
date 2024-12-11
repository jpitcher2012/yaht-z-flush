import { Devvit } from '@devvit/public-api';
import { ScorecardData } from '../data/scorecardData.js';
import { Category } from '../data/category.js';
import { Colors } from '../constants/colors.js';

interface ScorecardProps {
  scorecard: ScorecardData;
  canSelectCategory: boolean;
  clickCategory: (index: number) => void;
}

export const Scorecard: Devvit.BlockComponent<ScorecardProps> = (
  {
    scorecard,
    canSelectCategory,
    clickCategory
  }
) => {

  return (
    <hstack width="100%" alignment="center middle">
      
      <vstack width="50%">
        {scorecard.categories.slice(0,6).map((category: Category) => (
            <hstack 
              backgroundColor={category.selected ? "lightslategray": (category.index % 2 == 0 ? Colors.whiteAlt : Colors.lightGray)}
              onPress={canSelectCategory && !category.completed ? () => clickCategory(category.index) : undefined}
            >
              <vstack width="67%" padding="small" borderColor={Colors.blackAlt}>
                <text size="large" weight="bold" color={category.selected ? Colors.whiteAlt : Colors.blackAlt}>
                  {category.label}
                </text>
              </vstack>
              <vstack width="33%" padding="small" borderColor={Colors.blackAlt}>
                <text 
                  size="large"
                  weight={category.completed || category.selected ? 'bold' : 'regular'}
                  color={category.selected ? Colors.whiteAlt : category.scoreColor}
                >
                  {category.score > 0 || category.completed || category.selected ? category.score : ''}
                </text>
              </vstack>
            </hstack>
        ))}
        <hstack backgroundColor={Colors.whiteAlt}>
          <hstack width="67%" padding="small" gap="small" borderColor={Colors.blackAlt}>
            <text size="large" weight="bold" color={Colors.blackAlt}>
              Bonus
            </text>
            <text size="large" weight="bold" color={Colors.blue}>
              ({scorecard.leftTotal}/63)
            </text>
          </hstack>
          <vstack width="33%" padding="small" borderColor={Colors.blackAlt}>
            <text size="large" weight="bold" color={scorecard.leftBonus > 0 ? Colors.blue : Colors.blackAlt}>
              {scorecard.leftBonus > 0 || scorecard.leftCompleted ? scorecard.leftBonus : ''}
            </text>
          </vstack>
        </hstack>
      </vstack>

      <vstack width="50%">
        {scorecard.categories.slice(6).map((category: Category) => (
            <hstack 
            backgroundColor={category.selected ? "lightslategray" : (category.index % 2 == 0 ? Colors.whiteAlt : Colors.lightGray)}
            onPress={canSelectCategory && !category.completed ? () => clickCategory(category.index) : undefined}
          >
            <hstack width="67%" padding="small" gap="small" borderColor={Colors.blackAlt}>
              <text size="large" weight="bold" color={category.selected ? Colors.whiteAlt : Colors.blackAlt}>
                {category.label}
              </text>
              <text size="large" weight="bold" color={category.selected ? Colors.whiteAlt : Colors.blue}>
                {category.index == 12 && scorecard.numYahtZs > 1 ? ` (${scorecard.numYahtZs})` : ''}
              </text>
            </hstack>
            <vstack width="33%" padding="small" borderColor={Colors.blackAlt}>
              <text 
                size="large"
                weight={category.completed || category.selected ? 'bold' : 'regular'}
                color={category.selected ? Colors.whiteAlt : category.scoreColor}
              >
                {category.score > 0 || category.completed || category.selected ? category.score : ''}
              </text>
            </vstack>
          </hstack>
        ))}
      </vstack>
    </hstack>
  );
}
