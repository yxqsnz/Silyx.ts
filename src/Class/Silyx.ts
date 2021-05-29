import { Client } from 'discord.js';
import Disbut from 'discord-buttons';
import { config } from 'dotenv';
import * as CommandHandler from '../Command/Handler';
import CommandService from '../Service/Command';
import Config from './Config';
import OnMessage from '../Events/Message';
import OnReady from '../Events/Ready';
export default class Silyx {
  constructor() {
    this.Client = new Client();
    this.Config = new Config('', '', -1);
    this.CommandService = new CommandService();
  }
  public Client: Client;
  public Config: Config;
  public CommandService: CommandService;
  private setup = () => {
    config();
    Disbut(this.Client);
    CommandHandler.RegisterCommands(this.CommandService);
    this.Config = new Config(
      process.env.TOKEN as string,
      process.env.PREFIX as string,
      process.env.DELAY as unknown as number
    );
  };
  public launch = () => {
    this.setup();
    this.Client.on('message', (message) =>
      OnMessage(message, this.Config.PREFIX, this.CommandService, this.Config.COMMAND_DELAY)
    );
    this.Client.on('ready', OnReady);
    this.Client.login(this.Config.TOKEN);
  };
}
