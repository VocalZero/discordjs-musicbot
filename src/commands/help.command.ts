import { Message, MessageEmbed } from "discord.js";

export class HelpCommand {
  run(message: Message, config: any, args: string[]) {
    const embed = new MessageEmbed();
    embed.setColor("#38d684");
    embed.setAuthor(message.guild.me.nickname, message.guild.me.user.displayAvatarURL());
    embed.setFooter("GitHub » vocalzero/discordjs-musicbot");
    embed.setDescription(
      "These commands are currently available:\n" +
        config.prefix +
        "help, " +
        config.prefix +
        "list, " +
        config.prefix +
        "nowplaying, " +
        config.prefix +
        "play, " +
        config.prefix +
        "volume"
    );
    return message.channel.send(embed);
  }
}
