import { Client } from "discord.js";

export class ReadyEvent {
  run(client: Client, config: any) {
    console.log(`${client.user.tag}, ready to serve ${client.users.cache.size} users.`);
    console.log(`Loading a total of ${config.commands.size} commands.`);
  }
}
