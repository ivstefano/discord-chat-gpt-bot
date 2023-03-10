# Discord Chatbot using GPT
This is a Discord chatbot that uses the GPT language model to respond to trigger words in chat. This bot is written in JavaScript and uses the discord.js library to interact with the Discord API.

## How it Works
The bot uses the OpenAI GPT language model to generate responses to messages in chat that contain specific trigger words. The trigger words and corresponding responses are stored in a JSON file, which the bot reads when it starts up. When a user sends a message that contains a trigger word, the bot generates a response using GPT and sends it to the chat.

## Setup
To set up this bot on your own server, follow these steps:

1. Clone this repository to your local machine.
```zsh
git clone git@github.com:ivstefano/discord-chat-gpt-bot.git
```
2. Create a new Discord Bot and give it permissions:
   1. Go to https://discord.com/developers/applications click the button `[New Application]`, give the application a name 
   2. Go to the menu on the left `Bot` and click on `Add Bot`, then confirm the message with `Yes, Do It`
   3. Go to the bottom of the newly created bot and enable 'MESSAGE CONTENT INTENT'
   4. Copy the Client ID from 'Oauth2' -> 'General'
3. Add the bot to your Discord server
   1. In the following link replace CLIENT_ID with the copied Client ID from the previous step in the following link: https://discord.com/oauth2/authorize?scope=bot&permissions=8&client_id=CLIENT_ID
   2. Select from the dropdown the server you want to add your bot to
4. Install the required Node.js modules (discord.js, openai, and dotenv):
```zsh
npm i
```
5. Duplicate `.env.local` file in the project directory and give it the name `.env`. Add the required tokens in it
```dotenv
DISCORD_TOKEN="Here is the discord bot token you can find in the 'Bot' submenu of your application"
OPENAI_ORG="Here ist he OpenAI org token"
OPENAI_KEY="Here is the OpenAI key"
```
6. Start the bot server.
```zsh
node index.js
```
      

## Usage
Once the bot is running on your server, it will automatically respond to messages that contain any of the trigger words defined in `index.js` `triggerWords` constant. 
You can modify the trigger words and responses in that file to customize the bot's behavior.

## Credits
This bot was created by Zigi. It uses the following libraries and APIs:

discord.js: https://discord.js.org/
OpenAI GPT API: https://beta.openai.com/docs/api-reference/introduction

## Contributing
If you have any suggestions or improvements for this bot, feel free to fork the repository and submit a pull request. Please make sure that your code follows JavaScript and Node.js best practices and includes appropriate documentation.