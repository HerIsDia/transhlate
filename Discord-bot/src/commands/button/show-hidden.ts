import { ButtonInteraction, Client } from 'discord.js';

export const run = async (client: Client, interaction: ButtonInteraction) => {
  const getEmbeds = interaction.message.embeds;

  interaction.reply({
    embeds: getEmbeds,
  });
};
