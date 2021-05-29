export default class Config {
  constructor(token: string, prefix: string, commandDelay: Number) {
    this.TOKEN = token;
    this.PREFIX = prefix;
    this.COMMAND_DELAY = commandDelay;
  }
  public TOKEN: string;
  public PREFIX: string;
  public COMMAND_DELAY: Number;
}
