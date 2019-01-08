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

function parsePython(msgObj, code) {
  console.log(0)
  msgObj.reply("parsing...")
    .then(msg => {
      console.log(1)
      // let options = {
      //   env: {
      //     key: "You Think YOUR'E KYOOL????"}
      // }
      Python.exec(code).then( res => {
        console.log(2)
        try {
          console.log(3)
          msg.delete()
          msgObj.reply("RESULTS:")
          console.log(res)
          
          if (res) msg.channel.send(res)
          else msg.channel.send("ERROR: Python Code EMPTY stdout")
        } catch(e) {
          msg.channel.send(`ERROR WHEN PARSING: ${e}`)
        }
      }).catch((err)=>{
        console.log("func failed: ", err)
        msg.channel.send(`ERROR: ${err}`)
      })
    })
}


client.on("ready", () => {
  console.log("Connected as " + client.user.tag)
})

client.on("message", msg => {
  
  // Prevent bot from responding to its own messages
  if (msg.author == client.user) {
    return null
  }

  if (msg.content.startsWith("!parse python =>")){
    let newMsg = msg.content.substr(16)
    parsePython(msg, newMsg)
  }

  if (msg.content.startsWith("```python")){
    let newMsg = msg.content.slice(0, -3).substr(9)
    console.log(newMsg)
    parsePython(msg, newMsg)
  }
})

client.login(env.key, ()=>{process.env.key = null})