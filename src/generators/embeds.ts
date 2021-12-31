import { Embed } from '@discordjs/builders';

export const inProgress = (progress: number, total: number) => {
  return new Embed()
    .setTitle('Translation in progress !')
    .setDescription(`${progress}/${total}`)
    .setTimestamp(new Date())
    .setColor(15105570);
};

export const completeEmbed = (start: string, end: string) => {
  return new Embed()
    .setTitle('Translation complete !')
    .setDescription(`Your text was been translated`)
    .setTimestamp(new Date())
    .setColor(3066993)
    .addField({
      name: 'from',
      value: start,
    })
    .addField({
      name: 'to',
      value: end,
    });
};
