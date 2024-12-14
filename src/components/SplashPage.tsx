import { Devvit } from '@devvit/public-api';
import { Colors } from '../constants/colors.js';

interface SplashPageProps {
  showSplashPage: boolean;
  userIsModerator: boolean;
  clickNewGame: () => void;
  clickShowRules: () => void;
  clickShowHighScores: () => void;
  clickShowLeaderboard: () => void;
  clickChangeGameState: () => void;
}

export const SplashPage: Devvit.BlockComponent<SplashPageProps> = (
  {
    showSplashPage,
    userIsModerator,
    clickNewGame,
    clickShowRules,
    clickShowHighScores,
    clickShowLeaderboard,
    clickChangeGameState
  },
  context
) => {

  if(!showSplashPage){
    return(
      <vstack/>
    );
  }

  const postWidth = Number(context.dimensions?.width);
  const imgWidth = postWidth > 400 ? "400px" : "250px";
  const imgHeight = postWidth > 400 ? "275px" : "172px";

  return(
    <vstack width="100%" height="100%" padding="large" alignment="center middle" backgroundColor={Colors.blue}>
      <vstack width="100%" height="100%" gap="small" cornerRadius="small" alignment="center middle" backgroundColor={Colors.whiteAlt}>
        
        <vstack width="100%" padding="small" alignment="center middle">
          <image imageWidth={imgWidth} imageHeight={imgHeight} url="splash-page.png"/>
        </vstack>

        <spacer width="100%" height={postWidth > 400 ? "0px" : "10px"}/>

        <vstack gap="medium" alignment="center top">
          <vstack width="120px" padding="small" cornerRadius="small" alignment="center middle" backgroundColor={Colors.blue} onPress={clickNewGame}>
            <text size="xxlarge" weight="bold" style="heading" height="30px" color={Colors.whiteAlt}>
              Play
            </text>
          </vstack>

          <hstack width="100%" padding="small" gap="small" alignment="center middle">

            <vstack padding="small" cornerRadius="small" alignment="center middle" backgroundColor={Colors.red} onPress={clickShowRules}>
              <icon name="help" size="large" color={Colors.whiteAlt} />
            </vstack>

            <vstack padding="small" cornerRadius="small" alignment="center middle" backgroundColor={Colors.red} onPress={clickShowHighScores}>
              <icon name="statistics" size="large" color={Colors.whiteAlt} />
            </vstack>
            
            <vstack padding="small" cornerRadius="small" alignment="center middle" backgroundColor={Colors.red} onPress={clickShowLeaderboard}>
              <icon name="contest" size="large" color={Colors.whiteAlt} />
            </vstack>

            {userIsModerator && 
              <vstack padding="small" cornerRadius="small" alignment="center middle" backgroundColor={Colors.red} onPress={clickChangeGameState}>
                <icon name="mod" size="large" color={Colors.whiteAlt} />
              </vstack>
            }

          </hstack>
        </vstack>
      </vstack>
    </vstack>
  )}