import { Client, Message } from 'discord.js';
import Command from '../Class/Command';
import { CommandContext } from '../Class/CommandExt';

export default class CommandService {
  constructor() {
    this.commands = [];
  }
  private commands: Command[];
  public RegisterCommand = (command: Command) => {
    this.commands.push(command);
  };
  public GetCommand = (query: String): Command | undefined => {
    for (const command of this.commands) {
      if (command.options.name.toLowerCase() == query.toLowerCase()) return command;
      if (command.options.aliases.includes(query)) return command;
    }
    return undefined;
  };
  public GetCommands = (): Command[] => {
    return this.commands;
  };
  public GenerateContext(client: Client, message: Message, args: String[]): CommandContext {
    return new CommandContext(client, message, args, this);
  }
}
