import { Client, CommandInteraction } from 'discord.js';
import { translation, Translators } from '../../scripts/translate';

export const run = async (client: Client, interaction: CommandInteraction) => {
  const startText: string = interaction.options.getString('text') as string;
  const finalLanguage: string = interaction.options.getString('language')
    ? (interaction.options.getString('language') as string)
    : 'English';
  const translator: Translators = interaction.options.getString('translator')
    ? (interaction.options.getString('translator') as Translators)
    : 'default';
  translation(interaction, startText, finalLanguage, translator);
};
