const { SlashCommandBuilder } = require('discord.js');
const { GetBalance } = require('../../db-objects.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('balance')
        .setDescription('Reveals the great beyond, where you store your Rat Tokens.'),
    async execute(interaction) {
        const target = interaction.options.getUser('user') ?? interaction.user;
        const balance = GetBalance(target.id);
        
        await interaction.reply({ content: `${target.tag} has ${balance}!`});
    },
};