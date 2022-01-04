// Import NPM Packages
import {
  Client,
  CommandInteraction,
  ContextMenuInteraction,
  Intents,
  Interaction,
} from 'discord.js';
import { readFile } from 'fs';
import { PasteClient } from 'pastebin-api';
require('dotenv').config();

export const pastebin = new PasteClient(process.env.PASTEBIN_API as string);

// Import Local Functions
import { registerCommands } from './commands/registerCommands';

// Create Client and Set Intents
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
const token = process.env.TOKEN as string;

client.on('ready', () => {
  registerCommands(token, client);
  client.user?.setActivity({
    name: `/translate - v0.3.1`,
    type: 'LISTENING',
  });
});

client.on('guildCreate', async (guild) => {
  registerCommands(token, client);
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand() && !interaction.isContextMenu()) return;
  const commandType = interaction.isCommand() ? 'slashcommands' : 'contextmenu';
  readFile(
    `./src/commands/${commandType}/${interaction.commandName}.ts`,
    'utf8',
    (err) => {
      if (err) {
        interaction.reply(`❌ ${err.message}`);
        return;
      }
      try {
        const cmd =
          require(`./commands/${commandType}/${interaction.commandName}.ts`) as {
            run: (
              client: Client,
              interaction: CommandInteraction | ContextMenuInteraction
            ) => void;
          };
        cmd.run(client, interaction);
      } catch (error) {
        interaction.reply(`❌ ! ${error}`);
      }
    }
  );
});

client.login(token);
