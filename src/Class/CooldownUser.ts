export default class CooldownUser {
  constructor(id: string, lastCommand: [number, number]) {
    this.id = id;
    this.lastCommand = lastCommand;
    this.inCooldown = true;
  }
  public id: string;
  public lastCommand: [number, number];
  public inCooldown: Boolean;
}
