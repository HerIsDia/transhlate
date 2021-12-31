import translate from '@imlinhanchao/google-translate-api';
import { CommandInteraction, ContextMenuInteraction } from 'discord.js';
import { completeEmbed, inProgress } from '../generators/embeds';
import { PasteClient } from 'pastebin-api';
require('dotenv').config();

const pastebin = new PasteClient(process.env.PASTEBIN_API as string);

const translators = {
  default: [
    'English',
    'French',
    'Japanese',
    'Armenian',
    'German',
    'Spanish',
    'Italian',
    'Portuguese',
    'Russian',
    'Chinese (Simplified)',
    'Chinese (Traditional)',
    'English',
    'French',
    'Maltese',
    'Arabic',
    'Hindi',
    'Bengali',
    'Punjabi',
    'Ukrainian',
    'Urdu',
  ],
  minimalist: ['Chinese (Traditional)', 'German', 'Japanese', 'Catalan'],
  original: [
    'French',
    'English',
    'Japanese',
    'Korean',
    'Bengali',
    'Mongolian',
    'Somali',
    'Thai',
    'Zulu',
    'Lithuanian',
    'Hmong',
    'Chinese (Simplified)',
    'Arabic',
    'Korean',
    'Malayalam',
    'Spanish',
    'Myanmar (Burmese)',
    'Punjabi',
    'Ukrainian',
    'Maltese',
  ],
  ultimate: [
    'Afrikaans',
    'Albanian',
    'Amharic',
    'Arabic',
    'Armenian',
    'Azerbaijani',
    'Basque',
    'Belarusian',
    'Bengali',
    'Bosnian',
    'Bulgarian',
    'Catalan',
    'Cebuano',
    'Chinese (Simplified)',
    'Chinese (Traditional)',
    'Corsican',
    'Croatian',
    'Czech',
    'Danish',
    'Dutch',
    'English',
    'Esperanto',
    'Estonian',
    'Finnish',
    'French',
    'Frisian',
    'Galician',
    'Georgian',
    'German',
    'Greek',
    'Gujarati',
    'Haitian Creole',
    'Hausa',
    'Hawaiian',
    'Hindi',
    'Hmong',
    'Hungarian',
    'Icelandic',
    'Igbo',
    'Indonesian',
    'Irish',
    'Italian',
    'Japanese',
    'Javanese',
    'Kannada',
    'Kazakh',
    'Khmer',
    'Kinyarwanda',
    'Korean',
    'Kurdish',
    'Kyrgyz',
    'Lao',
    'Latin',
    'Latvian',
    'Lithuanian',
    'Luxembourgish',
    'Macedonian',
    'Malagasy',
    'Malay',
    'Malayalam',
    'Maltese',
    'Maori',
    'Marathi',
    'Mongolian',
    'Myanmar (Burmese)',
    'Nepali',
    'Norwegian',
    'Nyanja (Chichewa)',
    'Odia (Oriya)',
    'Pashto',
    'Persian',
    'Polish',
    'Portuguese (Portugal, Brazil)',
    'Punjabi',
    'Romanian',
    'Russian',
    'Samoan',
    'Scots Gaelic',
    'Serbian',
    'Sesotho',
    'Shona',
    'Sindhi',
    'Sinhala (Sinhalese)',
    'Slovak',
    'Slovenian',
    'Somali',
    'Spanish',
    'Sundanese',
    'Swahili',
    'Swedish',
    'Tagalog (Filipino)',
    'Tajik',
    'Tamil',
    'Tatar',
    'Telugu',
    'Thai',
    'Turkish',
    'Turkmen',
    'Ukrainian',
    'Urdu',
    'Uyghur',
    'Uzbek',
    'Vietnamese',
    'Welsh',
    'Xhosa',
    'Yiddish',
    'Yoruba',
    'Zulu',
  ],
  weels: [
    'Afrikaans',
    'Albanian',
    'Amharic',
    'Arabic',
    'Armenian',
    'Azerbaijani',
    'English',
    'Esperanto',
    'Estonian',
    'Igbo',
    'Indonesian',
    'Irish',
    'Italian',
    'Odia (Oriya)',
    'Ukrainian',
    'Urdu',
    'Uyghur',
    'Uzbek',
    'Yiddish',
    'Yoruba',
  ],
  zeeeen: [
    'Chinese (Simplified)',
    'Finnish',
    'Javanese',
    'Maltese',
    'Maori',
    'Norwegian',
    'Punjabi',
    'Japanese',
    'Sundanese',
    'Italian',
    'Ukrainian',
    'Portuguese (Portugal, Brazil)',
    'Galician',
    'Catalan',
    'Sesotho',
    'Scots Gaelic',
    'Urdu',
    'Yiddish',
    'Zulu',
    'Hmong',
    'Bengali',
    'Haitian Creole',
    'Luxembourgish',
    'Japanese',
    'Odia (Oriya)',
    'Shona',
    'Marathi',
    'Spanish',
    'Sundanese',
    'Swahili',
    'Swedish',
    'Tagalog (Filipino)',
    'Tajik',
    'Tamil',
    'Tatar',
    'Telugu',
    'Thai',
    'Turkish',
    'Turkmen',
    'Ukrainian',
  ],
  topten: [
    'Portuguese (Portugal, Brazil)',
    'Nyanja (Chichewa)',
    'Kyrgyz',
    'Hindi',
    'Croatian',
    'Bengali',
    'Luxembourgish',
    'Telugu',
    'Xhosa',
  ],
  sofs: [
    'Chinese (Traditional)',
    'English',
    'Esperanto',
    'German',
    'Indonesian',
    'Japanese',
    'Italian',
    'Russian',
    'Spanish',
    'Japanese',
    'Ukrainian',
    'French',
    'English',
    'Korean',
    'Mongolian',
    'Vietnamese',
  ],
  exes: [
    'Kyrgyz',
    'Thai',
    'Kurdish',
    'Azerbaijani',
    'Korean',
    'Cebuano',
    'Basque',
    'Ukrainian',
    'Basque',
    'Sesotho',
    'Sindhi',
    'Latvian',
    'Sundanese',
    'Maori',
    'Romanian',
    'Malayalam',
    'Danish',
    'Serbian',
    'Malay',
    'Punjabi',
    'Ukrainian',
    'Hungarian',
    'Hausa',
    'Ukrainian',
    'Thai',
    'Macedonian',
    'Greek',
    'Maori',
    'English',
    'Kannada',
    'Vietnamese',
    'Nyanja (Chichewa)',
    'Danish',
    'Punjabi',
    'Portuguese (Portugal, Brazil)',
    'Latvian',
    'Finnish',
    'Kurdish',
    'Myanmar (Burmese)',
    'Latin',
    'Gujarati',
    'Indonesian',
    'Indonesian',
    'Sesotho',
    'Chinese (Simplified)',
    'Estonian',
    'Belarusian',
    'Swedish',
    'Italian',
    'Afrikaans',
    'Esperanto',
    'Maori',
    'Ukrainian',
    'Dutch',
    'Belarusian',
    'Haitian Creole',
    'Kinyarwanda',
    'Gujarati',
    'Bulgarian',
    'Scots Gaelic',
    'Tatar',
    'Sinhala (Sinhalese)',
    'Thai',
    'Nepali',
    'Chinese (Traditional)',
    'Macedonian',
    'Bengali',
    'Estonian',
  ],
  consts: [
    'Basque',
    'Belarusian',
    'Bengali',
    'Bosnian',
    'Bulgarian',
    'Catalan',
    'Cebuano',
    'Chinese (Simplified)',
    'Chinese (Traditional)',
    'Corsican',
    'Croatian',
    'Czech',
    'Danish',
    'Dutch',
    'Finnish',
    'French',
    'Frisian',
    'Galician',
    'Georgian',
    'German',
    'Greek',
    'Gujarati',
    'Haitian Creole',
    'Hausa',
    'Hawaiian',
    'Hindi',
    'Hmong',
    'Hungarian',
    'Japanese',
    'Javanese',
    'Kannada',
    'Kazakh',
    'Khmer',
    'Kinyarwanda',
    'Korean',
    'Kurdish',
    'Kyrgyz',
    'Lao',
    'Latin',
    'Latvian',
    'Lithuanian',
    'Luxembourgish',
    'Macedonian',
    'Malagasy',
    'Malay',
    'Malayalam',
    'Maltese',
    'Maori',
    'Marathi',
    'Mongolian',
    'Myanmar (Burmese)',
    'Nepali',
    'Norwegian',
    'Nyanja (Chichewa)',
    'Pashto',
    'Persian',
    'Polish',
    'Portuguese (Portugal, Brazil)',
    'Punjabi',
    'Romanian',
    'Russian',
    'Samoan',
    'Scots Gaelic',
    'Serbian',
    'Sesotho',
    'Shona',
    'Sindhi',
    'Sinhala (Sinhalese)',
    'Slovak',
    'Slovenian',
    'Somali',
    'Spanish',
    'Sundanese',
    'Swahili',
    'Swedish',
    'Tagalog (Filipino)',
    'Tajik',
    'Tamil',
    'Tatar',
    'Telugu',
    'Thai',
    'Turkish',
    'Turkmen',
    'Vietnamese',
    'Welsh',
    'Xhosa',
    'Zulu',
  ],
  jeam: [
    'Korean',
    'Kurdish',
    'Kyrgyz',
    'Lao',
    'English',
    'Esperanto',
    'Estonian',
    'Finnish',
    'French',
    'Lithuanian',
    'Luxembourgish',
    'Macedonian',
    'Malagasy',
    'Malay',
    'Malayalam',
    'Scots Gaelic',
    'Serbian',
    'Sesotho',
    'Shona',
    'Chinese (Simplified)',
    'Dutch',
    'Chinese (Traditional)',
    'Afrikaans',
    'Korean',
    'Kurdish',
    'Kyrgyz',
    'Lao',
    'Latin',
    'Japanese',
    'Javanese',
    'Korean',
  ],
  healeven: [
    'Javanese',
    'Japanese',
    'English',
    'Chinese (Traditional)',
    'Malagasy',
    'Portuguese (Portugal, Brazil)',
    'French',
    'Catalan',
    'Hindi',
    'Tatar',
    'Malay',
    'Punjabi',
    'Russian',
    'Malay',
    'Spanish',
    'Maori',
    'Myanmar (Burmese)',
    'Tamil',
    'Korean',
    'Danish',
    'Catalan',
    'Afrikaans',
    'Khmer',
    'Hausa',
    'Japanese',
  ],
  thelore: [
    'Haitian Creole',
    'Japanese',
    'Chinese (Traditional)',
    'Maori',
    'Igbo',
    'Javanese',
    'Scots Gaelic',
    'Tagalog (Filipino)',
    'Vietnamese',
    'German',
    'French',
    'Hindi',
    'Esperanto',
    'Lao',
    'Russian',
    'Nepali',
    'Latin',
    'Frisian',
    'Spanish',
    'Tatar',
    'Greek',
    'Korean',
    'Igbo',
    'English',
    'Russian',
    'Arabic',
    'Zulu',
    'Kinyarwanda',
    'Galician',
    'Japanese',
    'Hausa',
    'Sesotho',
    'Kannada',
    'Chinese (Simplified)',
    'Hausa',
    'Sindhi',
    'Samoan',
    'Cebuano',
    'Albanian',
    'Indonesian',
    'Luxembourgish',
    'Czech',
    'Lao',
    'Chinese (Traditional)',
    'Kannada',
    'Korean',
    'Latin',
    'Dutch',
    'Japanese',
    'Tagalog (Filipino)',
    'Finnish',
  ],
  lunatic: [
    'Javanese',
    'Greek',
    'Chinese (Simplified)',
    'Japanese',
    'French',
    'Myanmar (Burmese)',
    'Haitian Creole',
    'Afrikaans',
    'Indonesian',
    'Igbo',
    'Arabic',
    'English',
    'Dutch',
    'Kyrgyz',
    'Swahili',
    'Esperanto',
    'Zulu',
    'English',
    'Nyanja (Chichewa)',
    'Malay',
    'Spanish',
    'Lao',
    'Welsh',
    'Japanese',
    'Sundanese',
    'Kurdish',
    'Nepali',
    'Tajik',
    'Haitian Creole',
    'Pashto',
    'Uzbek',
    'Tatar',
    'Esperanto',
    'Basque',
    'Chinese (Traditional)',
    'Khmer',
    'French',
    'Frisian',
    'Punjabi',
    'Icelandic',
    'Urdu',
    'Russian',
    'Javanese',
    'Malagasy',
    'Maori',
    'Vietnamese',
    'Spanish',
    'Japanese',
    'Korean',
    'English',
    'Basque',
    'Samoan',
    'Cebuano',
    'Albanian',
    'Indonesian',
    'Luxembourgish',
    'Czech',
    'French',
    'English',
    'Japanese',
    'Korean',
    'Bengali',
    'Mongolian',
    'Somali',
    'Thai',
    'Zulu',
    'Lithuanian',
    'Hmong',
    'Chinese (Simplified)',
    'Arabic',
    'Korean',
    'Malayalam',
    'Spanish',
    'Russian',
    'Japanese',
    'French',
    'English',
    'Latin',
    'Greek',
    'Italian',
    'Latvian',
    'Somali',
    'Russian',
    'Nyanja (Chichewa)',
    'Corsican',
    'Indonesian',
    'Icelandic',
    'Chinese (Traditional)',
    'German',
    'Japanese',
    'Catalan',
    'Luxembourgish',
    'Arabic',
    'Myanmar (Burmese)',
    'Russian',
    'Zulu',
    'Haitian Creole',
    'Serbian',
    'Xhosa',
    'Catalan',
    'Portuguese (Portugal, Brazil)',
    'Nyanja (Chichewa)',
    'Kyrgyz',
    'Hindi',
    'Croatian',
    'Bengali',
    'Luxembourgish',
    'Telugu',
    'Xhosa',
    'Javanese',
    'Greek',
    'Chinese (Simplified)',
    'Japanese',
    'French',
    'Korean',
    'Arabic',
    'Khmer',
    'Macedonian',
    'Uzbek',
    'Dutch',
    'Chinese (Traditional)',
    'Finnish',
  ],
  z: [
    'Danish',
    'Greek',
    'Japanese',
    'Khmer',
    'Luxembourgish',
    'Latin',
    'Macedonian',
    'Shona',
    'Basque',
    'Danish',
    'German',
    'Tamil',
    'Latvian',
    'Lao',
    'Mongolian',
    'Xhosa',
    'Estonian',
    'Japanese',
    'Kannada',
    'Malagasy',
    'Myanmar (Burmese)',
    'Tamil',
    'Danish',
    'Japanese',
    'Odia (Oriya)',
    'Albanian',
    'Gujarati',
    'Japanese',
    'Amharic',
    'Swedish',
    'Scots Gaelic',
    'Azerbaijani',
    'Javanese',
    'Zulu',
    'Danish',
    'Latin',
    'Dutch',
    'Polish',
    'Albanian',
    'Lao',
    'Samoan',
  ],
  qualidad: [
    'Lao',
    'Urdu',
    'Italian',
    'French',
    'Zulu',
    'Kinyarwanda',
    'Chinese (Simplified)',
    'Dutch',
    'Catalan',
    'Vietnamese',
    'Shona',
    'Japanese',
  ],
};

export type Translators =
  | 'default'
  | 'minimalist'
  | 'original'
  | 'weels'
  | 'zeeeen'
  | 'topten'
  | 'sofs'
  | 'exes'
  | 'consts'
  | 'jeam'
  | 'healeven'
  | 'thelore'
  | 'lunatic'
  | 'z'
  | 'qualidad'
  | 'ultimate';

export const translation = async (
  interaction: ContextMenuInteraction | CommandInteraction,
  startedText: string,
  finalLanguage: string = 'English',
  translator: Translators = 'default'
) => {
  let currentText: string = startedText;
  await interaction.reply('Translating...');
  const languagesCodes = translators[translator];
  languagesCodes.push(finalLanguage);
  for (let index = 0; index < translators[translator].length; index++) {
    await interaction.editReply({
      embeds: [inProgress(index + 1, translators[translator].length)],
    });
    const lCode = translators[translator][index];
    await translate(currentText, { to: `${lCode}` })
      .then((res) => {
        currentText = res.text;
      })
      .catch((err) => {
        interaction.editReply(err);
      });
  }
  const startedTextResult =
    startedText.length > 1024
      ? `**The text was too long to be rendered here, a link to the text has been generated.**\n${await pastebin.createPaste(
          {
            code: startedText,
            name: 'startedText.txt',
            expireDate: 'N',
            publicity: 0,
          }
        )}`
      : startedText;
  const TextResult =
    currentText.length > 1024
      ? `**The text was too long to be rendered here, a link to the text has been generated.**\n${await pastebin.createPaste(
          {
            code: currentText,
            name: 'endText.txt',
            expireDate: 'N',
            publicity: 0,
          }
        )}`
      : currentText;
  interaction.editReply({
    content: 'Finished.',
    embeds: [completeEmbed(startedTextResult, TextResult)],
  });
};
