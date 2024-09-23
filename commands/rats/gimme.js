const { SlashCommandBuilder } = require('discord.js');
const { Gimme } = require('../../rat-friends.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('gimme')
        .setDescription('Gives Rat Tokens.  Watch out, scavenging for Rat Tokens has become dangerous in this day and age!'),
    async execute(interaction) {
        const target = interaction.options.getUser('user') ?? interaction.user;
        const messageContent = await Gimme(target.id);

        await interaction.reply( messageContent );
    },
};