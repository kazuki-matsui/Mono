require('dotenv').config();
const {REST, Routes, ApplicationCommandOptionType} = require('discord.js');

const commands = [
    {
        name: 'home',
        description: 'Starts up the home page',
    },
    {
        name: 'cheats',
        description: 'Opens the cheat menu',
    }
]

const rest = new REST({version: '10'}).setToken(process.env.TOKEN)

(async () => {
    try {
        console.log('Registering slash commands...')
        await rest.put(
            Routes.applicationCommands(process.env.CLIENT_ID),
            {body: commands}
        );
        console.log('Slash commands were registered successfully!')
    } catch (error) {
        console.log(`${error}`)
    }
})()