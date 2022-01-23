// Import NPM Packages
import {
  ButtonInteraction,
  Client,
  CommandInteraction,
  ContextMenuInteraction,
  Intents,
  Interaction,
} from 'discord.js';
import { readFile } from 'fs';
require('dotenv').config();

// Import Local Functions
import { registerCommands } from './commands/registerCommands';

// Create Client and Set Intents
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
const token = process.env.TOKEN as string;

client.on('ready', () => {
  registerCommands(token, client);
  client.user?.setActivity({
    name: `/translate - beta v0.6.0`,
    type: 'LISTENING',
  });
});

client.on('guildCreate', async (guild) => {
  registerCommands(token, client);
});

client.on('interactionCreate', async (interaction) => {
  if (
    !interaction.isCommand() &&
    !interaction.isContextMenu() &&
    !interaction.isButton()
  )
    return;
  const commandType = interaction.isCommand()
    ? 'slashcommands'
    : interaction.isContextMenu()
    ? 'contextmenu'
    : 'button';
  readFile(
    `./src/commands/${commandType}/${
      interaction.isButton() ? interaction.customId : interaction.commandName
    }.ts`,
    'utf8',
    (err) => {
      if (err) {
        interaction.reply({
          content: `❌ ! ${err}`,
          ephemeral: true,
        });
        return;
      }
      try {
        const cmd = require(`./commands/${commandType}/${
          interaction.isButton()
            ? interaction.customId
            : interaction.commandName
        }.ts`) as {
          run: (
            client: Client,
            interaction:
              | CommandInteraction
              | ContextMenuInteraction
              | ButtonInteraction
          ) => void;
        };
        cmd.run(client, interaction);
      } catch (error) {
        interaction.reply({
          content: `❌ ! ${error}`,
          ephemeral: true,
        });
      }
    }
  );
});

client.login(token);
