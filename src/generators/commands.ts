import {
  SlashCommandBuilder,
  ContextMenuCommandBuilder,
} from '@discordjs/builders';

// command "/about" but in context menu
export const aboutContext = new ContextMenuCommandBuilder()
  .setName('translate')
  .setType(3);

// command "/about"
export const about = new SlashCommandBuilder()
  .setName('translate')
  .setDescription('ℹ️ Translate something')
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
      .addChoice('Italiano', 'it')
      .addChoice('日本語', 'ja')
      .addChoice('한국어', 'ko')
      .addChoice('Nederlands', 'nl')
      .addChoice('Norsk', 'no')
      .addChoice('Polski', 'pl')
  )
  .addStringOption((str) =>
    str
      .setName('translator')
      .setRequired(false)
      .setDescription('The translator to use.')
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
  );
