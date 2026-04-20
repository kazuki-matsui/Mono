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
    },
    {
        name: 'documents',
        description: 'Sends up the modding documentation',
        options: [
            {
                name: 'section',
                description: 'What is the section',
                type: ApplicationCommandOptionType.String,
                required: true,
                choices: [
                    { name: 'Assets', value: 'assets' },
                    { name: 'Creatures', value: 'creatures' },
                    { name: 'Dimensions', value: 'dimensions' },
                    { name: 'Encounter', value: 'encounter' },
                    { name: 'Stations', value: 'stations' },
                    { name: 'Structures', value: 'structures' },
                    { name: 'Effects', value: 'effects' },
                    { name: 'Events', value: 'events' },
                    { name: 'Items', value: 'items' },
                    { name: 'Player', value: 'player' },
                    { name: 'Variables', value: 'variables' }
                ]
            }
        ]
    }
];

const rest = new REST({version: '10'}).setToken(process.env.TOKEN);

(async () => {
    try {
        console.log('Registering slash commands...');
        await rest.put(
            Routes.applicationCommands(process.env.CLIENT_ID),
            {body: commands}
        );
        console.log('Slash commands were registered successfully!');
    } catch (error) {
        console.log(`${error}`);
    }
})();