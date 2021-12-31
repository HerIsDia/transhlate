import { Client, CommandInteraction } from 'discord.js';
import { inProgress, completeEmbed } from '../../generators/embeds';
import translate from '@imlinhanchao/google-translate-api';
import { languagesCodes } from '../..';

export const run = async (client: Client, interaction: CommandInteraction) => {
  let currentText: string = interaction.options.getString('text') as string;
  await interaction.reply('Translating...');
  for (let index = 0; index < languagesCodes.length; index++) {
    await interaction.editReply({
      embeds: [inProgress(index + 1, languagesCodes.length)],
    });
    const lCode = languagesCodes[index];
    await translate(currentText, { to: `${lCode}` })
      .then((res) => {
        currentText = res.text;
      })
      .catch((err) => {
        interaction.editReply(err);
      });
  }
  interaction.editReply({
    content: 'Finished.',
    embeds: [
      completeEmbed(
        interaction.options.getString('text') as string,
        currentText
      ),
    ],
  });
};
