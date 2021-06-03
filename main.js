'use strict';

//modules
const { strict } = require('assert');
const Discord = require('discord.js');

//local
const jsonio = require('./jsonio');

const client = new Discord.Client();

const optionsPath = 'options.json';
var options = jsonio.readjson(optionsPath);

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
	if(msg.author.bot) return;//ignore bot messages
	var prefix = options.guilds[msg.guild.id];//get guild prefix or default (!)
	if(!msg.mentions.has(client.user) && !msg.content.startsWith(prefix)) return;//ignore messages that dont tag the bot or start with the guild prefix
	
	//if bot is mentioned and message contains 'prefix'
	if(msg.mentions.has(client.user) && msg.content.includes('prefix')){
		//if author is a server admin and message contains 'reset' reset the prefix
		if(msg.member.hasPermission(Discord.Permissions.FLAGS.ADMINISTRATOR) && msg.content.includes('reset')){
			options.guilds[msg.guild.id] = options.guilds['default'];//reset the prefix
			jsonio.writejson(options,optionsPath);//save options
			options = jsonio.readjson(optionsPath);//reload options
		}else{
			msg.channel.send(`My prefix is ${prefix}`);//tell the prefix
		}
		return;
	}
	
	//remove prefix from the message content
	msg.content = msg.content.substring(prefix.length);
	
	//split on spaces to get params (0 should be command, rest arguments)
	var params = msg.content.split(' ');
	
	switch(params[0]){
		case 'ping':
			msg.channel.send('pong!');
			break;
	}
});

client.login(options.token);