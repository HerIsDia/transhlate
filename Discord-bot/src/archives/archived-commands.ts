import { SlashCommandBuilder } from '@discordjs/builders';

const bulkTranslate = new SlashCommandBuilder()
  .setName('bulk-translate')
  .setDescription(
    'ℹ️ Translate something with ALL translators at the same time.'
  )
  .addStringOption((str) =>
    str
      .setName('text')
      .setRequired(true)
      .setDescription('The text to translate.')
  )
  .addStringOption((str) =>
    str
      .setName('language')
      .setRequired(false)
      .setDescription('The final language to translate to.')
      .addChoice('Français', 'fr')
      .addChoice('English', 'en')
      .addChoice('Deutsch', 'de')
      .addChoice('Español', 'es')
      .addChoice('日本語', 'ja')
  );
