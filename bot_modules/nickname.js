const Discord = require("discord.js")
const client = new Discord.Client()

function nickname(msg, arg) {

  // !username lolwot
  // nickname (Yash A [9])
  console.log(msg.author.nickname);
  msg.member.setNickname('Cool Name')
    .then(console.log)
    .catch(console.error);

  if (!msg.member.nickname) {
    msg.reply("Test No nickname" + msg.author.username + msg.member.nickname)
  } else {
    msg.reply("Test nickname" + msg.author.username + msg.member.nickname)
  }

}

module.exports = nickname
