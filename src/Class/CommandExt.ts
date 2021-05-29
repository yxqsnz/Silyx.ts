import { Client, Message } from 'discord.js';
import CommandService from '../Service/Command';
export type Categorys = 'Informação' | 'Miscelânea' | 'Diversão';

export class CommandOptions {
  constructor(
    name: String,
    aliases: String[],
    category: Categorys = 'Informação',
    description: String = 'nada aqui ainda...',
    onlyDev: Boolean = false,
    guildOnly: Boolean = false
  ) {
    this.aliases = aliases;
    this.name = name;
    this.description = description;
    this.onlyDev = onlyDev;
    this.category = category;
    this.guildOnly = guildOnly;
  }
  name: String;
  aliases: String[];
  description: String;
  onlyDev: Boolean;
  guildOnly: Boolean;
  category: Categorys;
}
export class CommandContext {
  constructor(client: Client, message: Message, args: String[], commandService: CommandService) {
    this.client = client;
    this.message = message;
    this.args = args;
    this.commandService = commandService;
  }
  client: Client;
  message: Message;
  args: String[];
  commandService: CommandService;
}
