const Discord = require("discord.js");
const client = new Discord.Client();
require("dotenv").config();
const { BOT_TOKEN, YOUTUBE_API_KEY } = process.env;
const ytdl = require("ytdl-core");
const Youtube = require("youtube-node");
const youtube = new Youtube();
const dialog = require("./dialog");
const {
  explain,
  new_log,
  ban_log,
  block_log,
  del_log,
  read_log,
} = require("./bot");

youtube.setKey(YOUTUBE_API_KEY);

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on("guildMemberAdd", (member) => {
  const channel = member.guild.channels.cache.find(
    (ch) => ch.name === "member-log"
  );
  if (!channel) return;
  new_log(member);
  channel.send(
    `${member}님 안녕하세요? 저는 24시간 이 곳을 감지하는 cctv겸용 봇이에요`
  );
});

client.on("messageDelete", (msg) => {
  let storing_msg = `${msg.author.username} : ${msg.content}`;
  del_log(storing_msg);
});

client.on("guildMemberRemove", (member) => {
  ban_log(member);
});

client.on("guildBanAdd", (guild, user) => {
  block_log(user.author.username);
});

client.on("message", async (msg) => {
  try {
    if (msg.content.startsWith("!help")) {
      await msg.channel.send(explain);
    }

    if (msg.content.startsWith("!join")) {
      if (msg.member.voice.channel) {
        const connection = await msg.member.voice.channel.join();
        if (!connection) console.log("join error");
      } else {
        await msg.reply("먼저 채널에 들어가놓고 부르세요. 짜증나게");
      }
    }

    if (msg.content.startsWith("!youtube")) {
      await msg.member.voice.channel.join().then((connection) => {
        let search_word = msg.content.replace("!youtube", "");
        let limit = 1;
        youtube.search(search_word, limit, (err, result) => {
          if (err) return;
          let video_id = result["items"][0].id.videoId;
          let url = "https://www.youtube.com/watch?v=" + video_id;
          connection.play(ytdl(url, { filter: "audioonly" }));
        });
      });
    }

    if (msg.content.startsWith("!link")) {
      await msg.member.voice.channel.join().then((connection) => {
        let url = msg.content.replace("!link", "");
        connection.play(ytdl(url, { filter: "audioonly" }));
      });
    }

    if (msg.content.startsWith("!log")) {
      let log_info = read_log();
      await msg.channel.send(log_info);
    }

    if (msg.content.startsWith("!stop")) {
      msg.member.voice.channel.leave();
    }

    if (msg.content.startsWith("!exit")) {
      let outbot = await msg.channel.send("ByeBye~~");
      if (outbot) client.destroy();
    }

    if (msg.content.startsWith("!restart")) {
      let outbot = await msg.channel.send("restarting...");
      if (outbot) client.destroy();
      client.login(BOT_TOKEN);
    }

    if (msg.content.startsWith("?")) {
      let user_msg = msg.content.replace("?", "");
      let reply = await dialog.reply(user_msg);
      msg.reply(reply);
    }
  } catch (error) {
    console.log(error);
  }
});

client.login(BOT_TOKEN);
