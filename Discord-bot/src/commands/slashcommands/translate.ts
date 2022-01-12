import { Client, CommandInteraction } from 'discord.js';
import { translation, Translators } from '../../scripts/translate';
import wiki, { Page } from 'wikipedia';

export const run = async (client: Client, interaction: CommandInteraction) => {
  let startText: string = interaction.options.getString('text') as string;
  const finalLanguage: string = interaction.options.getString('language')
    ? (interaction.options.getString('language') as string)
    : 'English';
  const translator: Translators = interaction.options.getString('translator')
    ? (interaction.options.getString('translator') as Translators)
    : 'default';

  if (
    startText.toLowerCase().startsWith('wikipedia:') ||
    startText.toLowerCase().startsWith('wiki:') ||
    startText.toLowerCase().startsWith('w:')
  ) {
    startText = startText.split(':').slice(1).join(':');
    const wikiResult = (await wiki.page(startText).catch((err) => {
      return;
    })) as Page;
    const wikiText = await wikiResult.summary();
    if (wikiText.extract.toLowerCase().endsWith('may refer to:')) {
      const wikiRelated = await wiki.related(startText);
      const relatedLengh = wikiRelated.pages.length;
      const randomRelated = Math.floor(Math.random() * relatedLengh);
      const relatedPage = wikiRelated.pages[randomRelated];
      startText = relatedPage.extract;
    } else {
      startText = wikiText.extract;
    }
  }
  translation(
    interaction,
    startText,
    finalLanguage,
    translator,
    interaction.user
  );
};
