require('dotenv').config();
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

client.on('ready', (client) => {
    console.log(`${client.user.username}`);
})
let buttonValue = new Map();
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

        const filter = (interaction) => interaction.user.id === interaction.author.id;
        const collector = reply.createMessageComponentCollector({
            componentType: ComponentType.Button,
            filter,
        });
        collector.on('collect', (i) => {
            if(i.customId === 'red') {
                buttonValue.set(i.user.id, 'Red');
                i.reply(buttonValue.get(i.user.id));
            } else if (i.customId === 'green') {
                buttonValue.set(i.user.id, 'Green');
                i.reply(buttonValue.get(i.user.id));
            }
        });
    }
    if (interaction.commandName === 'cheats') {
        interaction.reply(buttonValue.get(interaction.user.id) ?? 'No selection yet');
    }
});

client.login(process.env.TOKEN);