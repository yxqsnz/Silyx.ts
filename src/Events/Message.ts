import { Message } from 'discord.js';
import CommandService from '../Service/Command';
import CooldownUser from '../Class/CooldownUser';
const delays: CooldownUser[] = [];

const inCooldown = (id: string) => {
  for (const user of delays) if (user.id == id && user.inCooldown) return true;
  return false;
};
const getUser = (id: string) => {
  for (const user of delays) if (user.id == id) return user;
};
const removeCooldown = (user: CooldownUser) => {
  const index = delays.indexOf(user);
  if (index > -1) delays.splice(index, 1);
};
const format = (seconds: number) => {
  if (seconds > 0) {
    return `${seconds} segundos`;
  } else {
    return `alguns milissegundos`;
  }
};
const diff = (user: CooldownUser) =>
  process.hrtime(user.lastCommand).toString().slice(0, 1) as unknown as number;
export default async (
  message: Message,
  prefix: string,
  commandService: CommandService,
  commandDelay: number
) => {
  if (
    message.author.bot ||
    !(
      message.content.startsWith(prefix as string) ||
      message.content.startsWith(`<@${message.client.user?.id}>`) ||
      message.content.startsWith(`<@!${message.client.user?.id}>`)
    )
  )
    return;
  const content = message.content
    .trim()
    .replace(`<@${message.client.user?.id}>`, prefix as string)
    .replace(`<@!${message.client.user?.id}>`, prefix as string)
    .trim();

  const raw = content.slice(prefix.length).trim().split(' ');

  const query = raw[0];
  const args = raw.slice(1);
  const command = commandService.GetCommand(query);
  if (command) {
    if (command.options.guildOnly && !message.guild) {
      await message.reply('Me desculpe! Mas esse comando só pode ser executado numa guilda!');
      return;
    }
    // inCooldown(message.author.id) Removido por agora
    if (false) {
      // const user = getUser(message.author.id);
      // if (user) {
      //   const dif = diff(user);
      //   const sdiff = (commandDelay as number) - dif;
      //   if (sdiff < 1) removeCooldown(user);
      //   await message
      //     .reply(`Você tem que esperar \`${format(sdiff)}\` antes de executar outro comando.`)
      //     .catch(() => {});
      //   return;
      // }
    } else {
      const user = new CooldownUser(message.author.id, process.hrtime());
      if (!delays.includes(user)) {
        delays.push(user);
      }
    }
    try {
      command.execute(commandService.GenerateContext(message.client, message, args));
    } catch (e) {
      message
        .reply(`Me desculpe, mas ocorreu um erro ao executar esse comando ${e.message}`)
        .catch(() => {});
    }
  }
};
