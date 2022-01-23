import {
  SlashCommandBuilder,
  ContextMenuCommandBuilder,
} from '@discordjs/builders';

const englishTranslate = new ContextMenuCommandBuilder()
  .setName('translate-en')
  .setType(3);

const frenchTranslate = new ContextMenuCommandBuilder()
  .setName('translate-fr')
  .setType(3);

const spannishTranslate = new ContextMenuCommandBuilder()
  .setName('translate-es')
  .setType(3);

const japaneseTranslate = new ContextMenuCommandBuilder()
  .setName('translate-ja')
  .setType(3);

const deutschTranslate = new ContextMenuCommandBuilder()
  .setName('translate-de')
  .setType(3);

const translate = new SlashCommandBuilder()
  .setName('translate')
  .setDescription('ℹ️ Translate something')
  .addStringOption((str) =>
    str
      .setName('content')
      .setRequired(true)
      .setDescription(
        'The content to translate. Can be a message ID, a text or a special keyword (like w:[...]).'
      )
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
  )
  .addStringOption((str) =>
    str
      .setName('transhlator')
      .setRequired(false)
      .setDescription('The transhlator to use.')
      .addChoice('Default', 'default')
      .addChoice('The Minimalist', 'minimalist')
      .addChoice('The original', 'original')
      .addChoice('The Wels', 'weels')
      .addChoice('Zeeeen', 'zeeeen')
      .addChoice('TOP 10L WOW OMG', 'topten')
      .addChoice('SoFs', 'sofs')
      .addChoice('the exeS', 'exes')
      .addChoice('The Consts', 'consts')
      .addChoice('Jeam', 'jeam')
      .addChoice('Heal even', 'healeven')
      .addChoice('The LORE', 'thelore')
      .addChoice('Lunatic', 'lunatic')
      .addChoice('The Z', 'z')
      .addChoice('Qualidad', 'qualidad')
      .addChoice('THE ULTIMATE', 'ultimate')
      .addChoice(
        'Surprise ! (Translate a thing between 1 and 100 languages)',
        'random'
      )
  );

export const commands = [
  englishTranslate,
  frenchTranslate,
  spannishTranslate,
  japaneseTranslate,
  deutschTranslate,
  translate,
];
