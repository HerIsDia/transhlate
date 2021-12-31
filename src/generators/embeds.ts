import { Embed } from '@discordjs/builders';

export const aboutEmbed = () => {
  return new Embed().setTitle('About.').setDescription(`Set up a thing here.`);
};
