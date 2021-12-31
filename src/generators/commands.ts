import {
  SlashCommandBuilder,
  ContextMenuCommandBuilder,
} from '@discordjs/builders';

// command "/about" but in context menu
export const aboutContext = new ContextMenuCommandBuilder()
  .setName('about')
  .setType(2);

// command "/about"
export const about = new SlashCommandBuilder()
  .setName('about')
  .setDescription('ℹ️ About the bot');
