const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { GetRatsByRarity } = require('../../db-objects.js');



module.exports = {
    data: new SlashCommandBuilder()
        .setName('inventory')
        .setDescription('Shows your inventory.'),
    async execute(interaction) {
        const target = interaction.options.getUser('user') ?? interaction.user;
        const rats = await GetRatsByRarity(target.id, 0);
        const direrats = await GetRatsByRarity(target.id, 1);
        const enlightenedrats = await GetRatsByRarity(target.id, 2);
        const ratlanteans = await GetRatsByRarity(target.id, 3);

        ratfield = '';
        direratfield = '';
        enlightenedratfield = '';
        ratlanteanfield = '';

        rats.forEach(rat => ratfield += (rat.name + ' - Amount: ' + rat.amount + '\n'));
        direrats.forEach(rat => direratfield += (rat.name + ' - Amount: ' + rat.amount + '\n'));
        enlightenedrats.forEach(rat => enlightenedratfield += (rat.name + ' - Amount: ' + rat.amount + '\n'));
        ratlanteans.forEach(rat => ratlanteanfield += (rat.name + ' - Amount: ' + rat.amount + '\n'));

        const exampleEmbed = {
            color: 0x0099FF,
            title: 'Inventory',
            fields: [
                { name: 'Rat', value: (ratfield + '\n') },
                { name: 'Dire Rat', value: (direratfield + '\n') },
                { name: 'Enlightened Rat', value: (enlightenedratfield + '\n') },
                { name: 'Ratlantean', value: (ratlanteanfield + '\n') }
            ],
        }
        await interaction.reply({ embeds: [exampleEmbed] });
    },
};