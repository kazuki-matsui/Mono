require('dotenv').config();
let variables = require('./World/citrus/variables.json');
const {
    Client,
    IntentsBitField,
    StringSelectMenuBuilder,
    StringSelectMenuOptionBuilder,
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
        const selectMenu = new StringSelectMenuBuilder()
            .setCustomId('colors')
            .setPlaceholder('Select color')
            .setMinValues(2)
            .setMaxValues(3)
            .addOptions(
                new StringSelectMenuOptionBuilder().setEmoji('💙').setValue('blue').setLabel('Blue'),
                new StringSelectMenuOptionBuilder().setEmoji('💚').setValue('green').setLabel('Green'),
                new StringSelectMenuOptionBuilder().setEmoji('💛').setValue('yellow').setLabel('Yellow'),
                new StringSelectMenuOptionBuilder().setEmoji('🧡').setValue('orange').setLabel('Orange'));
        const actionRow = new ActionRowBuilder().addComponents(selectMenu);
        const reply = await interaction.reply({content: "# Choose", components: [actionRow]});

        const collector = reply.createMessageComponentCollector({
            componentType: ComponentType.StringSelect,

        });
        collector.on('collect', (interactionSelectMenu) => {
            variables.playerInventory.base[interactionSelectMenu.user.id] = interactionSelectMenu.values;
            console.log(variables);
            interactionSelectMenu.reply('## Colors Chosen: ' + interactionSelectMenu.values)
        })
    }
    if (interaction.commandName === 'cheats') {
        try{
            const variables = variables.playerInventory.base[interaction.user.id];
            if (!variables) {
                await interaction.reply('No selection yet');
                return;
            }
            await interaction.reply(`Current selection: ${variables.selected}`);
        }
        catch (error) {
            console.error('Error handling /cheats command:', error);
            await interaction.reply('An error occurred while processing your command.');
        }
    }
});

client.login(process.env.TOKEN);