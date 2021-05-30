import CommandService from '../Service/Command';

import SlapCommand from './vanilla/fun/Slap';

import BotInfoCommand from './vanilla/info/BotInfo';
import HelpCommand from './vanilla/info/Help';
import PingCommand from './vanilla/info/Ping';

import EvalCommand from './vanilla/developer/Eval';

import CatCommand from './vanilla/misc/Cat';
import OwOIfyCommand from './vanilla/misc/OwOify';
import SearchUserCommand from './vanilla/misc/SearchUser';

export const RegisterCommands = (service: CommandService) => {
  service.RegisterCommand(new PingCommand());
  service.RegisterCommand(new SlapCommand());
  service.RegisterCommand(new HelpCommand());
  service.RegisterCommand(new CatCommand());
  service.RegisterCommand(new BotInfoCommand());
  service.RegisterCommand(new OwOIfyCommand());
  service.RegisterCommand(new SearchUserCommand());
  service.RegisterCommand(new EvalCommand());
};
