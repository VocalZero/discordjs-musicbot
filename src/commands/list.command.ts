import { Message, MessageEmbed } from "discord.js";

export class ListCommand {
  run(message: Message, config: any, args: string[]) {
    const embed = new MessageEmbed();
    embed.setColor("#38d684");
    embed.setAuthor(message.guild.me.nickname, message.guild.me.user.displayAvatarURL());
    embed.setFooter("GitHub » vocalzero/discordjs-musicbot");
    for (const streamName of config.streams.keyArray()) {
      const stream = config.streams.get(streamName);
      embed.addField(stream.name, stream.url);
    }
    return message.channel.send(embed);
  }
}
