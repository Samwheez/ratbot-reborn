const { SlashCommandBuilder } = require('discord.js');
const { Roll } = require('../../rat-friends.js');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('roll')
        .setDescription('Rolls for a rat.  Good luck!'),
    async execute(interaction) {
        const target = interaction.options.getUser('user') ?? interaction.user;
        const messageContent = await Roll(target.id);

        await interaction.reply( messageContent );
    },
};