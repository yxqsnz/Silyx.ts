import { MessageEmbed } from 'discord.js';
import Command from '../../../Class/Command';
import { GREEN_COLOR } from '../../../constants';
import requests from 'axios';
import { CommandContext, CommandOptions } from '../../../Class/CommandExt';
export default class CatCommand extends Command {
  constructor() {
    super(
      new CommandOptions('cat', ['foto-de-gato', 'gato'], 'Miscelânea', 'Mostra foto de um gato')
    );
  }
  async execute({ message }: CommandContext) {
    const result = (await requests.get('https://aws.random.cat/meow')).data;
    const meowEmbed = new MessageEmbed();
    meowEmbed.setColor(GREEN_COLOR);
    meowEmbed.setTitle('Meow!');
    meowEmbed.setImage(result['file']);
    message.reply('', { embed: meowEmbed });
  }
}
