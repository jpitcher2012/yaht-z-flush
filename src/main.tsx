import { Devvit, useState, useChannel } from '@devvit/public-api';
import { Game } from './components/Game.js';
import { HighScoreData } from './data/highScoreData.js';

Devvit.configure({
  redditAPI: true,
  redis: true,
  realtime: true
});

// Add a menu item to the subreddit menu for instantiating the game
Devvit.addMenuItem({
  label: 'Add Yaht-Z Flush',
  location: 'subreddit',
  forUserType: 'moderator',
  onPress: async (_event, context) => {
    const { reddit, ui } = context;
    const subreddit = await reddit.getCurrentSubreddit();
    const lastGameNumber = await context.redis.get("last_game_number");
    const gameNumber = lastGameNumber ? Number(lastGameNumber) + 1 : 1;

    const post = await reddit.submitPost({
      title: `Yaht-Z Flush - Game #${gameNumber}`,
      subredditName: subreddit.name,
      // The preview appears while the post loads
      preview: (
        <vstack height="100%" width="100%" alignment="center middle">
          <image imageWidth="100px" imageHeight="100px" url="spinner.gif"/>
        </vstack>
      ),
    });
    ui.showToast({ text: `Added Yaht-Z Flush - Game #${gameNumber}!` });

    context.redis.set("last_game_number", String(gameNumber));
    context.redis.set(`game_number_${post.id}`, String(gameNumber));
    context.redis.set(`game_active_${post.id}`, "true");

    reddit.setPostFlair({
      subredditName: subreddit.name,
      postId: post.id,
      text: "Active Game"
    })
  },
});

// Add a post type definition
Devvit.addCustomPostType({
  name: 'Experience Post',
  height: 'tall',
  render: (_context) => {

    // Set up a channel to receive real-time updates
    const channel = useChannel({
      name: "events",
      onMessage: (data: any) => {
        
        // If the leaderboard for this post was updated
        if(data?.eventType == "leaderboard-update" && data.postId == _context.postId && (data.username != username || data.timestamp != userLastGameTimestamp)){
          setLeaderboard(data.leaderboard);
        }

        // If the user's high scores were updated
        else if (data?.eventType == "user-hs-update" && data.username == username && data.timestamp != userLastGameTimestamp){
          setUserHighScores(data.userHighScores);
        }

        // If the game state changed (completed/active)
        else if (data?.eventType == "game-state-update" && data.postId == _context.postId){
          setGameIsActive(data.isActive);
        }
      }
    });
    channel.subscribe();

    // Used while testing
    // clearHighScores("girafferunner");
    // clearLastGameNumber();

    const [userLastGameTimestamp, setUserLastGameTimestamp] = useState(0);

    const [subreddit] = useState(async () => {
      const subreddit = await _context.reddit.getCurrentSubreddit();
      return subreddit?.name ?? '';
    });

    const [username] = useState(async () => {
      const currUser = await _context.reddit.getCurrentUser();
      return currUser?.username ?? '';
    });

    const [isModerator] = useState(async () => {
      if(!username){
        return false;
      }
      const mods = await _context.reddit.getModerators({
        subredditName: subreddit,  
        username: username
      }).all();
      return mods.length > 0;
    })

    const [userHighScores, setUserHighScores] = useState(async () => {
      let highScoresString = await _context.redis.get(`high_scores_${username}`);

      if(highScoresString){
        let highScores = JSON.parse(highScoresString);
        sortScores(highScores);
        highScoresString = JSON.stringify(highScores);
      }

      return highScoresString ? JSON.parse(highScoresString) : [];
    });

    let [leaderboard, setLeaderboard] = useState(async () => {
      let leaderboardString = await _context.redis.get(`leaderboard_${_context.postId}`);

      if(leaderboardString){
        let leaderboard = JSON.parse(leaderboardString);
        sortScores(leaderboard);
        leaderboardString = JSON.stringify(leaderboard);
      }

      return leaderboardString ? JSON.parse(leaderboardString) : [];
    });

    let [gameIsActive, setGameIsActive] = useState(async () => {
      let gameActive = await _context.redis.get(`game_active_${_context.postId}`);
      return gameActive == "false" ? false : true;
    });

    let [gameNumber] = useState(async () => {
      let gameNumber = await _context.redis.get(`game_number_${_context.postId}`);
      return gameNumber ? gameNumber : "";
    });

    function sortScores(scores: Array<HighScoreData>){
      scores.sort((a: HighScoreData, b: HighScoreData) => {
        if(a.score > b.score){
          return -1;
        }
        else if(a.score < b.score){
          return 1;
        }
        else{
          return a.timestamp - b.timestamp; 
        }
      });
    }

    async function updateScores(score: number, timestamp: EpochTimeStamp): Promise<string>{
      setUserLastGameTimestamp(timestamp);

      let gameOverImg = "game_over.png";

      // Don't update high scores or leaderboard if the user is not logged in
      if(!username){
        return gameOverImg;
      }

      const scoreData = {
        rank: undefined,
        username: username,
        score: score,
        timestamp: timestamp
      }

      let highScores = userHighScores;

      // Get the latest high scores from redis in case realtime updates were missed
      let highScoresString = await _context.redis.get(`high_scores_${username}`);
      if(highScoresString){
        highScores = JSON.parse(highScoresString);
        sortScores(highScores);
      }

      // If the score is in the user's top 10, update their high scores
      if(highScores.length < 10 || score > highScores[highScores.length - 1].score){
        highScores.push(scoreData);
        sortScores(highScores);

        if(highScores.length > 10){
          highScores.length = 10;
        }

        for(let i = 0; i < highScores.length; i++){
          highScores[i].rank = i + 1;
        }

        if(highScores[0].score == score && highScores[0]?.timestamp == timestamp){
          gameOverImg = "game_over_hs.png";
        }

        setUserHighScores(highScores);
        _context.redis.set(`high_scores_${username}`, JSON.stringify(highScores));

        channel.send({
          eventType: "user-hs-update",
          username: username,
          timestamp: timestamp,
          userHighScores: highScores
        });
      }

      // If the game is still active, see if the leaderboard needs to be updated
      if(gameIsActive){
        let leaders = leaderboard;

        // Get the latest leaderboard from redis in case realtime updates were missed
        let leaderboardString = await _context.redis.get(`leaderboard_${_context.postId}`);
        if(leaderboardString){
          leaders = JSON.parse(leaderboardString);
          sortScores(leaders);
        }

        // If the score is in the top 10 of the leaderboard, update the leaderboard
        if(leaders.length < 10 || score > leaders[leaders.length - 1].score){
          leaders.push(scoreData);

          // If there is a new leader - add a comment to the post
          if(score > leaders[0].score){
            const prevLeader = leaders[0].username;
            if(prevLeader != username){
              _context.reddit.submitComment({
                id: `${_context.postId}`,
                text: `New Yaht-Z Flush leader${gameNumber ? " for game #" + gameNumber : ""}! u/${username} passed u/${prevLeader}, with a score of ${score}!`
              });
            }
          }

          sortScores(leaders);

          // If the user is in the leaderboard multiple times, only keep the top score
          leaders = leaders.filter((entry: HighScoreData, index: number, arr: Array<any>) =>
            arr.findIndex((item: HighScoreData) => item.username === entry.username) === index
          );
          
          if(leaders.length > 10){
            leaders.length = 10;
          }

          for(let i = 0; i < leaders.length; i++){
            leaders[i].rank = i + 1;
          }

          if(leaders[0].score == score && leaders[0].username == username){
            gameOverImg = "game_over_1st.png";
          }

          setLeaderboard(leaders);
          _context.redis.set(`leaderboard_${_context.postId}`, JSON.stringify(leaders));

          channel.send({
            eventType: "leaderboard-update",
            postId: _context.postId,
            username: username,
            timestamp: timestamp,
            leaderboard: leaders
          });
        }
      }

      return gameOverImg;
    }

    function updateActiveState(isActive: boolean){
      setGameIsActive(isActive);

      if(_context.postId){

        _context.redis.set(`game_active_${_context.postId}`, String(isActive));

        channel.send({
          eventType: "game-state-update",
          postId: _context.postId,
          isActive: isActive
        });
      
        const flairText = isActive ? "Active Game" : "Completed Game";
    
        _context.reddit.setPostFlair({
          subredditName: subreddit,
          postId: _context.postId,
          text: flairText
        });

        // If the game has been completed, find the winner
        if(!isActive){

          let commentText = `Yaht-Z Flush Game${gameNumber ? " #" + gameNumber : ""} is over!`;

          if(leaderboard.length > 0){
            commentText = commentText + ` The winner is u/${[leaderboard[0].username]}, with a score of ${leaderboard[0].score}!`;
          }

          _context.reddit.submitComment({
            id: `${_context.postId}`,
            text: commentText
           });
           
          _context.reddit.setUserFlair({
            subredditName: subreddit,
            username: leaderboard[0].username,
            text: "Champion!"
          })
        }
        else{
          _context.reddit.submitComment({
            id: `${_context.postId}`,
            text: "False alarm! The game is still on!"
          });
        }
      }
    }

    // Used while testing
    function clearHighScores(user: string){
      _context.redis.set(`high_scores_${user}`, JSON.stringify([]));

      channel.send({
        eventType: "user-hs-update",
        username: user,
        timestamp: Date.now(),
        userHighScores: []
      });
    }
    function clearLastGameNumber(){
      _context.redis.set("last_game_number", "0");
    }

    return (
      <blocks height="tall">
        <vstack height="100%" width="100%" alignment="center top">
          <Game
            gameIsActive={gameIsActive}
            userIsModerator={isModerator}
            username={username}
            userHighScores={userHighScores}
            leaderboard={leaderboard}
            updateScores={updateScores}
            updateActiveState={updateActiveState}
           />
        </vstack>
      </blocks>
    );
  },
});


export default Devvit;
