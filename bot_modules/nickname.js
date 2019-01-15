const Discord = require("discord.js")
const client = new Discord.Client()

function nickname(msg, arg) {
  arg = arg.split(' ')
  if (!msg.member.nickname) {
    if (!arg[0] || !arg[1] || !arg[2]) {
      msg.reply("Please use the arguments: [First Name, Last Name, Group Number]")
    } else {
      msg.member.setNickname(arg[0] + " " + arg[1].split('')[0] + " [" + arg[2] + "]")
      msg.reply("Initial Name Successfully Set")
    }
  } else {
    if (arg[0] === 'reset') {
      msg.member.setNickname(msg.member.nickname.split(' : ')[1])
      msg.reply("Nickname Successfully Reset")
    } else if (!arg[0]) {
      msg.reply("Please write the command in the following format.\n`!nickname {nickname} || reset")
    } else {
      msg.member.setNickname(arg[0] + " : " + msg.member.nickname)
      msg.reply("Custom Nickname Successfully Set")
    }
  }
}

module.exports = nickname
