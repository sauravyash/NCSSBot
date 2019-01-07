// discord bot for NCSS 2019
// link: 
//      https://discordapp.com/oauth2/authorize?client_id=531818322174672907&scope=bot&permissions=1245183424
const Discord = require("discord.js")
const client = new Discord.Client()
const {PythonShell} = require("python-shell")
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

  if (msg.content.startsWith("!")){
    let _msg = msg.content.substr(1)
    
    if (_msg.startsWith("parse")){
      msg.reply("parsing...")
        .then(msg => {
          let code = _msg.slice(6)
          PythonShell.runString(code, null, function (err, res) {
            try{
              msg.delete()
              if (err) throw err
              msg.channel.send("RESULTS:")
              msg.channel.send(res)
            } catch(e) {
              msg.channel.send(`ERROR WHEN PARSING: ${e}`)
            }
          })
        })
      
    }
  }
})

client.login(env.key)