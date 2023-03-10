// Create a Discord Bot using OpenAI API that interacts on the Discord Server
require('dotenv').config();

// Prepare to connect to Discord API
const {Client, GatewayIntentBits} = require('discord.js');
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
})

// Prepare connection to OpenAI API
const {Configuration, OpenAIApi} = require('openai')
const configuration = new Configuration({
  organization: process.env.OPENAI_ORG, apiKey: process.env.OPENAI_KEY
});

const openai = new OpenAIApi(configuration);
const CONVO_MAX_LENGTH = 8;


// Trigger Words that activate the bot
const triggerWords = [
  '<@1083490297377472712', 'айляк', 'тепе', 'кичук', 'чай', 'бот', 'bot', 'кажи', 'обясни', 'предложи', 'как', 'дай', 'zigi', 'кое', 'напиши', 'ся', '\\?', 'колко'
]

// Example behavior
const philosopher = {"role": "system", "content": "I want you to act as a Socrat. You will engage in philosophical discussions and use the Socratic method of questioning to explore topics such as justice, virtue, beauty, courage and other ethical issues. Бъди добър забавен събеседник chatbot."}
const lifecoach = {"role": "system", "content": "I want you to act as a life coach. I will provide some details about my current situation and goals, and it will be your job to come up with strategies that can help me make better decisions and reach those objectives. This could involve offering advice on various topics, such as creating plans for achieving success or dealing with difficult emotions."}
const comedian = {"role": "system","content": "I want you to act as a stand-up comedian. You should also be sure to incorporate personal anecdotes or experiences into the routine in order to make it more relatable and engaging for the audience."}

// Seed messages
const initialMessages = [
  comedian,
  {"role": "user", "content": "Отговаряй на всички неща, които ти казвам."},
  {"role": "assistant", "content": "Добре."},
]

let messages = [...initialMessages]
// Check for when a message on discord is sent
client.on('messageCreate', async function (message) {
  try {
    // Don't respond to the bot's messages
    if (message.author.bot) return;

    // Add the users' message
    messages.push({"role": "user", "content": `${message.author.username}: ${message.content}`})

    // Respond only on the users message
    if (new RegExp(triggerWords.join("|")).test(message.content.toLowerCase())) {
      await message.channel.sendTyping()

      const response = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages,
        temperature: 1.2
      })
      let responseMessage = response.data.choices[0].message;
      messages.push(responseMessage)
      await message.reply(responseMessage.content);
    }

    // Merge and truncate the conversation to the max length so not to send too many requests
    messages = [...initialMessages, ...messages.slice(-CONVO_MAX_LENGTH)]
    console.clear()
    console.log(messages, messages.length)
  } catch (err) {
    console.log(err)
  }
})

// Log the bot into Discord
client.login(process.env.DISCORD_TOKEN)
console.log("ChatGPT Bot is Online on Discord")