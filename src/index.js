require('dotenv').config();
const { summonCreature } = require('./battle');
const {
    Client,
    GatewayIntentBits
} = require('discord.js');
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildVoiceStates
    ]
});

client.on('clientReady', (client) => {
    console.log(`${client.user.username}`)
})
client.on('interactionCreate', async (interaction) => {
    if (!interaction.isChatInputCommand()) return
    if (interaction.commandName === 'home') {
        await summonCreature(interaction)
    }
    if (interaction.commandName === 'cheats') {
    }
})

client.login(process.env.TOKEN)