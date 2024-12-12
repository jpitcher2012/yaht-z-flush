import { Devvit, useState } from '@devvit/public-api';
import { Header } from './Header.js';
import { Scorecard } from './Scorecard.js';
import { Die } from './Die.js';
import { RollButton } from './RollButton.js';
import { PlayButton } from './PlayButton.js';
import { Menu } from './Menu.js';
import { GameOver } from './GameOver.js';
import { ConfirmationModal } from './ConfirmationModal.js';
import { InfoModal } from './InfoModal.js';
import { Rules } from './Rules.js';
import { HighScores } from './HighScores.js';
import { Leaderboard } from './Leaderboard.js';
import { createScorecard, calculateScores, propertiesEqual } from '../data/scorecardData.js';
import { DieData, createDie, clearDie, rollDie } from '../data/dieData.js';
import { HighScoreData } from '../data/highScoreData.js';
import { Colors } from '../constants/colors.js';
import moment from 'moment';
import { SplashPage } from './SplashPage.js';

export interface Game {
  username: string,
  userHighScores: Array<HighScoreData>,
  leaderboard: Array<HighScoreData>,
  updateScores: (score: number, timestamp: EpochTimeStamp) => string
}

function jsonify(data: any){
  return JSON.parse(JSON.stringify(data));
}

export const Game: Devvit.BlockComponent<Game> = (
  {
    username,
    userHighScores,
    leaderboard,
    updateScores
  },
  context
) => {

  const postWidth = Number(context.dimensions?.width);
  const cornerRadius = postWidth < 500 ? "none" : "medium";

  let [rollsLeft, setRollsLeft] = useState(3);
  let [roundsLeft, setRoundsLeft] = useState(13);
  let [categorySelected, setCategorySelected] = useState(false);
  let [gameOverImg, setGameOverImg] = useState("game_over.png");
  let [gameTimestamp, setGameTimestamp] = useState(0);
  let [commentUrl, setCommentUrl] = useState('');
  let [showSplashPage, setShowSplashPage] = useState(true);
  let [showMenu, setShowMenu] = useState(false);
  let [showGameOver, setShowGameOver] = useState(false);
  let [showNewGameModal, setShowNewGameModal] = useState(false);
  let [showShareScoreModal, setShowShareScoreModal] = useState(false);
  let [showCommentModal, setShowCommentModal] = useState(false);
  let [showRules, setShowRules] = useState(false);
  let [showHighScores, setShowHighScores] = useState(false);
  let [showLeaderboard, setShowLeaderboard] = useState(false);

  let [scorecard, setScorecard] = useState(() => {
    return jsonify(createScorecard());
  });

  let [dice, setDice] = useState(() => {
    const diceArr = new Array<DieData>;
    for(let i=0; i<5; i++){
      diceArr[i] = createDie(i);
    }
    return jsonify(diceArr);
  });

  function roll(){
    setShowMenu(false);

    if(rollsLeft < 1 || roundsLeft < 1){
      return;
    }

    // Roll the unselected dice
    dice.forEach((die: DieData) => {
      if(!die.selected){
        die = rollDie(die);
      }
    });

    // Score the categories
    scorecard = calculateScores(scorecard, dice);

    rollsLeft--;
    setDice(dice);
    setRollsLeft(rollsLeft);
    setScorecard(scorecard);
  }

  function clickMenuIcon() {
    setShowMenu(!showMenu);
  }

  function clickBackIcon() {
    setShowRules(false);
    setShowHighScores(false);
    setShowLeaderboard(false);
  }

  function clickNewGame(){
    if(roundsLeft == 0 || (roundsLeft == 13 && rollsLeft == 3)){
      startNewGame();
    }
    else{
      setShowNewGameModal(true);
    }
  }

  function startNewGame() {
    setShowSplashPage(false);
    setScorecard(jsonify(createScorecard()));
    setRoundsLeft(13);
    setRollsLeft(3);
    setCategorySelected(false);

    dice.forEach((die: DieData) => {
      die.value = 0;
      die.color = "white";
      die.selected = false;
    })
    setDice(dice);

    setShowNewGameModal(false);
    setShowGameOver(false);
    setShowMenu(false);
  }

  function clickDie(index: number){
    setShowMenu(false);
    if(dice[index].value != 'x'){
      dice[index].selected = !dice[index].selected;
      setDice(dice);
    }
  }

  function clickCategory(index: number){
    setShowMenu(false);
    if(rollsLeft < 3 && !scorecard.categories[index].completed){
      for(let i=0; i<13; i++){
        if(i == index){

          // If the category was already selected, deselect it
          if(scorecard.categories[i].selected){
            scorecard.categories[i].selected = false;
            setCategorySelected(false);
          }

          // If the category was not yet selected, select it
          else{
            scorecard.categories[i].selected = true;
            setCategorySelected(true);
          }
        }

        // Deselect all other categories
        else{
          scorecard.categories[i].selected = false;
        }
      }
      setScorecard(scorecard);
    }
  }

  function scoreCategory(){
    setShowMenu(false);

    if(!categorySelected){
      return;
    }
    
    const isYahtZ = propertiesEqual(dice, 'value');
    const isFlush = propertiesEqual(dice, 'color');

    // Update the yahtZ total if this is a bonus yahtZ
    if(isYahtZ && scorecard.numYahtZs > 0){
      scorecard.numYahtZs++;
      scorecard.categories[12].scoreColor = Colors.blue;

      if(isFlush){
        scorecard.categories[12].score += 200;
        scorecard.totalScore += 200;
      }
      else{
        scorecard.categories[12].score += 100;
        scorecard.totalScore += 100;
      }
    }

    let numLeftCompleted = 0;

    // Update the scorecard
    for(let i=0; i<13; i++){
      if(!scorecard.categories[i].completed){
        if(scorecard.categories[i].selected){
          scorecard.categories[i].completed = true;
          scorecard.categories[i].selected = false;
          scorecard.categories[i].scoreColor = isFlush && scorecard.categories[i].score > 0 ? Colors.red : Colors.blackAlt;

          scorecard.totalScore += scorecard.categories[i].score;

          // Update the left total/bonus
          if(i < 6){
            numLeftCompleted++;
            scorecard.leftTotal += scorecard.categories[i].score;

            if(scorecard.leftTotal >= 63 && scorecard.leftBonus == 0){
              scorecard.leftBonus = 35;
              scorecard.totalScore += 35;
            }
          }

          // If this is the first YahtZ, update numYahtZs
          if(i == 12 && scorecard.categories[i].score > 0){
            scorecard.numYahtZs++;
          }
        }
        else{
          scorecard.categories[i].score = 0;
        }
      }
      else if(i < 6){
        numLeftCompleted++;
      }
    }
    scorecard.leftCompleted = numLeftCompleted > 5;
    setScorecard(scorecard);

    // Clear the dice
    dice.forEach((die: DieData) => {
      die = clearDie(die);
    });
    setDice(dice);

    // Update the roll and round count
    roundsLeft--;
    setRoundsLeft(roundsLeft);
    
    if(roundsLeft > 0){
      setRollsLeft(3);
    }
    else{
      const timestamp = moment().valueOf();
      setRollsLeft(0);
      setCategorySelected(false);
      setGameTimestamp(timestamp);
      
      // Update the high scores and leaderboard and determine the Game Over image to display
      const gameOverImg = updateScores(scorecard.totalScore, timestamp);
      setGameOverImg(gameOverImg);
      setShowGameOver(true);
    }

    // Reset the categorySelected flag
    setCategorySelected(false);
  }

  async function shareScore(){
    const text = `${username ? `u/${username}` : 'An anonymous user'} scored ${scorecard.totalScore}!`;

    const comment = await context.reddit.submitComment({
      id: `${context.postId}`,
      text: text
    });

    setCommentUrl(comment.url);
    setShowShareScoreModal(false);
    setShowCommentModal(true);
  }

  function viewComment(){
    context.ui.navigateTo(commentUrl);
  }

  return (
    <vstack 
      backgroundColor={Colors.blue}
      height="100%"
      width="100%"
      maxWidth="500px"
      cornerRadius={cornerRadius}
    >

      <zstack width="100%" height="100%" alignment="start top">
        <vstack 
          height="100%"
          width="100%"
          gap="medium"
          alignment="center top"
        >
          <Header
            mainPage={true}
            headerText={roundsLeft < 13 ? scorecard.totalScore : ''}
            clickIcon={clickMenuIcon}
          />
          <Scorecard
            scorecard={scorecard}
            canSelectCategory={rollsLeft < 3 && roundsLeft > 0}
            clickCategory={clickCategory}
          />
          <hstack backgroundColor={Colors.darkBlue} width="100%" alignment="center middle">
            <hstack width="96%" gap="small" padding="small" alignment="center middle">
              {dice.map((die: DieData) => (
                  <Die
                    index={die.index}
                    selected={die.selected}
                    img={`die-${die.color}-${die.value}.png`}
                    clickDie={clickDie}
                  />
              ))}
            </hstack>
          </hstack>
          <hstack gap="medium" width="90%" alignment="center middle">
            <RollButton
              rollsLeft={rollsLeft}
              roll={roll}
            />
            <PlayButton
              categorySelected={categorySelected}
              scoreCategory={scoreCategory}
            />
          </hstack>
        </vstack>

        <Menu
          showMenu={showMenu}
          clickMenuIcon={clickMenuIcon}
          clickNewGame={clickNewGame}
          clickShowRules={() => setShowRules(true)}
          clickShowHighScores={() => setShowHighScores(true)}
          clickShowLeaderboard={() => setShowLeaderboard(true)}
        />

        <GameOver
          showGameOver={showGameOver}
          score={scorecard.totalScore}
          img={gameOverImg}
          startNewGame={startNewGame}
          clickShowHighScores={() => setShowHighScores(true)}
          clickShowLeaderboard={() => setShowLeaderboard(true)}
          clickShareScore={() => {setShowGameOver(false); setShowShareScoreModal(true)}}
          cancel={() => setShowGameOver(false)}
        />

        <ConfirmationModal
          showModal={showNewGameModal}
          header="New Game"
          body="Are you sure you want to start a new game? Your current progress will be lost."
          clickYes={startNewGame}
          clickNo={() => setShowNewGameModal(false)}
        />

        <ConfirmationModal
          showModal={showShareScoreModal}
          header="Share Score"
          body="Do you want to add a comment to this post with your score?"
          clickYes={shareScore}
          clickNo={() => {setShowShareScoreModal(false); setShowGameOver(true)}}
        />

        <InfoModal
          showModal={showCommentModal}
          header="Score Shared"
          body="A comment has been added with your score!"
          btnText="View comment"
          clickBtn={viewComment}
          clickClose={() => {setShowCommentModal(false); setShowGameOver(true)}}
        />

        <SplashPage
          showSplashPage={showSplashPage}
          clickNewGame={startNewGame}
          clickShowRules={() => setShowRules(true)}
        />

        <Rules
          showRules={showRules}
          clickBackIcon={clickBackIcon}
        />

        <HighScores
          showHighScores={showHighScores}
          username={username}
          highScores={userHighScores}
          gameTimestamp={gameTimestamp}
          clickBackIcon={clickBackIcon}
        />

        <Leaderboard
          showLeaderboard={showLeaderboard}
          leaderboard={leaderboard}
          username={username}
          clickBackIcon={clickBackIcon}
        />

      </zstack>
    </vstack>
  );
};
