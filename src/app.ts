import { Client, Collection } from "discord.js";
import { HelpCommand } from "./commands/help.command";
import { ListCommand } from "./commands/list.command";
import { NowPlayingCommand } from "./commands/nowplaying.command";
import { PlayCommand } from "./commands/play.command";
import { VolumeCommand } from "./commands/volume.command";
import { ErrorEvent } from "./events/error.event";
import { MessageEvent } from "./events/message.event";
import { ReadyEvent } from "./events/ready.event";
import { WarnEvent } from "./events/warn.event";

const client = new Client();

const config = {
  commands: new Collection(),
  streams: new Collection(),
  dispatchers: new Collection(),
  currentPlaying: new Collection(),
  prefix: "!"
};

client.on("ready", () => new ReadyEvent().run(client, config));
client.on("warn", (warn) => new WarnEvent().run(warn));
client.on("error", (error) => new ErrorEvent().run(error));
client.on("message", (message) => new MessageEvent().run(message, config));

config.commands.set("play", new PlayCommand());
config.commands.set("nowplaying", new NowPlayingCommand());
config.commands.set("volume", new VolumeCommand());
config.commands.set("list", new ListCommand());
config.commands.set("help", new HelpCommand());

config.streams.set("atomicradio", { name: "atomicradio", url: "https://listen.atomicradio.eu/one/highquality" });
config.streams.set("iloveradio", { name: "ILoveRadio", url: "http://stream01.ilovemusic.de/iloveradio1.mp3" });
config.streams.set("reyfm", { name: "REYFM", url: "https://reyfm-stream04.radiohost.de/reyfm-original_mp3-320" });

client.login("");
