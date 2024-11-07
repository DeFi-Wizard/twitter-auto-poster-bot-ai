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
    " Generate Twitter content focused on memecoins, DeFi, and crypto trends. Each tweet must provide specific, actionable insights in full detail, as if from a human expert. Avoid teaser phrases and make sure any "promised" information is actually given in the post. Each tweet should: Focus on a timely topic in crypto or DeFi, such as a trending memecoin, a notable price movement, or a unique trading insight. Provide all details promised within the tweet itself. For example, if sharing "3 ways to spot a good memecoin," list and explain those three ways clearly. Include any relevant data, recent stats, or brief case studies to add credibility and depth. End with a conversational tone or a quick question to encourage replies, but without sounding too salesy.ff ";

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
