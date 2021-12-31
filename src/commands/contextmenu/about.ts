import { Client, ContextMenuInteraction } from 'discord.js';
import { aboutEmbed } from '../../generators/embeds';

export const run = async (
  client: Client,
  interaction: ContextMenuInteraction
) => {
  interaction.reply({ embeds: [aboutEmbed()], ephemeral: true });
};
