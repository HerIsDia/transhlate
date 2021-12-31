import { Embed } from '@discordjs/builders';

export const inProgress = (progress: number, total: number) => {
  const percentage = (progress / total) * 100;
  const percentage2Digits = Math.round(percentage * 100) / 100;
  const bar = '█'.repeat(Math.round(percentage / 5));
  const empty = '░'.repeat(20 - Math.round(percentage / 5));
  return new Embed()
    .setTitle('Translation in progress !')
    .setDescription(`${percentage2Digits}%\n${bar}${empty}`)
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
