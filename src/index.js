require('dotenv').config();
const jsonData = require('./test.json');
const {
    Client,
    IntentsBitField,
    ButtonBuilder,
    ButtonStyle,
    ActionRowBuilder,
    ComponentType,
} = require('discord.js');

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ]
});

client.on('clientReady', (client) => {
    console.log(`${client.user.username}`);
})
client.on('interactionCreate', async (interaction) => {
    if (!interaction.isChatInputCommand()) return;
    if (interaction.commandName === 'home') {
        const redButton = new ButtonBuilder()
            .setLabel('Red')
            .setEmoji('🍎')
            .setStyle(ButtonStyle.Danger)
            .setCustomId('red');
        const greenButton = new ButtonBuilder()
            .setLabel('Green')
            .setEmoji('🍏')
            .setStyle(ButtonStyle.Success)
            .setCustomId('green');
        const linkButton = new ButtonBuilder()
            .setLabel('Link')
            .setEmoji('🗞️')
            .setStyle(ButtonStyle.Link)
            .setURL('https://discord.com/channels/1228073258948231291/1496886786796949657');
        const actionRow = new ActionRowBuilder().addComponents(redButton, greenButton, linkButton);
        const reply = await interaction.reply({content: '# Home 🏡', components: [actionRow]});

        const collector = reply.createMessageComponentCollector({
            componentType: ComponentType.Button,
        });
        collector.on('collect', (interactionButton) => {
            if(interactionButton.customId === 'red') {
                jsonData.buttonValue[interactionButton.user.id] = 'red';
                interactionButton.reply(jsonData.buttonValue[interactionButton.user.id]);
            } else if (interactionButton.customId === 'green') {
                jsonData.buttonValue[interactionButton.user.id] = 'green';
                interactionButton.reply(jsonData.buttonValue[interactionButton.user.id]);
            }
        });
    }
    if (interaction.commandName === 'cheats') {
        interaction.reply(jsonData.buttonValue[interaction.user.id] ?? 'No selection yet');
    }
});

client.login(process.env.TOKEN);