import { Embed } from '@discordjs/builders';
import { User } from 'discord.js';
import { start } from 'repl';
import {
  transhlators,
  transhlators as transhlatorLanguages,
} from '../scripts/translate';

const inProgressNumber = (progress: number, total: number) => {
  const percentage = (progress / total) * 100;
  const percentage2Digits = Math.round(percentage * 100) / 100;
  const bar = '🟩'.repeat(percentage / 10);
  const currentProgress =
    percentage % 10 <= 5 ? (percentage % 10 == 0 ? '' : '🟥') : '🟧';
  const empty = '️️▫️'.repeat(10 - percentage / 10);
  const allBar = bar + currentProgress + empty;
  return { percentage2Digits, allBar };
};

export const translateEmbed = (
  start: string,
  progress: number,
  total: number,
  finalLanguage: string,
  transhlator: transhlators,
  user: User,
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
            transhlatorLanguages[transhlator].length > progress
              ? transhlatorLanguages[transhlator][progress]
              : finalLanguage
          })`
    )
    .setTimestamp(new Date())
    .setColor(end ? 11060870 : 15968018)
    .addField({
      name: 'from',
      value: `> ${start.replace(/\n/g, '\n> ')}`,
    })
    .addField({
      name: 'to',
      value: end
        ? `> ${end.replace(/\n/g, '\n> ')}`
        : `> ${inProgressNumber(progress, total).allBar}`,
    })
    .setFooter({
      text: `Using the ${transhlator.toLowerCase()} transhlators, result in ${finalLanguage.toLowerCase()}.`,
    })
    .setAuthor({
      name: user.tag,
      iconURL:
        user.avatarURL({ format: 'png', dynamic: true }) != null
          ? (user.avatarURL({ format: 'png', dynamic: true }) as string)
          : 'https://cdn.discordapp.com/embed/avatars/0.png',
    });
};
