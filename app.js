// discord bot for NCSS 2019
// link:
//      https://discordapp.com/oauth2/authorize?client_id=531818322174672907&scope=bot&permissions=1245183424
const Discord = require("discord.js")
const client = new Discord.Client()
const readJsonSync = require("read-json-sync")

let env

// constants that the user can change
const prefix = "!"

// read local key if local instance of bot
// for testing
try{
  if (!process.env.key){
    env = readJsonSync(".env")
  } else {
    env = {
      key: process.env.key
    }
  }
} catch(e){
  console.log(e)
}

// decalre successful connection to discord API
client.on("ready", () => {
  console.log("Connected as " + client.user.tag)
})

// THE REAL MAGIC
// Where each message is processed
client.on("message", msg => {
  // ------------------------------
  // all bot response messages / command responses
  // ------------------------------

  // Prevent bot from responding to its own messages
  if (msg.author == client.user) {
    return null
  }

  if (msg.content.startsWith(prefix)){
    // get rid of prefix
    content = msg.content.substring(prefix.length)

    // seperate command from arguments
    // cmd == "command" && arg == "arguments"
    let arr = content.split(" ")
    let cmd = arr[0].toLowerCase()
    arr.shift()
    let arg = arr.join(" ")

    // A test Hello World Command
    if(cmd == "hello"){
      msg.reply("World")
    }

  }

})

// login to discord API
client.login(env.key, ()=>{process.env.key = null})
