import { Devvit } from '@devvit/public-api';
import { Header } from './Header.js';
import { HighScoreData, getFormattedDate } from '../data/highScoreData.js';
import { Colors } from '../constants/colors.js';

interface LeaderboardProps {
  showLeaderboard: boolean;
  leaderboard: Array<HighScoreData>;
  username: string;
  gameIsActive: boolean;
  clickBackIcon: () => void;
}

export const Leaderboard: Devvit.BlockComponent<LeaderboardProps> = (
  {
    showLeaderboard,
    leaderboard,
    username,
    gameIsActive,
    clickBackIcon
  },
  context
) => {

  function openUser(username: string){
    context.ui.navigateTo(`https://www.reddit.com/user/${username}`);
  }

  if(!showLeaderboard){
    return(
      <vstack/>
    );
  }

  if(leaderboard.length == 0){
    return(
      <vstack width="100%" height="100%" backgroundColor={Colors.blue}>
        <Header
          mainPage={false}
          headerText="Leaderboard"
          clickIcon={clickBackIcon}
        />

        <vstack grow alignment="center middle" backgroundColor={Colors.blue}>
          <vstack height="40%" padding="medium" gap="medium" cornerRadius="small" alignment="center middle" backgroundColor={Colors.whiteAlt}>
            <text size="large">No scores recorded yet</text>
            <text size="xxlarge" height="30px">Start playing!</text>
          </vstack>
        </vstack>
      </vstack>
    )
  }

  const headerText = `Leaderboard (${gameIsActive ? "Active" : "Final"})`;

  return(
    <vstack width="100%" height="100%" backgroundColor={Colors.blue}>
      <Header
        mainPage={false}
        headerText={headerText}
        clickIcon={clickBackIcon}
      />

      <vstack grow alignment="center middle" backgroundColor={Colors.blue}>
        <vstack width="100%" maxWidth="450px" alignment="center middle">

          <hstack width="100%" backgroundColor={Colors.whiteAlt}>
            <vstack width="50px" padding="small" alignment="center middle" borderColor={Colors.blackAlt}>
              <text size="large" color={Colors.blackAlt}>
                #
              </text>
            </vstack>
            <vstack grow padding="small" borderColor={Colors.blackAlt}>
              <text size="large" color={Colors.blackAlt}>
                User
              </text>
            </vstack>
            <vstack width="65px" padding="small" alignment="center middle" borderColor={Colors.blackAlt}>
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
    
          {leaderboard.map((l) => (
            <hstack width="100%" backgroundColor={l.username == username ? "lightslategray": (l.rank % 2 == 0 ? Colors.whiteAlt : Colors.lightGray)}>
              <vstack width="50px" padding="small" alignment="center middle" borderColor={Colors.blackAlt}>
                <text size="large" color={l.username == username ? Colors.whiteAlt : Colors.blackAlt}>
                  {l.rank}
                </text>
              </vstack>
              <vstack grow padding="small" borderColor={Colors.blackAlt} onPress={() => openUser(l.username)}>
                <text size="large" color={l.username == username ? Colors.whiteAlt : Colors.blackAlt}>
                  {l.username}
                </text>
              </vstack>
              <vstack width="65px" padding="small" alignment="center middle" borderColor={Colors.blackAlt}>
                <text size="large" color={l.username == username ? Colors.whiteAlt : Colors.blackAlt}>
                  {l.score}
                </text>
              </vstack>
              <vstack width="115px" padding="small" alignment="center middle" borderColor={Colors.blackAlt}>
                <text size="large" color={l.username == username ? Colors.whiteAlt : Colors.blackAlt}>
                  {getFormattedDate(l.timestamp)}
                </text>
              </vstack>
            </hstack>
          ))}
        </vstack>
      </vstack>
    </vstack>
  )
}
