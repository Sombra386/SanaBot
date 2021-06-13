require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();

client.login(process.env.DISCORD_TOKEN);

client.on('ready', () => {
	console.log(`${client.user.tag} is ON`);
});

client.on('message', message => {
	if (message.content === 'hola') {
		message.channel.send('Hola!');
		if (message.author.bot) return;
	}
	if (message.content === 'hola sana') {
		message.channel.send('Hola!');
	}
	if (message.content === '<@!829759709409181706> hola') {
		message.channel.send('Hola!');
		if (message.author.bot) return;
	}
	if (message.content === 'buenos dias') {
		message.channel.send('Buenos dias!');
		if (message.author.bot) return;
	}
	if (message.content === '<@!829759709409181706> como estas?') {
		message.reply('Bien gracias! y tu?');
	}
	if (message.content === 'feliz cumple') {
		message.channel.send('Felicidades!!');
	}
	if (message.content === 'bye') {
		message.reply('Bye bye!');
	}
	if (message.content === '<@&838931057369022505> ❃ Dramas destacados -Junio 2021 ❃') {
		message.channel.send('https://drama.fandom.com/es/wiki/Imitation');
		message.channel.send('https://drama.fandom.com/es/wiki/Use_For_My_Talent');
		message.channel.send('https://drama.fandom.com/es/wiki/Praomook');
	}
	if (message.content === '<@&838931057369022505> ❃ Artistas destacados -Junio 2021 ❃') {
		message.channel.send('https://drama.fandom.com/es/wiki/Lee_Seung_Gi');
		message.channel.send('https://drama.fandom.com/es/wiki/Lee_Hye_Ri');
		message.channel.send('https://drama.fandom.com/es/wiki/Lee_Sang_Yeob');
	}
	if (message.content === '<@&838931057369022505> ❃ Grupos destacados -Junio 2021 ❃') {
		message.channel.send('https://drama.fandom.com/es/wiki/EVERGLOW');
		message.channel.send('https://drama.fandom.com/es/wiki/TXT');
		message.channel.send('https://drama.fandom.com/es/wiki/Rocket_Punch');
	}
	if (message.content.startsWith === '<@!376186027808915467>') {
			message.react('💗');
	}
});