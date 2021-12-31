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
  );
