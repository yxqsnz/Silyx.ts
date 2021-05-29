import { MessageEmbed } from 'discord.js';
import Command from '../../../Class/Command';
import { DISCORD_BLURPLE } from '../../../constants';
import { CommandContext, CommandOptions } from '../../../Class/CommandExt';
export default class PingCommand extends Command {
  constructor() {
    super(new CommandOptions('ping', ['p', 'latencia']));
  }
  async execute({ client, message }: CommandContext) {
    const embed = new MessageEmbed();
    embed.setColor(DISCORD_BLURPLE);
    embed.setTitle('Pong!');
    embed.setDescription(`**WebSocket**: \`${client.ws.ping}ms\`\n**Gateway**: \`...\``);

    const msg = await message.reply(embed);
    const gatewayPing = Math.floor(
      msg.createdAt.getMilliseconds() - message.createdAt.getMilliseconds()
    );
    embed.setDescription(
      `**WebSocket**: \`${client.ws.ping}ms\`\n**Gateway**: \`${gatewayPing}ms\``
    );
    await msg.edit(embed);
  }
}
