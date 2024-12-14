import { Devvit } from '@devvit/public-api';
import { Colors } from '../constants/colors.js';

interface MenuProps {
  showMenu: boolean;
  userIsModerator: boolean;
  clickMenuIcon: () => void;
  clickNewGame: () => void;
  clickShowRules: () => void;
  clickShowHighScores: () => void;
  clickShowLeaderboard: () => void;
  clickChangeGameState: () => void;
}

export const Menu: Devvit.BlockComponent<MenuProps> = (
  {
    showMenu,
    userIsModerator,
    clickMenuIcon,
    clickNewGame,
    clickShowRules,
    clickShowHighScores,
    clickShowLeaderboard,
    clickChangeGameState
  }
) => {

  if(showMenu){
    return(
      <vstack width="100%">
        <vstack 
          width="50px"
          minHeight="45px"
          backgroundColor={Colors.darkBlue}
          alignment="center middle"
          onPress={clickMenuIcon}
        >
          <icon size="large" name="menu-fill" color={Colors.whiteAlt} />
        </vstack>

        <vstack
          width={userIsModerator ? "220px" : "175px"}
          backgroundColor={Colors.darkBlue}
          alignment="start top"
          padding="medium"
          gap="medium"
        >
          <hstack gap="medium" alignment="start middle" onPress={clickNewGame}>
            <icon size="medium" name="refresh" color={Colors.whiteAlt} />
            <text size="large" weight="bold" style="heading" color={Colors.whiteAlt}>
              New Game
            </text>
          </hstack>
          <hstack gap="medium" alignment="start middle" onPress={clickShowRules}>
            <icon size="medium" name="random-fill" color={Colors.whiteAlt} />
            <text size="large" weight="bold" style="heading" color={Colors.whiteAlt}>
              How to Play
            </text>
          </hstack>
          <hstack gap="medium" alignment="start middle" onPress={clickShowHighScores}>
            <icon size="medium" name="statistics" color={Colors.whiteAlt} />
            <text size="large" weight="bold" style="heading" color={Colors.whiteAlt}>
              High Scores
            </text>
          </hstack>
          <hstack gap="medium" alignment="start middle" onPress={clickShowLeaderboard}>
            <icon size="medium" name="contest" color={Colors.whiteAlt} />
            <text size="large" weight="bold" style="heading" color={Colors.whiteAlt}>
              Leaderboard
            </text>
          </hstack>
          {userIsModerator && 
            <hstack gap="medium" alignment="start middle" onPress={clickChangeGameState}>
              <icon size="medium" name="mod" color={Colors.whiteAlt} />
              <text size="large" weight="bold" style="heading" color={Colors.whiteAlt}>
                Change Game State
              </text>
            </hstack>
          }
        </vstack>
      </vstack>

    )
  }

  return(
    <vstack/>
  );
}
