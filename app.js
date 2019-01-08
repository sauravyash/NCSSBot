// discord bot for NCSS 2019
// link: 
//      https://discordapp.com/oauth2/authorize?client_id=531818322174672907&scope=bot&permissions=1245183424
const Discord = require("discord.js")
const client = new Discord.Client()
let Python = require("python-runner")
const readJsonSync = require("read-json-sync")

let env

if (!process.env.key){
  env = readJsonSync(".env")
} else {
  env = {
    key: process.env.key 
  } 
}

let parsePython = msg => {
  let _msg = msg.content.substr(1)
  if (_msg.startsWith("parse python =>")){
    msg.reply("parsing...")
      .then(msg => {
        let code = _msg.slice(15)
        let options = {
          env: {
            key: "You Think YOUR'E KYOOL????"
          }
        }
        Python.exec(code, options).then( res =>{
          try{
            msg.delete()
            msg.reply("RESULTS:")
            console.log(res)
            
            if (res) msg.channel.send(res)
            else msg.channel.send("ERROR: Python Code EMPTY stdout")
          } catch(e) {
            msg.channel.send(`ERROR WHEN PARSING: ${e}`)
          }
        }).catch((err)=>{
          msg.channel.send(`ERROR: ${err}`)
        })
      })
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
    parsePython(msg)
  }
})

client.login(env.key)