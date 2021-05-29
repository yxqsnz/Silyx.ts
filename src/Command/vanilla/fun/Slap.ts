import { MessageEmbed } from 'discord.js';
import Command from '../../../Class/Command';
import { RED_COLOR } from '../../../constants';
import { CommandContext, CommandOptions } from '../../../Class/CommandExt';
import NekosClient from 'nekos.life';
export default class SlapCommand extends Command {
  constructor() {
    super(new CommandOptions('slap', ['tp', 'tapa'], 'Diversão', 'da um tapa em alguém.'));
  }
  async execute({ message }: CommandContext) {
    const client = new NekosClient();
    const url = await client.sfw.slap();
    const SlapEmbed = new MessageEmbed().setColor(RED_COLOR).setTitle('Será que vi um tapa?');
    if (message.mentions.users.size < 1) {
      await message.reply('Você precisa marcar alguém!');
      return;
    }
    const mention = message.mentions.users.first();
    SlapEmbed.setDescription(`<@${message.author.id}> deu um tapa em <@${mention?.id}>`);
    SlapEmbed.setImage(url.url);
    const avatar = message.author.avatarURL();
    SlapEmbed.setThumbnail(
      avatar
        ? (avatar as string)
        : 'https://www.pngfind.com/pngs/m/11-112374_liquidsodaniums-avatar-think-emoji-hd-png-download.png'
    );
    SlapEmbed.setTimestamp();
    await message.channel.send('** **', { embed: SlapEmbed });
  }
}
