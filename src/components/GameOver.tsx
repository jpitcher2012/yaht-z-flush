import { Devvit } from '@devvit/public-api';
import { Colors } from '../constants/colors.js';

interface GameOverProps {
  showGameOver: boolean;
  loading: boolean;
  score: number;
  img: string;
  startNewGame: () => void;
  clickShowHighScores: () => void;
  clickShowLeaderboard: () => void;
  clickShareScore: () => void;
  cancel: () => void;
}

export const GameOver: Devvit.BlockComponent<GameOverProps> = (
  {
    showGameOver,
    loading,
    score,
    img,
    startNewGame,
    clickShowHighScores,
    clickShowLeaderboard,
    clickShareScore,
    cancel
  }
) => {

  if(!showGameOver){
    return(
      <vstack/>
    )
  }

  const imgHeight = (img == "game_over.png") ? "165px" : "200px";
  const imgWidth = (img == "game_over.png") ? "186px" : "225px";

  return(
    <zstack width="100%" height="100%" alignment="center middle">

      <vstack width="100%" height="100%" backgroundColor={Colors.disabled}/>

      <vstack width={imgWidth} cornerRadius="small" border="thick" alignment="center middle" backgroundColor={Colors.whiteAlt} borderColor={Colors.gray}>
          
        <vstack width={imgWidth}>
          <zstack width={imgWidth} height={imgHeight}>

            <vstack width={imgWidth} height={imgHeight} alignment="center middle">
              <image imageWidth={imgWidth} imageHeight={imgHeight} width="100%" url={img}/>
            </vstack>

            <vstack width={imgWidth} height={imgHeight} alignment="center middle">
              <text size="xxlarge" weight="bold" style="heading" color={Colors.blackAlt}>
                {score}
              </text>
            </vstack>

            {loading && 
              <vstack width={imgWidth} height={imgHeight} alignment="center middle" backgroundColor={Colors.whiteAlt}>
                <image imageWidth="100px" imageHeight="100px" url="spinner.gif"/>
              </vstack>
            }

            <vstack width="100%" alignment="end top" padding="small">
              <icon name="close" size="small" color={Colors.gray} onPress={cancel} />
            </vstack>
          </zstack>

          <hstack width="100%" alignment="center middle">
            <vstack padding="small" cornerRadius="small" alignment="center middle" backgroundColor={Colors.red} onPress={startNewGame}>
              <text size="xlarge" weight="bold" style="heading" color={Colors.whiteAlt}>
                New Game
              </text>
            </vstack>
          </hstack>

          <hstack width="100%" alignment="center middle" padding="medium" gap="small">
            <vstack padding="small" cornerRadius="small" alignment="center middle" backgroundColor={Colors.blue} onPress={clickShowHighScores}>
              <icon size="medium" name="statistics" color={Colors.whiteAlt} />
            </vstack>

            <vstack padding="small" cornerRadius="small" alignment="center middle" backgroundColor={Colors.blue}onPress={clickShowLeaderboard}>
              <icon size="medium" name="contest" color={Colors.whiteAlt} />
            </vstack>

            <vstack padding="small" cornerRadius="small" alignment="center middle"backgroundColor={Colors.blue} onPress={clickShareScore}>
              <icon size="medium" name="share-new" color={Colors.whiteAlt} />
            </vstack>
          </hstack>
        </vstack>

      </vstack>
    </zstack>
  )
}
