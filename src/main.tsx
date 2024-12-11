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
    await reddit.submitPost({
      title: 'Yaht-Z Flush',
      subredditName: subreddit.name,
      // The preview appears while the post loads
      preview: (
        <vstack height="100%" width="100%" alignment="center middle">
          <text size="large">Loading ...</text>
        </vstack>
      ),
    });
    ui.showToast({ text: 'Added Yaht-Z Flush!' });
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
        if(data.eventType == "leaderboard-update" && data.postId == _context.postId && (data.username != username || data.timestamp != userLastGameTimestamp)){
          setLeaderboard(data.leaderboard);
        }

        // If the user's high scores were updated
        else if (data.eventType == "user-hs-update" && data.username == username && data.timestamp != userLastGameTimestamp){
          setUserHighScores(data.userHighScores);
        }
      }
    });
    channel.subscribe();

    const [userLastGameTimestamp, setUserLastGameTimestamp] = useState(0);

    const [username] = useState(async () => {
      const currUser = await _context.reddit.getCurrentUser();
      return currUser?.username ?? '';
    });

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

    function updateScores(score: number, timestamp: EpochTimeStamp): string{
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

      // If the score is in the user's top 10, update their high scores
      if(userHighScores.length < 10 || score > userHighScores[userHighScores.length - 1].score){
        userHighScores.push(scoreData);
        sortScores(userHighScores);

        if(userHighScores.length > 10){
          userHighScores.length = 10;
        }

        for(let i = 0; i < userHighScores.length; i++){
          userHighScores[i].rank = i + 1;
        }

        if(userHighScores[0].score == score && userHighScores[0]?.timestamp == timestamp){
          gameOverImg = "game_over_hs.png";
        }

        setUserHighScores(userHighScores);
        _context.redis.set(`high_scores_${username}`, JSON.stringify(userHighScores));

        channel.send({
          eventType: "user-hs-update",
          username: username,
          timestamp: timestamp,
          userHighScores: userHighScores
        });
      }

      const prevLeader = leaderboard[0]?.user;

      // If the score is in the top 10 of the leaderboard, update the leaderboard
      if(leaderboard.length < 10 || score > leaderboard[leaderboard.length - 1].score){
        leaderboard.push(scoreData);
        sortScores(leaderboard);

        // If the user is in the leaderboard multiple times, only keep the top score
        leaderboard = leaderboard.filter((entry: HighScoreData, index: number, arr: Array<any>) =>
          arr.findIndex((item: HighScoreData) => item.username === entry.username) === index
        );
        
        if(leaderboard.length > 10){
          leaderboard.length = 10;
        }

        for(let i = 0; i < leaderboard.length; i++){
          leaderboard[i].rank = i + 1;
        }

        if(leaderboard[0].score == score && leaderboard[0].timestamp == timestamp && leaderboard[0].username == username){
          gameOverImg = "game_over_1st.png";
        }

        setLeaderboard(leaderboard);
        _context.redis.set(`leaderboard_${_context.postId}`, JSON.stringify(leaderboard));

        channel.send({
          eventType: "leaderboard-update",
          postId: _context.postId,
          username: username,
          timestamp: timestamp,
          leaderboard: leaderboard
        });
      }

      const newLeader = leaderboard[0].user;

      // If there is a new leader - add a comment to the post
      if(prevLeader && prevLeader != newLeader){
        _context.reddit.submitComment({
         id: `${_context.postId}`,
         text: `New Yaht-Z Flush leader! u/${newLeader} passed u/${prevLeader}, with a score of ${score}!`
        });
      }

      return gameOverImg;
    }

    return (
      <blocks height="tall">
        <vstack height="100%" width="100%" alignment="center top">
          <Game
            username={username}
            userHighScores={userHighScores}
            leaderboard={leaderboard}
            updateScores={updateScores}
           />
        </vstack>
      </blocks>
    );
  },
});

export default Devvit;
