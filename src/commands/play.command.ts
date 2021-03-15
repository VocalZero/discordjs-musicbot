import { Message, MessageEmbed, StreamDispatcher, VoiceConnection } from "discord.js";

export class PlayCommand {
  run(message: Message, config: any, args: string[]) {
    const { channel } = message.member.voice;
    const { me } = message.member.guild;
    const embed = new MessageEmbed();
    embed.setColor("#38d684");
    embed.setAuthor(message.guild.me.nickname, message.guild.me.user.displayAvatarURL());
    embed.setFooter("GitHub » vocalzero/discordjs-musicbot");

    if (!me.hasPermission("CONNECT") || !me.hasPermission("SPEAK")) {
      embed.setDescription("The bot has no permission to enter a channel or to speak.");
      return message.channel.send(embed);
    }

    if (!channel) {
      embed.setDescription("You must be in a voice channel to select a stream.");
      return message.channel.send(embed);
    }

    if (!args[0] || !config.streams.has(args[0].toLowerCase())) {
      embed.setDescription("The stream you entered does not exist.\nTake a look at the available streams with `" + config.prefix + "list`.");
      return message.channel.send(embed);
    }

    const stream = config.streams.get(args[0].toLowerCase());

    channel.join().then((connection: VoiceConnection) => {
      const dispatcher: StreamDispatcher = connection.play(stream.url, { highWaterMark: 50 });
      dispatcher.on("end", (reason) => {
        console.log(`Dispatcher stopped playing on ${message.guild.name} (${message.guild.id})`);
        config.dispatchers.set(message.guild.id, undefined);
      });
      config.dispatchers.set(message.guild.id, dispatcher);
      config.currentPlaying.set(message.guild.id, stream);
      console.log(`Stream started playing on ${message.guild.name} (${message.guild.id})`);

      embed.setDescription("The bot is now playing **" + stream.name + "**.");
      return message.channel.send(embed);
    });
  }
}
