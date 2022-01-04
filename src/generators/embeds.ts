import { Embed } from '@discordjs/builders';
import { start } from 'repl';
import {
  Translators,
  translators as translatorLanguages,
} from '../scripts/translate';

const inProgressNumber = (progress: number, total: number) => {
  const percentage = (progress / total) * 100;
  const percentage2Digits = Math.round(percentage * 100) / 100;
  const bar = '🟩'.repeat(percentage / 10);
  const currentProgress =
    percentage % 10 <= 5 ? '🟥' : percentage % 10 == 0 ? '' : '🟧';
  const empty = '️️▫️'.repeat(10 - percentage / 10);
  const allBar = bar + currentProgress + empty;
  return { percentage2Digits, allBar };
};

export const translateEmbed = (
  start: string,
  progress: number,
  total: number,
  finalLanguage: string,
  translator: Translators,
  end?: string
) => {
  return new Embed()
    .setTitle(
      end
        ? 'Your translation has been translated.'
        : 'Your translation is in progress.'
    )
    .setDescription(
      end
        ? `Your text has been translated into ${total} languages.`
        : `${inProgressNumber(progress, total).percentage2Digits}%. (${
            translatorLanguages[translator].length > progress
              ? translatorLanguages[translator][progress]
              : finalLanguage
          })`
    )
    .setTimestamp(new Date())
    .setColor(end ? 11060870 : 15968018)
    .addField({
      name: 'from',
      value: start,
    })
    .addField({
      name: 'to',
      value: end ? end : `${inProgressNumber(progress, total).allBar}`,
    })
    .setFooter({
      text: `Using the ${translator.toLowerCase()} translator, result in ${finalLanguage.toLowerCase()}.`,
    });
};

export const bulkTranslateEmbed = (
  startRenderedText: string,
  finalLanguage: string,
  allData: {
    translator: Translators;
    end: string;
  }[]
) => {
  const embed = new Embed()
    .setTitle(
      'Your bulk translation.\n**This will take few minutes, please wait.**'
    )
    .setDescription(startRenderedText)
    .setTimestamp(new Date())
    .setColor(11967433)
    .setFooter({
      text: `result in ${finalLanguage.toLowerCase()}.`,
    });

  for (let index = 0; index < allData.length; index++) {
    const element = allData[index];
    if (element.end) {
      embed.addField({
        name: `${element.translator.toLowerCase()}`,
        value: element.end,
      });
    }
  }

  return embed;
};
