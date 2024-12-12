import { Devvit } from '@devvit/public-api';
import { Colors } from '../constants/colors.js';

interface SplashPageProps {
  showSplashPage: boolean;
  clickNewGame: () => void;
  clickShowRules: () => void;
}

export const SplashPage: Devvit.BlockComponent<SplashPageProps> = (
  {
    showSplashPage,
    clickNewGame,
    clickShowRules
  }
) => {

  if(!showSplashPage){
    return(
      <vstack/>
    );
  }

  return(
    <vstack width="100%" height="100%" padding="large" alignment="center top" backgroundColor={Colors.blue}>
      <vstack width="100%" height="100%" padding="small" gap="small" cornerRadius="small" alignment="center middle" backgroundColor={Colors.whiteAlt}>
        
        <vstack width="100%" padding="small" alignment="center middle">
          <image imageWidth="400px" imageHeight="275px" url="splash-page.png"/>
        </vstack>

        <vstack grow padding="medium" gap="medium" alignment="center top">
          <vstack width="120px" padding="small" cornerRadius="small" alignment="center middle" backgroundColor={Colors.blue} onPress={clickShowRules}>
            <text size="xlarge" weight="bold" style="heading" color={Colors.whiteAlt}>
                How to Play
              </text>
            </vstack>

            <vstack width="120px" padding="small" cornerRadius="small" alignment="center middle" backgroundColor={Colors.red} onPress={clickNewGame}>
              <text size="xlarge" weight="bold" style="heading" color={Colors.whiteAlt}>
                New Game
              </text>
            </vstack>
          
          </vstack>
      </vstack>
    </vstack>
  )}