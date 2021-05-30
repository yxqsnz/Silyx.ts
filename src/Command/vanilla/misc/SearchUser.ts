
import Command from '../../../Class/Command';
import { CommandContext, CommandOptions } from '../../../Class/CommandExt';
import { MessageEmbed } from 'discord.js';
import { MessageButton } from 'discord-buttons'
import { DISCORD_GREEN } from '../../../constants'
import { ExtractInfoFromButton } from '../../../Util/Button';
// Source: https://stackoverflow.com/questions/42761068/paginate-javascript-array
const paginate = (array: any[], page_size: number, page_number: number) => 
  array.slice((page_number - 1) * page_size, page_number * page_size);


export default class SearchUserCommand extends Command {
  constructor() {
    super(new CommandOptions('searchuser', ['procurar-usurio'], 'Miscelânea', 'Procura um usuário', false, true));
  }
  async execute({ message, args }: CommandContext) { 
  	 if (!args.length) {
  	 	await message.reply("Você precisa botar um argumento!");
  	 	return;
  	 }
  	 

  	 const user = args[0];
     const members = await message?.guild?.members.fetch();


  	 const foundUsers: Object[] = [];
     const users: String[] = [];

     members?.forEach(member => {
  	 	if (member.user.tag.includes(user) || member?.nickname?.includes(user)) {
  	 		 foundUsers.push({ 
            name: member.user.tag,
            id: member.user.id,
            avatar_url: member.user.avatarURL({ dynamic: true })
          });
  	 	}
  	 });
     foundUsers.forEach((it: any) => 
       users.push(`**[[Avatar]](${it.avatar_url})** **${it.name}**: \`${it.id}\``)
     );
     const pages = [];
     const page = {current: 1};

     const nextButton = new MessageButton()
                             .setID(`button_${message.id}_next`)
                             .setLabel('->')
                             .setStyle('blurple')
     const homeButton = new MessageButton()
                             .setLabel("-")
                             .setStyle("blurple")
                             .setID(`button_${message.id}_home`)
     const backButton = new MessageButton()
                             .setID(`button_${message.id}_back`)
                             .setLabel("<-")
                             .setStyle('blurple')

     const buttons = [backButton, homeButton, nextButton];
     const embed = new MessageEmbed();
     embed.setTitle('Pronto!');
     embed.setColor(DISCORD_GREEN);
     embed.setFooter(`foram encontrados ${users.length} usuários.`);
     embed.setDescription(paginate(users, 7, page.current).join('\n'));
       
     const msg = await (message as any) .channel.send('', { embed: embed, buttons: buttons });
     
     const filter = (button: any) => button.clicker.user.id === message.author.id;

     const collector = (msg as any).createButtonCollector(filter, { time: 60000 });
     collector.on('collect', async (b: any) => {
       const info = ExtractInfoFromButton(b);
       if (info.action == 'next') {
         
         page.current += 1;
         embed.setDescription(paginate(users, 10, page.current).join('\n'));
       } else if (info.action == 'back') {
         page.current -= 1;
         embed.setDescription(paginate(users, 10, page.current).join('\n'));
         
       } else {
         page.current = 1;
         embed.setDescription(paginate(users, 10, page.current).join('\n'));
       }
        await msg.edit(embed).catch(() => {});
        
        await b.defer().catch(() => {});
     });
     collector.on('end', (_: any) => {
       buttons.map(b => b.setDisabled(true));
       msg.edit('', { embed: embed, buttons: buttons });
     })
     await message.channel.stopTyping();
  }
}