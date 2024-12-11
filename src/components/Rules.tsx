import { Devvit, useState } from '@devvit/public-api';
import { Header } from './Header.js';
import { Colors } from '../constants/colors.js';

interface RulesProps {
  showRules: boolean;
  clickBackIcon: () => void;
}

export const Rules: Devvit.BlockComponent<RulesProps> = (
  {
    showRules,
    clickBackIcon
  }
) => {
  
  let [pageSelected, setPageSelected] = useState(1);

  let leftCategories = [
    { index: 0, name: "Ones" },
    { index: 1, name: "Twos" },
    { index: 2, name: "Threes" },
    { index: 3, name: "Fours" },
    { index: 4, name: "Fives" },
    { index: 5, name: "Sixes" }
  ]

  if(!showRules){
    return(
      <vstack/>
    );
  }

  if(![1,2,3,4].includes(pageSelected)){
    pageSelected = 1;
  }

  if(pageSelected == 1){
    return(
      <vstack width="100%" height="100%" backgroundColor={Colors.blue}>

        <Header
          mainPage={false}
          headerText="How to Play"
          clickIcon={() => {clickBackIcon(); setPageSelected(1)}}
        />

        <vstack grow padding="large" alignment="center middle">
          <vstack width="100%" height="100%" padding="large" gap="medium" cornerRadius="small" backgroundColor={Colors.whiteAlt}>
            <text weight="bold" style="heading">
              Overview
            </text>
            <text wrap>
              A new twist on the classic dice game! The dice now have each number in 2 possible colors. 
              When all 5 dice are the same color, you have rolled a FLUSH and scores for that round are doubled!
            </text>
            <text wrap>
              For each round, you can roll the dice up to 3 times. Click any dice to select them and prevent them from being rolled. Click again to deselect.
            </text>
            <text wrap>
              When you are ready to submit your score for the round, click the desired category in the scorecard and press PLAY.
            </text>

            <hstack grow gap="small" alignment="center bottom">
              <spacer width="20px"/>
              <icon size="small" name="radio-button-fill"/>
              <icon size="small" name="radio-button" onPress={() => setPageSelected(2)}/>
              <icon size="small" name="radio-button" onPress={() => setPageSelected(3)}/>
              <icon size="small" name="radio-button" onPress={() => setPageSelected (4)}/>
              <icon size="small" name="right-fill" onPress={() => setPageSelected(pageSelected + 1)}/>
            </hstack>
          </vstack>
        </vstack>
      </vstack>
    )
  }

  if(pageSelected == 2){
    return(
      <vstack width="100%" height="100%" backgroundColor={Colors.blue}>

        <Header
          mainPage={false}
          headerText="How to Play"
          clickIcon={() => {clickBackIcon(); setPageSelected(1)}}
        />

        <vstack grow padding="large" alignment="center middle">
          <vstack width="100%" height="100%" padding="large" gap="medium" cornerRadius="small" backgroundColor={Colors.whiteAlt}>
            <text weight="bold" style="heading">
              Scoring - Left Side
            </text>

            <vstack width="100%" alignment="center middle">
              <vstack width="100%" borderColor={Colors.blackAlt}>

                {leftCategories.map((category: any) => (
                  <hstack height="30px" alignment="center middle" borderColor={Colors.blackAlt} backgroundColor={category.index % 2 == 1 ? Colors.whiteAlt : Colors.lightGray}>
                    <vstack width="27%" padding="small">
                      <text size="medium" color={Colors.blackAlt}>
                        {category.name}
                      </text>
                    </vstack>
                    <vstack height="100%" width="2px" backgroundColor={Colors.blackAlt}/>
                    <vstack width="73%" padding="small">
                      <text size="medium" color={Colors.blackAlt}>
                          Sum of all {category.name}
                      </text>
                    </vstack>
                  </hstack>
                ))}

                <hstack height="30px" alignment="center middle" borderColor={Colors.blackAlt} backgroundColor={Colors.lightGray}>
                  <vstack width="27%" padding="small">
                    <text size="medium" color={Colors.blackAlt}>
                      Bonus
                    </text>
                  </vstack>
                  <vstack height="100%" width="2px" backgroundColor={Colors.blackAlt}/>
                  <vstack width="73%" padding="small">
                    <text size="medium" color={Colors.blackAlt}>
                      35 pts - If sum of above scores is 63+
                    </text>
                  </vstack>
                </hstack>
              </vstack>
            </vstack>

            <hstack grow gap="small" alignment="center bottom">
              <icon size="small" name="left-fill" onPress={() => setPageSelected(pageSelected - 1)}/>
              <icon size="small" name="radio-button" onPress={() => setPageSelected(1)}/>
              <icon size="small" name="radio-button-fill"/>
              <icon size="small" name="radio-button" onPress={() => setPageSelected(3)}/>
              <icon size="small" name="radio-button" onPress={() => setPageSelected (4)}/>
              <icon size="small" name="right-fill" onPress={() => setPageSelected(pageSelected + 1)}/>
            </hstack>
          </vstack>
        </vstack>
      </vstack>
    )
  }

  if(pageSelected == 3){
    return(
      <vstack width="100%" height="100%" backgroundColor={Colors.blue}>

        <Header
          mainPage={false}
          headerText="How to Play"
          clickIcon={() => {clickBackIcon(); setPageSelected(1)}}
        />

        <vstack grow padding="large" alignment="center middle">
          <vstack width="100%" height="100%" padding="large" gap="medium" cornerRadius="small" backgroundColor={Colors.whiteAlt}>
            <text weight="bold" style="heading">
              Scoring - Right Side
            </text>

            <vstack width="100%" alignment="center middle">
              <vstack width="100%" borderColor={Colors.blackAlt}>

                <hstack height="30px" alignment="center middle" borderColor={Colors.blackAlt} backgroundColor={Colors.lightGray}>
                  <vstack width="27%" padding="small">
                    <text size="medium" color={Colors.blackAlt}>
                      Chance
                    </text>
                  </vstack>
                  <vstack height="100%" width="2px" backgroundColor={Colors.blackAlt}/>
                  <vstack width="73%" padding="small">
                    <text size="medium" color={Colors.blackAlt}>
                      Score: Sum of all dice
                    </text>
                  </vstack>
                </hstack>
                <hstack height="45px" alignment="center middle" borderColor={Colors.blackAlt} backgroundColor={Colors.whiteAlt}>
                  <vstack width="27%" padding="small">
                    <text size="medium" color={Colors.blackAlt}>
                      Full House
                    </text>
                  </vstack>
                  <vstack height="100%" width="2px" backgroundColor={Colors.blackAlt}/>
                  <vstack width="73%" height="100%" padding="small" alignment="start middle">
                    <text size="medium" color={Colors.blackAlt}>
                      3 of one number and 2 of another *
                    </text>
                    <text size="medium" color={Colors.blackAlt}>
                      Score: 25 pts
                    </text>
                  </vstack>
                </hstack>
                <hstack height="45px" alignment="center middle" borderColor={Colors.blackAlt} backgroundColor={Colors.lightGray}>
                  <vstack width="27%" padding="small">
                    <text size="medium" color={Colors.blackAlt}>
                      Sm Straight
                    </text>
                    <text size="medium" color={Colors.blackAlt}>
                      Lg Straight
                    </text>
                  </vstack>
                  <vstack height="100%" width="2px" backgroundColor={Colors.blackAlt}/>
                  <vstack width="73%" height="100%" padding="small" alignment="start middle">
                  <text size="medium" alignment="start middle" color={Colors.blackAlt}>
                      4 | 5 numbers in a row (ex: 2-3-4-5) *
                    </text>
                    <text size="medium" color={Colors.blackAlt}>
                      Score: 30 pts | 40 pts
                    </text>
                  </vstack>
                </hstack>
                <hstack height="45px" alignment="center middle" borderColor={Colors.blackAlt} backgroundColor={Colors.whiteAlt}>
                  <vstack width="27%" padding="small">
                    <text size="medium" color={Colors.blackAlt}>
                      3 of a Kind
                    </text>
                    <text size="medium" color={Colors.blackAlt}>
                      4 of a Kind
                    </text>
                  </vstack>
                  <vstack height="100%" width="2px" backgroundColor={Colors.blackAlt}/>
                  <vstack width="73%" height="100%" padding="small" alignment="start middle">
                    <text size="medium" color={Colors.blackAlt}>
                      Sum of all dice
                    </text>
                    <text size="medium" alignment="start middle" color={Colors.blackAlt}>
                      At least 3 | 4 of the same number
                    </text>
                  </vstack>
                </hstack>
                <hstack height="45px" alignment="center middle" borderColor={Colors.blackAlt} backgroundColor={Colors.lightGray}>
                  <vstack width="27%" padding="small">
                    <text size="medium" color={Colors.blackAlt}>
                      Yaht-Z
                    </text>
                  </vstack>
                  <vstack height="100%" width="2px" backgroundColor={Colors.blackAlt}/>
                  <vstack width="73%" height="100%" padding="small" alignment="start middle">
                    <text size="medium" alignment="start middle" color={Colors.blackAlt}>
                      5 of the same number
                    </text>
                    <text size="medium" color={Colors.blackAlt}>
                      Score: 50 pts + 100 for each additional
                    </text>
                  </vstack>
                </hstack>
              </vstack>
            </vstack>

            <text wrap>
              * If you roll a Yaht-Z and that category is unavailable, you can count it as a Full House, Sm Straight, or Lg Straight
            </text>

            <hstack grow gap="small" alignment="center bottom">
              <icon size="small" name="left-fill" onPress={() => setPageSelected(pageSelected - 1)}/>
              <icon size="small" name="radio-button" onPress={() => setPageSelected(1)}/>
              <icon size="small" name="radio-button" onPress={() => setPageSelected(2)}/>
              <icon size="small" name="radio-button-fill"/>
              <icon size="small" name="radio-button" onPress={() => setPageSelected (4)}/>
              <icon size="small" name="right-fill" onPress={() => setPageSelected(pageSelected + 1)}/>
            </hstack>
          </vstack>
        </vstack>
      </vstack>
    )
  }

  if(pageSelected == 4){
    return(
      <vstack width="100%" height="100%" backgroundColor={Colors.blue}>

        <Header
          mainPage={false}
          headerText="How to Play"
          clickIcon={() => {clickBackIcon(); setPageSelected(1)}}
        />

        <vstack grow padding="large" alignment="center middle">
          <vstack width="100%" height="100%" padding="large" gap="medium" cornerRadius="small" backgroundColor={Colors.whiteAlt}>
            <text weight="bold" style="heading">
              Tracking & Sharing Scores
            </text>
            <text wrap>
              If you are logged into Reddit, you can view your top 10 scores on the High Scores page. These scores are synced across all Yaht-Z Flush instances.
            </text>
            <text wrap>
              Logged-in users are also eligible for the Leaderboard, which displays the top 10 users with the highest scores for this Yaht-Z Flush post. 
            </text>
            <text wrap>
              After completing a game, you can share your score as a comment on the post. 
              This is available for anyone but will only include your username if you are logged in.
            </text>

            <hstack grow gap="small" alignment="center bottom">
              <icon size="small" name="left-fill" onPress={() => setPageSelected(pageSelected - 1)}/>
              <icon size="small" name="radio-button" onPress={() => setPageSelected(1)}/>
              <icon size="small" name="radio-button" onPress={() => setPageSelected(2)}/>
              <icon size="small" name="radio-button" onPress={() => setPageSelected(3)}/>
              <icon size="small" name="radio-button-fill"/>
              <spacer width="20px"/>
            </hstack>
          </vstack>
        </vstack>
      </vstack>
    )
  }

  return(
    <vstack/>
  );
}
