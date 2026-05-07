let battle = require('./World/citrus/creature/troll.json');
const {
    SectionBuilder,
    SeparatorBuilder,
    MessageFlags,
    TextDisplayBuilder,
    StringSelectMenuBuilder,
    StringSelectMenuOptionBuilder,
    ActionRowBuilder,
} = require('discord.js');

async function summonCreature(interaction) {
    let emptyAttack = {
            "name": "Empty",
            "icon": undefined,
            "strength": 0,
            "frequency": 0
        }
    battle.stats.health = battle.stats.healthMax
    battle.currentAttack = emptyAttack
    interaction.reply({
        flags: MessageFlags.IsComponentsV2,
        files: [`./src/World/citrus/assets/creature/${battle.avatar}`],
        components: [
            new ActionRowBuilder().addComponents(
                new StringSelectMenuBuilder()
                    .setCustomId('attack')
                    .setDisabled(true)
                    .addOptions(
                        new StringSelectMenuOptionBuilder()
                            .setLabel(battle.currentAttack.name)
                            .setEmoji(battle.currentAttack.icon)
                            .setValue(battle.currentAttack.name.replace(/\s+/g, '_'))
                            .setDefault(true)
                    )
            ),
            new SectionBuilder()
                .addTextDisplayComponents(
                    (textDisplay) => textDisplay
                        .setContent(`> # ${battle.name}`),
                )
                .setThumbnailAccessory((thumbnail) => thumbnail
                    .setURL(`attachment://${battle.avatar}`)
                ),
            new SeparatorBuilder(),
            new TextDisplayBuilder()
                .setContent(`## ${battle.title}\n**${battle.stats.health}**`)
        ]
    })
}

module.exports = { summonCreature };