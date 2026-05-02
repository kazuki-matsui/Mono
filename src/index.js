require('dotenv').config();
let variables = require('./World/citrus/variables.json');
const {
    Client,
    GatewayIntentBits,
    StringSelectMenuBuilder,
    StringSelectMenuOptionBuilder,
    ActionRowBuilder,
    ComponentType,
    ButtonBuilder,
    ButtonStyle,
    ChannelType
} = require('discord.js');
const {
    joinVoiceChannel,
    createAudioPlayer,
    createAudioResource,
    StreamType,
    AudioPlayerStatus
} = require('@discordjs/voice');
const { createReadStream } = require('fs');
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
        const selectMenu = new StringSelectMenuBuilder()
            .setCustomId('colors')
            .setPlaceholder('Select color')
            .setMinValues(2)
            .setMaxValues(3)
            .addOptions(
                new StringSelectMenuOptionBuilder().setEmoji('💙').setValue('blue').setLabel('Blue'),
                new StringSelectMenuOptionBuilder().setEmoji('💚').setValue('green').setLabel('Green'),
                new StringSelectMenuOptionBuilder().setEmoji('💛').setValue('yellow').setLabel('Yellow'),
                new StringSelectMenuOptionBuilder().setEmoji('🧡').setValue('orange').setLabel('Orange'))
        const actionRow = new ActionRowBuilder().addComponents(selectMenu)
        const reply = await interaction.reply({content: "# Choose", components: [actionRow]})

        const collector = reply.createMessageComponentCollector({
            componentType: ComponentType.StringSelect,

        })
        collector.on('collect', (interactionSelectMenu) => {
            variables.playerInventory.base[interactionSelectMenu.user.id] = interactionSelectMenu.values
            interactionSelectMenu.reply('## Colors Chosen: ' + variables.playerInventory.base[interactionSelectMenu.user.id].toString())
        })
    }
    if (interaction.commandName === 'cheats') {
        const voiceChannel = await interaction.guild.channels.create({
            name: '𝖠udio',
            type: ChannelType.GuildVoice,
            parent: interaction.channel.parent.id,
            permissionOverwrites: [
                {
                    id: interaction.guild.roles.everyone.id,
                    deny: ['ViewChannel', 'Connect']
                },
                {
                    id: interaction.user.id,
                    allow: ['ViewChannel', 'Connect', 'Speak'],
                    deny: ['UseEmbeddedActivities']
                }
            ]
        })
        const voiceConnection = joinVoiceChannel({
            channelId: voiceChannel.id,
            guildId: interaction.guild.id,
            adapterCreator: interaction.guild.voiceAdapterCreator

        })
        const player = createAudioPlayer()
        voiceConnection.subscribe(player)

        const button = new ButtonBuilder()
            .setLabel('ㅤ ㅤ ㅤㅤㅤㅤㅤ')
            .setStyle(ButtonStyle.Link)
            .setURL(`https://discord.com/channels/${interaction.guild.id}/${voiceChannel.id}`)
        const actionRow = new ActionRowBuilder().addComponents(button)
        await interaction.reply({
            content: '# Enable Audio',
            components: [actionRow]
        })

        await new Promise((resolve) => {
            const handler = (oldState, newState) => {
                if (
                    newState.member.id === interaction.user.id &&
                    newState.channelId === voiceChannel.id
                ) {
                    client.off('voiceStateUpdate', handler);
                    resolve();
                }
            };

            client.on('voiceStateUpdate', handler);
        });
        await new Promise(resolve => setTimeout(resolve, 200));


        player.play(createAudioResource(createReadStream('./src/World/citrus/assets/music/mystery.mp3'), {
            inputType: StreamType.Arbitrary
        }))
        player.on(AudioPlayerStatus.Idle, () => {
            player.play(createAudioResource(createReadStream('./src/World/citrus/assets/music/mystery.mp3'), {
                inputType: StreamType.Arbitrary
            }))
        })
    }
})

client.login(process.env.TOKEN)