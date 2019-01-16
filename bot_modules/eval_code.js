let safeEval = require("safe-eval")

function eval_code(msg, arg){
  // clean up
  let code = arg.substring(3)
  code = code.slice(0, -3)
  console.log(code)
  let arr = code.split("\n")
  let lang = arr[0]
  arr.shift()
  code = arr.join("\n")
  let res = ""
  console.log(res)
  switch (lang) {
    case "js":
        try{
          res = safeEval(code)
          if (!res){
            msg.reply("Error: Nothing was returned from the statement. Output: " + res)
          }
          msg.reply("`" + res +"`")
        } catch(e){
          msg.reply(`ERROR: ${e}`)
        }

      break

    default:
      msg.reply(`Sorry, the language ${lang} is not supported yet.`)
  }

}

module.exports = eval_code
