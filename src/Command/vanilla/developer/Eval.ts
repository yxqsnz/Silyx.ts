import { MessageEmbed } from 'discord.js';
import { MessageButton } from 'discord-buttons';
import { GetRandomButtonColor } from '../../../Util/Button';

import Command from '../../../Class/Command';
import { RED_COLOR , DISCORD_GREEN } from '../../../constants';
import { CommandContext, CommandOptions } from '../../../Class/CommandExt';
const tsCode = (input: string) => `\`\`\`ts\n${input} \`\`\``;
export default class EvalCommand extends Command {
  constructor() {
    super(new CommandOptions('eval', ['ev', 'js', 'run-code'], 'Informação', 'Eval command', true, false));
  }
  async execute({ message, args }: CommandContext) {
    let code = args.join(' ');
    const a = new MessageButton().setID('abababaa').setStyle(GetRandomButtonColor()).setLabel('....');
    const embed = new MessageEmbed();
    embed.setTitle("Eval");
    embed.setTimestamp();
    embed.setAuthor(message.author.tag, message?.author?.avatarURL() as string);
    embed.addField("Entrada", tsCode(code), true);

    try {
      const result = eval(code);
      embed.setColor(DISCORD_GREEN);
      embed.addField("Saida - OK", tsCode(result).slice(0, 2000), true);
    } catch(e)  {
      embed.addField("Saida - Erro", tsCode(e as string).slice(0, 2000), true);
      embed.setColor(RED_COLOR);
    }
    
    await message.channel.send('', {embed: embed});

    }
}
