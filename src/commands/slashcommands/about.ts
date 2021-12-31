import { Client, CommandInteraction } from 'discord.js';
import { aboutEmbed } from '../../generators/embeds';

export const run = async (client: Client, interaction: CommandInteraction) => {
  interaction.reply({ embeds: [aboutEmbed()], ephemeral: true });
};
