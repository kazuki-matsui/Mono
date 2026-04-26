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
        interaction.reply(variables.playerInventory.base[interaction.user.id] ?? 'No selection yet');
    }
});

client.login(process.env.TOKEN);