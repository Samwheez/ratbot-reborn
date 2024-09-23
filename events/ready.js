const { Events } = require('discord.js');
const { InitData } = require('../db-objects.js');
const { InitRats } = require('../rat-friends.js');

module.exports = {
    name: Events.ClientReady,
    once: true,
    async execute(client) {
        InitData();
        InitRats();

        console.log(`Ready! Logged in as ${client.user.tag}`);
    },
};