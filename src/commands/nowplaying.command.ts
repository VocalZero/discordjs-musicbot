import { Message, MessageEmbed } from "discord.js";
import icy from "icy";

export class NowPlayingCommand {
  run(message: Message, config: any, args: string[]) {
    const embed = new MessageEmbed();
    embed.setColor("#38d684");
    embed.setAuthor(message.guild.me.nickname, message.guild.me.user.displayAvatarURL());
    embed.setFooter("GitHub » vocalzero/discordjs-musicbot");

    if (!config.dispatchers.get(message.guild.id)) {
      embed.setDescription("You can't use this command at the moment because the bot doesn't play anything.");
      return message.channel.send(embed);
    }

    const stream = config.currentPlaying.get(message.guild.id);
    icy.get(stream.url, (res: any) => {
      res.on("metadata", (metadata: any) => {
        const title = icy.parse(metadata).StreamTitle;
        embed.setDescription("The bot is currently playing **" + stream.name + "** with the song **" + title + "**.");
        return message.channel.send(embed);
      });
    });
  }
}
