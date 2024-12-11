import { Devvit } from '@devvit/public-api';
import { Colors } from '../constants/colors.js';

interface HeaderProps {
  mainPage: boolean;
  headerText: string;
  clickIcon: () => void;
}

export const Header: Devvit.BlockComponent<HeaderProps> = (
  {
    mainPage,
    headerText,
    clickIcon
  }
) => {

  return(
    <hstack backgroundColor={Colors.darkBlue} width="100%" minHeight="45px" alignment="center middle">
      <vstack 
        height="100%"
        width="50px"
        alignment="center middle"
        onPress={clickIcon}
      >
        <icon size="large" name={mainPage ? "menu-fill" : "back-fill"} color={Colors.whiteAlt}/>
      </vstack>

      <vstack height="100%" alignment="center middle" grow>
        <spacer width="100%" height="7px"/>
        <text size="xxlarge" weight="bold" style="heading" grow color={Colors.whiteAlt}>
          {headerText}
        </text>
      </vstack>

      <vstack height="100%" width="50px" />
  </hstack>
  );
}
