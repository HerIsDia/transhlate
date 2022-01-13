import { Client, CommandInteraction } from 'discord.js';
import { translation, transhlators } from '../../scripts/translate';
import wiki, { Page } from 'wikipedia';
import { start } from 'repl';

export const run = async (client: Client, interaction: CommandInteraction) => {
  let startText: string = interaction.options.getString('content') as string;
  const finalLanguage: string = interaction.options.getString('language')
    ? (interaction.options.getString('language') as string)
    : 'English';
  const transhlator: transhlators = interaction.options.getString('transhlator')
    ? (interaction.options.getString('transhlator') as transhlators)
    : 'default';

  let isInvisible = false;
  let isPublicable = true;

  if (
    startText.toLowerCase().startsWith('wikipedia:') ||
    startText.toLowerCase().startsWith('wiki:') ||
    startText.toLowerCase().startsWith('w:')
  ) {
    startText = startText.split(':').slice(1).join(':');
    const wikiResult = await wiki.page(startText).catch((err) => {
      startText = `${startText} on Wikipedia don't exist. Try again.`;
      isInvisible = true;
      isPublicable = false;
      return;
    });
    if (wikiResult) {
      let wikiText = await wikiResult.summary();
      while (wikiText.extract.toLowerCase().endsWith('may refer to:')) {
        const wikiRelated = await wiki.related(startText);
        const relatedLengh = wikiRelated.pages.length;
        const randomRelated = Math.floor(Math.random() * relatedLengh);
        wikiText = wikiRelated.pages[randomRelated];
      }
      startText = wikiText.extract;
    }
  }

  // detect if the startText is a discord message ID by detecting if the string contain only numbers
  if (
    startText.length === 18 &&
    interaction.channel &&
    startText.match(/^\d+$/)
  ) {
    const message = await interaction.channel.messages
      .fetch(startText)
      .catch((err) => {
        startText = `${startText} is not a valid message ID.\nThe message need to be in the same channel than the command.`;
        isInvisible = true;
        isPublicable = false;
        return;
      });
    if (message) {
      startText = message.content;
    }
  }

  translation(
    interaction,
    startText,
    finalLanguage,
    transhlator,
    interaction.user,
    isInvisible,
    isPublicable
  );
};
