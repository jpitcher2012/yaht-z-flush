import { Devvit } from '@devvit/public-api';
import { Colors } from '../constants/colors.js';

interface GameOverProps {
  showGameOver: boolean;
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
    score,
    img,
    startNewGame,
    clickShowHighScores,
    clickShowLeaderboard,
    clickShareScore,
    cancel
  }
) => {

  if(showGameOver){
    return(
      <zstack width="100%" height="100%" alignment="center middle">

        <vstack width="100%" height="100%" backgroundColor={Colors.disabled}/>

        <vstack 
          cornerRadius="small"
          backgroundColor={Colors.whiteAlt}
          borderColor={Colors.gray}
          border="thick"
        >
          
          <vstack width="100%">
            <zstack width="225px" height="198px">

              <vstack width="100%" height="100%" padding="small" alignment="center middle">
                <image
                  url={img}
                  imageWidth="225px"
                  imageHeight="198px"
                />
              </vstack>

              <vstack width="225px" height="198px" padding="small" alignment="center middle">
                <spacer width="100%" height="0px"/>
                <text size="xxlarge" weight="bold" style="heading" color={Colors.blackAlt}>
                  {score}
                </text>
              </vstack>

              <vstack width="100%" alignment="end top" padding="small">
                <icon name="close" size="small" color={Colors.gray} onPress={cancel} />
              </vstack>
            </zstack>

            <hstack width="100%" alignment="center middle">
              <vstack 
                backgroundColor={Colors.red}
                padding="small"
                cornerRadius="small"
                alignment="center middle"
                onPress={startNewGame}
              >
                <text size="xlarge" weight="bold" style="heading" color={Colors.whiteAlt}>
                  New Game
                </text>
              </vstack>
            </hstack>

            <hstack width="100%" alignment="center middle" padding="medium" gap="small">
            <vstack 
                backgroundColor={Colors.blue}
                padding="small"
                cornerRadius="small"
                alignment="center middle"
                onPress={clickShowHighScores}
              >
                <icon size="medium" name="statistics" color={Colors.whiteAlt} />
              </vstack>

              <vstack 
                backgroundColor={Colors.blue}
                padding="small"
                cornerRadius="small"
                alignment="center middle"
                onPress={clickShowLeaderboard}
              >
                <icon size="medium" name="contest" color={Colors.whiteAlt} />
              </vstack>

              <vstack backgroundColor={Colors.blue}
                padding="small"
                cornerRadius="small"
                alignment="center middle"
                onPress={clickShareScore}
              >
                <icon size="medium" name="share-new" color={Colors.whiteAlt} />
              </vstack>
            </hstack>
          </vstack>

        </vstack>
      </zstack>
    )
  }

  return(
    <vstack/>
  );
}
