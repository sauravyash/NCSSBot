// discord bot for NCSS 2019
// link:
//      master bot: https://discordapp.com/oauth2/authorize?client_id=531818322174672907&scope=bot&permissions=2146958847
//      beta bot: https://discordapp.com/oauth2/authorize?client_id=534306693706940426&scope=bot&permissions=2146958847
const Discord = require("discord.js")
const client = new Discord.Client()
const readJsonSync = require("read-json-sync")

let env = {}
let local

// bot modules
const nickname = require("./bot_modules/nickname")
const Help_Menu = require("./bot_modules/help")
const eval_code = require("./bot_modules/eval_code")

// constants that the user can change
const prefix = "!"

// read local key if local instance of bot
// for testing
try{
  if (!process.env.key){
    try{
      env = readJsonSync(".env")
    }
    catch(e){
      env = readJsonSync(".env.json")
    }
  } else {
    env = {
      key: process.env.key
    }
  }
  if (!env.user_whitelist){
    local = false
  } else{
    local = true
  }
} catch(e){
  console.log(e)
}


// decalre successful connection to discord API
client.on("ready", () => {
  console.log("Connected as " + client.user.tag)
})

// Create an event listener for new guild members
client.on("guildMemberAdd", member => {
  // Send the message to a designated channel on a server:
  const channel = member.guild.channels.find(ch => ch.name === "names")
  // Do nothing if the channel wasn't found on this server
  if (!channel) return
  // Send the message, mentioning the member
  channel.send(`Welcome to the server, ${member}. Please type \`!nickname\` to verify yourself. `)
})

// THE REAL MAGIC
// Where each message is processed
client.on("message", msg => {
  // ------------------------------
  // all bot response messages / command responses
  // ------------------------------

  if (local){
    if(!env.user_whitelist.includes(msg.author.id)){
      return null
    }
  }

  // Prevent bot from responding to its own messages
  if (msg.author == client.user) {
    return null
  }

  if (msg.content.startsWith(prefix)){
    // get rid of prefix
    let content = msg.content.substring(prefix.length)

    // seperate command from arguments
    // cmd == "command" && arg == "arguments"
    let arr = content.split(" ")
    let cmd = arr[0].toLowerCase()
    arr.shift()
    let arg = arr.join(" ")
    switch (cmd) {
      // A test Hello World Command
      case "hello":
        msg.reply("World", arg)
        break

      // Latency Test
      case "latency":
        msg.reply(`Ping: ${~~(client.ping)}ms`)
        break

      // Change Nickname in names channel
      case "nickname":
        if (msg.channel.name == "names") nickname(msg, arg)
        else msg.reply(`Please use the ${msg.guild.channels.find(channel => channel.name === "names").toString()} channel for the nickname command`)
        break

      // Help Menu
      case "help":
        Help_Menu(msg, client)
        break

      case "eval":
        eval_code(msg, arg)
        break

      default:
        msg.reply(`Sorry ${msg.author.username}, but that was an invalid command!`)
    }
  }

})

// login to discord API
client.login(env.key, ()=>{process.env.key = null})
