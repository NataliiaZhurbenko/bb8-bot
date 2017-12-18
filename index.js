const apiai = require('apiai');
const Telegraf = require('telegraf');
const uuidV1 = require('uuid/v1');

const TELEGRAM_BOT_TOKEN = '465541659:AAG-EHr9nfDZ5w06S3YSNDhNHX2C6mWXSn8';
const DIALOG_FLOW_CLIENT_ACCESS_TOKEN = '7f961005ef734f54b4c1e2b41a4e2207';


function startBot() {
	let bot = new Telegraf(TELEGRAM_BOT_TOKEN);

	bot.on('message', transferMsg);

	bot.startPolling();
}

function transferMsg(ctx) {
	let dialogFlowApp = apiai(DIALOG_FLOW_CLIENT_ACCESS_TOKEN);

	let request = dialogFlowApp.textRequest(ctx.message.text, {
		sessionId: uuidV1()
	});

	request.on('response', response => {
		ctx.reply(response.result.fulfillment.speech);
	});

	request.on('error', error => {
		ctx.reply(error);
	});

	request.end();
}

startBot();
