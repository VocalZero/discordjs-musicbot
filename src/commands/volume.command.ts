import { Message, MessageEmbed, StreamDispatcher } from "discord.js";

export class VolumeCommand {
  run(message: Message, config: any, args: number[]) {
    const embed = new MessageEmbed();
    embed.setColor("#38d684");
    embed.setAuthor(message.guild.me.nickname, message.guild.me.user.displayAvatarURL());
    embed.setFooter("GitHub » vocalzero/discordjs-musicbot");

    if (!config.dispatchers.get(message.guild.id)) {
      embed.setDescription("You can't use this command at the moment because the bot doesn't play anything.");
      return message.channel.send(embed);
    }

    if (!args[0] || isNaN(args[0])) {
      embed.setDescription("You must enter a number to change the volume.");
      return message.channel.send(embed);
    }

    if (args[0] > 100 || args[0] < 0) {
      embed.setDescription("You must enter a number between 0 and 100.");
      return message.channel.send(embed);
    }

    const dispatcher: StreamDispatcher = config.dispatchers.get(message.guild.id);
    dispatcher.setVolumeLogarithmic(args[0] / 100);
    embed.setDescription("You have changed the volume to **" + args[0] + "%**.");
    return message.channel.send(embed);
  }
}
