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
  },
  context
) => {

  if(!showSplashPage){
    return(
      <vstack/>
    );
  }

  const postWidth = Number(context.dimensions?.width);
  const imgWidth = postWidth < 500 ? "250px" : "400px";
  const imgHeight = postWidth < 500 ? "172px" : "275px";

  return(
    <vstack width="100%" height="100%" padding="large" alignment="center middle" backgroundColor={Colors.blue}>
      <vstack width="100%" height="100%" padding="small" gap="small" cornerRadius="small" alignment="center middle" backgroundColor={Colors.whiteAlt}>
        
        <vstack width="100%" padding="small" alignment="center middle">
          <image imageWidth={imgWidth} imageHeight={imgHeight} url="splash-page.png"/>
        </vstack>

        <spacer width="100%" height={postWidth < 500 ? "10px" : "0px"}/>

        <vstack padding="medium" gap="medium" alignment="center top">
          <vstack width="130px" padding="small" cornerRadius="small" alignment="center middle" backgroundColor={Colors.blue} onPress={clickNewGame}>
            <text size="xlarge" weight="bold" style="heading" color={Colors.whiteAlt}>
              New Game
            </text>
          </vstack>

          <vstack width="130px" padding="small" cornerRadius="small" alignment="center middle" backgroundColor={Colors.red} onPress={clickShowRules}>
            <text size="xlarge" weight="bold" style="heading" color={Colors.whiteAlt}>
              How to Play
            </text>
          </vstack>
        </vstack>
      </vstack>
    </vstack>
  )}