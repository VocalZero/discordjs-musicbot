import { Message } from "discord.js";

export class MessageEvent {
  async run(message: Message, config: any) {
    if (message.guild === null || message.guild.id === null) {
      return;
    }
    if (message.author.bot) return;

    const prefix = config.prefix;
    const prefixMention = new RegExp(`^<@!?${message.client.user.id}>( |)$`);
    if (message.content.match(prefixMention)) {
      return;
    }

    if (message.content.indexOf(prefix) !== 0) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if (message.guild && !message.member) await message.guild.members.fetch(message.author);

    const cmd = config.commands.get(command);
    if (!cmd) return;

    cmd.run(message, config, args);
  }
}
