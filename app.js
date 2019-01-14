// discord bot for NCSS 2019
// link:
//      https://discordapp.com/oauth2/authorize?client_id=531818322174672907&scope=bot&permissions=1245183424
const Discord = require("discord.js")
const client = new Discord.Client()
const readJsonSync = require("read-json-sync")

let env

if (!process.env.key){
  env = readJsonSync(".env")
} else {
  env = {
    key: process.env.key
  }
}

client.on("ready", () => {
  console.log("Connected as " + client.user.tag)
})

client.on("message", msg => {

  // Prevent bot from responding to its own messages
  if (msg.author == client.user) {
    return null
  }

  // all command messages

  if (msg.content.startsWith("!hello")){
    msg.reply("World!")
  }

})

client.login(env.key, ()=>{process.env.key = null})
