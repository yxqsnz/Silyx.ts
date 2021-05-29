import Command from '../../../Class/Command';
import DiscordButtons from 'discord-buttons';
import { CommandContext, CommandOptions } from '../../../Class/CommandExt';
import { ExtractInfoFromButton, GetRandomButtonColor } from '../../../Util/Button';
import { MessageEmbed } from 'discord.js';
import { DISCORD_BLURPLE } from '../../../constants';
import CommandService from '../../../Service/Command';

const getCommandsByCategory = (query: String, service: CommandService) => {
  const commands: CommandOptions[] = [];
  service.GetCommands().forEach((command) => {
    if (command.options.category.toLowerCase() == query.toLocaleLowerCase())
      commands.push(command.options);
  });
  return commands;
};

export default class HelpCommand extends Command {
  constructor() {
    super(
      new CommandOptions(
        'help',
        ['ajuda', 'help', 'comandos'],
        'Informação',
        'Mostra os comandos do bot'
      )
    );
  }
  async execute({ message, commandService, args }: CommandContext) {
    if (args.length) {
      const command = commandService.GetCommand(args[0]);
      if (command) {
        const commandEmbed = new MessageEmbed();
        commandEmbed.setColor(DISCORD_BLURPLE);
        commandEmbed.setTitle(`Informações de ${command.options.name}`);
        commandEmbed.setDescription(`
          Nome: \`${command.options.name}\`
          Descrição: \`${command.options.description}\`
          Sinônimos: \`${command.options.aliases.join(', ')}\`
        `);
        message.reply('Aqui está', { embed: commandEmbed });
      } else {
        message.reply(`o comando ${args[0]} não existe.`);
      }
      return;
    }
    const cats: string[] = [];
    const buttons: DiscordButtons.MessageButton[] = [];
    commandService.GetCommands().forEach((command) => {
      if (!cats.includes(command.options.category)) cats.push(command.options.category);
    });
    cats.forEach((cat) => {
      buttons.push(
        new DiscordButtons.MessageButton()
          .setStyle(GetRandomButtonColor())
          .setLabel(cat)

          .setID(`button_${message.id}_${cat}`)
      );
    });
    buttons.push(
      new DiscordButtons.MessageButton()
        .setStyle('red')
        .setLabel('Fechar')
        .setID(`button_${message.id}_close`)
    );

    const helpEmbed = new MessageEmbed();
    helpEmbed.setColor(DISCORD_BLURPLE);
    helpEmbed.setTitle('Precisa de ajuda? Aqui meus comandos!');
    helpEmbed.setTitle('*Caso você não consiga ver os botões, atualize seu Discord.*');
    helpEmbed.setAuthor(
      message.author.tag,
      message.author.avatarURL({ dynamic: true, format: 'png', size: 1024 })?.toString()
    );

    const msg = await (message as any).channel.send('Menu de ajuda', {
      buttons: buttons,
      embed: helpEmbed,
    });

    const filter = (button: any) => button.clicker.user.id === message.author.id;

    const collector = (msg as any).createButtonCollector(filter, { time: 120000 });

    collector.on('collect', async (b: any) => {
      const info = ExtractInfoFromButton(b);
      if (info.action == 'close') {
        try {
          collector.stop();

          await msg.delete().catch();
        } catch (_) {}

        return;
      }
      const commands: String[] = [];
      getCommandsByCategory(info.action, commandService).forEach((command) => {
        commands.push(command.name);
      });
      helpEmbed.setDescription(
        `existem ${commands.length} comandos na categoria ${info.action}: \`${commands.join(
          ', '
        )}\``
      );
      await msg.edit('Menu de ajuda', { buttons: buttons, embed: helpEmbed });
      await b.defer();
    });
    collector.on('end', async (_: any) => {
      buttons.map((btn) => btn.setDisabled(true));
      await msg.edit('Menu de ajuda', { embed: helpEmbed, buttons: buttons });
    });
  }
}
