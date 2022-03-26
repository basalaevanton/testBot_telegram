const { from } = require('form-data');
const TelegramApi = require('node-telegram-bot-api');
const { gameOptions, againOptions } = require('./options');

const token = '5135697417:AAH9_vrYF1PB2s2UhbvwzmPCO7YOCN5ExQg';

const bot = new TelegramApi(token, { polling: true });

const chats = {};

const startGame = async (chatId) => {
  await bot.sendMessage(
    chatId,
    `I will riddling number from 0 to 9, and you must guess!`
  );
  const randomNumber = Math.floor(Math.random() * 10);
  chats[chatId] = randomNumber;
  await bot.sendMessage(chatId, 'Guessing!', gameOptions);
};

const start = () => {
  bot.setMyCommands([
    { command: '/start', description: 'Start welcom' },
    { command: '/info', description: 'Info user' },
    { command: '/game', description: 'Play new game' },
  ]);

  bot.on('message', async (msg) => {
    // console.log(msg);
    const text = msg.text;
    const chatId = msg.chat.id;
    //   bot.sendMessage(chatId, `You write me ${text}`);

    if (text === '/start') {
      await bot.sendSticker(
        chatId,
        'https://tlgrm.ru/_/stickers/d97/c1e/d97c1e8a-943c-37c4-963f-8db69b18db05/2.webp'
      );
      return bot.sendMessage(chatId, 'Welcom to my chatBot');
    }
    if (text === '/info') {
      return bot.sendMessage(
        chatId,
        `Your name ${msg.from.first_name} ${msg.from.last_name}`
      );
    }
    if (text === '/game') {
      return startGame(chatId);
    }
    return bot.sendMessage(chatId, 'I don`t understand you');
  });

  bot.on('callback_query', async (msg) => {
    const data = msg.data;
    const chatId = msg.message.chat.id;
    if (data === '/again') {
      return startGame(chatId);
    }
    if (data === chats[chatId]) {
      return bot.sendMessage(
        chatId,
        `Congratulations, you guessed it, this number is ${chats[chatId]}`,
        againOptions
      );
    } else {
      return bot.sendMessage(
        chatId,
        `Sorry, you not guessed  ${chats[chatId]}`,
        againOptions
      );
    }
    // bot.sendMessage(chatId, `You choose number ${data}`);
    // console.log(msg);
  });
};

start();
