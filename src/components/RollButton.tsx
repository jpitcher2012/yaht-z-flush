import { Devvit } from '@devvit/public-api';
import { RollsLeftIcon } from './RollsLeftIcon.js';
import { Colors } from '../constants/colors.js';

interface RollButtonProps {
  rollsLeft: number;
  roll: () => void;
}

export const RollButton: Devvit.BlockComponent<RollButtonProps> = (
  {
    rollsLeft,
    roll
  }
) => {

  return(
    <vstack
      width="50%"
      height="48px"
    >
      <zstack>
        <vstack 
          backgroundColor={Colors.whiteAlt}
          borderColor={Colors.darkBlue}
          border="thick"
          width="100%"
          height="48px"
          padding="small"
          cornerRadius="small"
          alignment="center middle"
        >
          <hstack width="100%" gap="medium" alignment="center middle">
            <text height="100%" size="xxlarge" weight="bold" style="heading" alignment="center middle" color={Colors.red}>
              ROLL
            </text>
            <RollsLeftIcon
              rollsLeft={rollsLeft}
            />
          </hstack>
        </vstack>

        <vstack
          backgroundColor={rollsLeft > 0 ? '' : Colors.disabled}
          width="100%"
          height="48px"
          padding="small"
          cornerRadius="small"
          onPress={rollsLeft > 0 ? () => roll() : undefined}
        />
      </zstack>
    </vstack>
  );
}
