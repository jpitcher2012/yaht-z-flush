import { Devvit } from '@devvit/public-api';
import { Colors } from '../constants/colors.js';

interface RollsLeftIconProps {
  rollsLeft: number;
}

export const RollsLeftIcon: Devvit.BlockComponent<RollsLeftIconProps> = (
  {
    rollsLeft
  }
) => {

  if(rollsLeft > 0){
    return(
      <zstack alignment="center middle">
        <icon size="large" name="comment-fill" color={Colors.red} />
        <text size="medium" weight="bold" style="heading" color={Colors.whiteAlt}>{rollsLeft}</text>
      </zstack>
    );
  }

  return(
    <zstack width="0px"/>
  );
}
