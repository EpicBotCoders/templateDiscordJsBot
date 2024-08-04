const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('echo')
        .setDescription('Replies with your input!')
        .addStringOption(option =>
            option.setName('input')
                .setDescription('The input to echo back'))
        .addBooleanOption(option =>
            option.setName('ephemeral')
                .setDescription('Whether or not the echo should be ephemeral')),
    async execute(interaction){
        await interaction.reply({content:`${interaction.options.getString('input')}`,ephemeral: interaction.options.getBoolean('ephemeral')})       
    }
}