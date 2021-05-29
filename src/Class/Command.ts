import { CommandContext, CommandOptions } from './CommandExt';

export default abstract class Command {
  constructor(options: CommandOptions) {
    this.options = options;
  }
  options!: CommandOptions;
  abstract execute(context: CommandContext): Promise<void>;
}
