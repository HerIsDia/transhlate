import { Embed } from '@discordjs/builders';
import { Translators } from '../scripts/translate';

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
