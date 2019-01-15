const Discord = require("discord.js")

function Help_Menu(msg, client) {
  msg.reply({
    embed: {
      color: 2899536,
      title: "The NCSS Bot",
      url: "https://github.com/sauravyash/NCSSBot",
      description: "An all purpose bot designed to manage the NCSS Discord Server",
      fields: [
        {
          name: "!nickname {args}",
          value: "This command allows you to set a nickname and verify yourself by adding a real name on start. ```!nickname [First Name] [Last Name] [Group Number]``` \nAfter registering you may set a custom name using: ```!nickname [nickname] ```"
        },
        {
          name: "!latency",
          value: "This command pings the Discord API in order to check latency of the server of the bot."
        }
      ],
      timestamp: new Date(),
      footer: {
        icon_url: client.user.avatarURL,
        text: "May be used under the MIT License."
      }
    }
  })
}

module.exports = Help_Menu
