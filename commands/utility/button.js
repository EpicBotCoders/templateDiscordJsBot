const { ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('button')
        .setDescription('button test'),
    async execute(interaction) {
        const moreMessage = new ButtonBuilder()
            .setCustomId('moreMessage')
            .setLabel('More Message')
            .setStyle(ButtonStyle.Primary);
        const cancel = new ButtonBuilder()
            .setCustomId('cancel')
            .setLabel('Cancel')
            .setStyle(ButtonStyle.Secondary);


        const row = new ActionRowBuilder()
            .addComponents(moreMessage, cancel);
        const response = await interaction.reply({
            content: "Initial message",
            components: [row],
        });
        const collectorFilter = i => i.user.id === interaction.user.id;

        try {
            const confirmation = await response.awaitMessageComponent({ filter: collectorFilter });

            if (confirmation.customId == "moreMessage") {
                await confirmation.update("More Message!")
            }
            else {
                await confirmation.update({ content: 'Action cancelled', components: [] });
            }

        } catch (e) {
            console.log(e.message);
            await interaction.editReply({ content: 'Confirmation not received within 1 minute, cancelling', components: [] });
        }
    }
}