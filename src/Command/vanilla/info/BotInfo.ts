import Command from '../../../Class/Command';
import { CommandContext, CommandOptions } from '../../../Class/CommandExt';
import { MessageButton } from 'discord-buttons';
import { MessageEmbed } from 'discord.js';
import { DISCORD_BLURPLE, GREEN_COLOR } from '../../../constants';
import { HumanSize } from '../../../Util/Bindings';
import { ExtractInfoFromButton } from '../../../Util/Button';
import { GetRamUsage } from '../../../Util/Misc';
const code = (text: String) => `\`${text}\``;
export default class BotInfoCommand extends Command {
  constructor() {
    super(new CommandOptions('botinfo', ['silyx', 'bot'], 'Informação', 'informações do bot'));
  }
  async execute({ message }: CommandContext) {
    const ExtendedInfoButton = new MessageButton()
      .setID(`button_${message.id}_advancedinfo`)
      .setStyle('blurple')
      .setLabel('ver informações avançadas');
    const addMeButton = new MessageButton().setup({
      emoji: ':rocket:',
      style: 'url',
      label: 'Adicione me!',
      url: 'https://discord.com/oauth2/authorize?client_id=825036997990809620&scope=bot&permissions=52224',
    });

    const SourceCodeButton = new MessageButton().setup({
      emoji: ':rocket:',
      style: 'url',
      label: 'Código fonte',
      url: 'https://github.com/yxqsnz/Silyx.js',
    });

    const menu = { advancedinfo: false };
    const BotInfoEmbed = new MessageEmbed();
    BotInfoEmbed.setColor(DISCORD_BLURPLE);
    BotInfoEmbed.setDescription(
      'Olá, sou o silyx um simples bot para o discord feito pelo yxqsnz!'
    );
    BotInfoEmbed.setTitle('Minhas informações');
    const msg = await (message as any).reply('', {
      buttons: [ExtendedInfoButton, addMeButton],
      embed: BotInfoEmbed,
    });
    const filter = (button: any) => button.clicker.user.id === message.author.id;

    const collector = (msg as any).createButtonCollector(filter, { time: 60000 });
    collector.on('collect', async (b: any) => {
      if (ExtractInfoFromButton(b).action == 'advancedinfo') {
        if (!menu.advancedinfo) {
          await b.defer(true);

          const ramUsage = GetRamUsage();
          const rssUsage = HumanSize(ramUsage.rss);
          const heapTotal = HumanSize(ramUsage.heapTotal);
          const heapUsed = HumanSize(ramUsage.heapUsed);
          const external = HumanSize(ramUsage.external);
          const arrayBuffers = HumanSize(ramUsage.arrayBuffers);
          const ExtendedInfoEmbed = new MessageEmbed();
          ExtendedInfoEmbed.setTitle('Minhas informações - avançada');
          ExtendedInfoEmbed.addField(
            '----> RAM',
            `
          > **RSS**: ${code(rssUsage)}
          > **HEAP TOTAL**: ${code(heapTotal)}
          > **HEAP USED**: ${code(heapUsed)}
          > **EXTERNAL**: ${code(external)}
          > **ARRAY BUFFERS**: ${code(arrayBuffers)}
                                     `
          );
          ExtendedInfoEmbed.setColor(GREEN_COLOR);
          ExtendedInfoButton.setLabel('Voltar');
          await msg.edit('', {
            embed: ExtendedInfoEmbed,
            buttons: [ExtendedInfoButton, SourceCodeButton],
          });
          menu.advancedinfo = true;
        } else {
          ExtendedInfoButton.setLabel('ver informações avançadas');
          await msg.edit('', {
            embed: BotInfoEmbed,
            buttons: [ExtendedInfoButton, addMeButton],
          });
          await b.defer();
          menu.advancedinfo = false;
        }
      }
    });
    collector.on('end', async (_: any) => {
       msg.delete().catch(() => {})
    });
  }
}
