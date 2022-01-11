import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import { Client } from 'discord.js';
import { commands } from '../generators/commands';
require('dotenv').config();

const testServer = process.env.TEST_SERVER;

export const registerCommands = async (token: string, client: Client) => {
  const rest = new REST({ version: '9' }).setToken(token);
  try {
    if (testServer == undefined) {
      await rest.put(Routes.applicationCommands(client.user?.id as string), {
        body: commands,
      });
      console.log('application (/) commands refreshed.');
    } else {
      console.log('🧪 Started refreshing application (/) commands.');
      await rest.put(
        Routes.applicationGuildCommands(client.user?.id as string, testServer),
        {
          body: commands,
        }
      );
      console.log('🧪 (/) commands refreshed.');
    }
  } catch (error) {
    console.error(error);
  }
};
