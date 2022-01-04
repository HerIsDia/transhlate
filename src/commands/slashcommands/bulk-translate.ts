import { Client, CommandInteraction } from 'discord.js';
import { pastebin } from '../..';
import { bulkTranslateEmbed } from '../../generators/embeds';
import {
  Translators,
  translators as translatorLanguages,
} from '../../scripts/translate';
import translate from '@imlinhanchao/google-translate-api';
import { Embed } from '@discordjs/builders';

const translators: Translators[] = [
  'minimalist',
  'topten',
  'qualidad',
  'sofs',
  'default',
  'weels',
  'original',
  'healeven',
  'jeam',
  'zeeeen',
  'z',
  'thelore',
  'exes',
  'consts',
  'ultimate',
  'lunatic',
];

export const run = async (client: Client, interaction: CommandInteraction) => {
  const startText: string = interaction.options.getString('text') as string;
  const startRenderedText: string = await pastebin.createPaste({
    code: startText,
    name: 'startedText.txt',
    expireDate: 'N',
    publicity: 0,
  });
  await interaction.reply({
    embeds: [
      new Embed().setTitle('Starting...').setDescription('Please wait...'),
    ],
  });
  const finalLanguage: string = interaction.options.getString('language')
    ? (interaction.options.getString('language') as string)
    : 'English';

  let allData = translators.map((translator) => {
    return {
      translator,
      end: '',
    };
  });

  for (let index = 0; index < translators.length; index++) {
    const translator = translators[index];
    let currentText: string = startText;
    const languagesCodes = [...translatorLanguages[translator]];
    languagesCodes.push(finalLanguage);

    for (let indexTwo = 0; indexTwo < languagesCodes.length; indexTwo++) {
      const lCode = languagesCodes[indexTwo];
      await translate(currentText, { to: `${lCode}` })
        .then((res) => {
          currentText = res.text;
        })
        .catch((err) => {
          interaction.editReply(err);
        });
    }
    allData[index].end = await pastebin.createPaste({
      code: currentText,
      name: 'endText.txt',
      expireDate: 'N',
      publicity: 0,
    });
    interaction.editReply({
      embeds: [bulkTranslateEmbed(startRenderedText, finalLanguage, allData)],
    });
  }
};
