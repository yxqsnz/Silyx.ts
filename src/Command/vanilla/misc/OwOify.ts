import Command from '../../../Class/Command';
import { CommandContext, CommandOptions } from '../../../Class/CommandExt';
import NekosClient from 'nekos.life';
export default class OwOIfyCommand extends Command {
  constructor() {
    super(new CommandOptions('owoify', ['owo'], 'Miscelânea', 'UwU'));
  }
  async execute({ message, args }: CommandContext) {
    const client = new NekosClient();
    if (!args.length) {
      await message.reply('Você precisa botar um argumento!');
      return;
    }
    const owo = (await client.sfw.OwOify({ text: args.join(' ') })).owo;
    message.reply(owo);
  }
}
