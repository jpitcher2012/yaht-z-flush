import { Devvit } from '@devvit/public-api';
import { Header } from './Header.js';
import { HighScoreData, getFormattedDate } from '../data/highScoreData.js';
import { Colors } from '../constants/colors.js';

interface HighScoresProps {
  showHighScores: boolean;
  username: string;
  highScores: Array<HighScoreData>;
  gameTimestamp: EpochTimeStamp;
  clickBackIcon: () => void;
}

export const HighScores: Devvit.BlockComponent<HighScoresProps> = (
  {
    showHighScores,
    username,
    highScores,
    gameTimestamp,
    clickBackIcon
  }
) => {

  if(!showHighScores){
    return(
      <vstack/>
    );
  }

  if(!username){
    return(
      <vstack width="100%" height="100%" backgroundColor={Colors.blue}>
        <Header
          mainPage={false}
          headerText="Your High Scores"
          clickIcon={clickBackIcon}
        />

        <vstack grow alignment="center middle" backgroundColor={Colors.blue}>
          <vstack height="40%" padding="medium" cornerRadius="small" alignment="center middle" backgroundColor={Colors.whiteAlt}>
            <text size="large" wrap>You must be logged in to track your high scores</text>
          </vstack>
        </vstack>
      </vstack>
    )
  }

  if(highScores.length == 0){
    return(
      <vstack width="100%" height="100%" backgroundColor={Colors.blue}>
        <Header
          mainPage={false}
          headerText="Your High Scores"
          clickIcon={clickBackIcon}
        />

        <vstack grow alignment="center middle" backgroundColor={Colors.blue}>
          <vstack height="40%" padding="medium" gap="medium" cornerRadius="small" alignment="center middle" backgroundColor={Colors.whiteAlt}>
            <text size="large" wrap>No scores recorded yet for {username}</text>
            <text size="xxlarge" height="30px">Start playing!</text>
          </vstack>
        </vstack>
      </vstack>
    )
  }

  return(
    <vstack width="100%" height="100%" backgroundColor={Colors.blue}>
      <Header
        mainPage={false}
        headerText="Your High Scores"
        clickIcon={clickBackIcon}
      />

      <vstack grow alignment="center middle" backgroundColor={Colors.blue}>
        <vstack alignment="center middle">

          <hstack width="100%" backgroundColor={Colors.whiteAlt}>
            <vstack width="50px" padding="small" alignment="center middle" borderColor={Colors.blackAlt}>
              <text size="large" color={Colors.blackAlt}>
                #
              </text>
            </vstack>
            <vstack width="75px" padding="small" alignment="center middle" borderColor={Colors.blackAlt}>
              <text size="large" color={Colors.blackAlt}>
                Score
              </text>
            </vstack>
            <vstack width="115px" padding="small" alignment="center middle" borderColor={Colors.blackAlt}>
              <text size="large" color={Colors.blackAlt}>
                Date
              </text>
            </vstack>
          </hstack>
    
          {highScores.map((s) => (
            <hstack width="100%" backgroundColor={s.timestamp == gameTimestamp ? "lightslategray": (s.rank % 2 == 0 ? Colors.whiteAlt : Colors.lightGray)}>
              <vstack width="50px" padding="small" alignment="center middle" borderColor={Colors.blackAlt}>
                <text size="large" color={s.timestamp == gameTimestamp ? Colors.whiteAlt : Colors.blackAlt}>
                  {s.rank}
                </text>
              </vstack>
              <vstack width="75px" padding="small" alignment="center middle" borderColor={Colors.blackAlt}>
                <text size="large" color={s.timestamp == gameTimestamp ? Colors.whiteAlt : Colors.blackAlt}>
                  {s.score}
                </text>
              </vstack>
              <vstack width="115px" padding="small" alignment="center middle" borderColor={Colors.blackAlt}>
                <text size="large" color={s.timestamp == gameTimestamp ? Colors.whiteAlt : Colors.blackAlt}>
                  {getFormattedDate(s.timestamp)}
                </text>
              </vstack>
            </hstack>
          ))}
        </vstack>
      </vstack>
    </vstack>
  )
}
