import { Devvit } from '@devvit/public-api';
import { Colors } from '../constants/colors.js';

interface PlayButtonProps {
  categorySelected: boolean;
  scoreCategory: () => void;
}

export const PlayButton: Devvit.BlockComponent<PlayButtonProps> = (
  {
    categorySelected,
    scoreCategory
  }
) => {

  return(
    <vstack
      width="50%"
      height="48px"
    >
      <zstack>
        <vstack 
          backgroundColor={Colors.red}
          borderColor={Colors.darkBlue}
          border="thick"
          width="100%"
          height="48px"
          padding="small"
          cornerRadius="small"
          alignment="center middle"
        >
          <text size="xxlarge" weight="bold" style="heading" color={Colors.whiteAlt}>
            PLAY
          </text>
        </vstack>

        <vstack
          backgroundColor={categorySelected ? '' : Colors.disabled}
          borderColor={categorySelected ? '' : Colors.disabled}
          border="thick"
          width="100%"
          height="48px"
          padding="small"
          cornerRadius="small"
          onPress={categorySelected ? () => scoreCategory() : undefined}
        />
      </zstack>
    </vstack>
  );
}
