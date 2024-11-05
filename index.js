// By VishwaGauravIn (https://itsvg.in)

const GenAI = require("@google/generative-ai");
const { TwitterApi } = require("twitter-api-v2");
const SECRETS = require("./SECRETS");

const twitterClient = new TwitterApi({
  appKey: SECRETS.APP_KEY,
  appSecret: SECRETS.APP_SECRET,
  accessToken: SECRETS.ACCESS_TOKEN,
  accessSecret: SECRETS.ACCESS_SECRET,
});

const generationConfig = {
  maxOutputTokens: 400,
};
const genAI = new GenAI.GoogleGenerativeAI(SECRETS.GEMINI_API_KEY);

async function run() {
  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({
    model: "gemini-pro",
    generationConfig,
  });

  // Write your prompt here
  const prompt =
    "Create a highly engaging tweet that’s on top of the latest crypto trends and memecoin market buzz, Start with a provocative question, hot take, or bold statement that addresses current debates or popular topics, like trending memecoin themes or tools, the next big meme coin, or recent price swings, to name a few. Use exciting language to spark curiosity and FOMO, and mix in a popular hashtag like #Crypto or #Altcoin to get more eyes on it. Make it relatable to both new traders and seasoned ‘degens’ by adding insights, speculation, or humor around a trending topic. Keep the tone bold, witty, and slightly mysterious—something that begs for a retweet! be unique and engaging, include an occasional call to like and follow; under 280 characters and should be plain text, you can use hashtags and emojis";

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  console.log(text);
  sendTweet(text);
}

run();

async function sendTweet(tweetText) {
  try {
    await twitterClient.v2.tweet(tweetText);
    console.log("Tweet sent successfully!");
  } catch (error) {
    console.error("Error sending tweet:", error);
  }
}
