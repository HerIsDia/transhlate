import { Client, ContextMenuInteraction, Message } from 'discord.js';
import { translation } from '../../scripts/translate';

export const run = async (
  client: Client,
  interaction: ContextMenuInteraction
) => {
  if (interaction.targetType != 'MESSAGE') return;
  const startText: string = await (
    (await interaction.channel?.messages.fetch(interaction.targetId)) as Message
  ).content;
  translation(
    interaction,
    startText,
    'en',
    'default',
    interaction.user,
    true,
    true
  );
};
