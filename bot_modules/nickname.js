//const Discord = require("discord.js")

// function nickname(msg, arg) {
//   arg = arg.split(' ')
//   if (!msg.member.nickname) {
//     if (!arg[0] || !arg[1] || !arg[2]) {
//       msg.reply("Please write the command in the following format.\n\`!nickname {First Name} {Last Name} {Group Number}\`")
//       //Please use the arguments: [First Name, , Group Number]
//     } else {
//       msg.member.setNickname(`${arg[0]} ${arg[1].split('')[0]} [${arg[2]}]`)
//       msg.reply("Initial Name Successfully Set")
//     }
//   } else {
//     if (arg[0] === 'reset') {
//       msg.member.setNickname(msg.member.nickname.split(' : ')[msg.member.nickname.split(' : ').length - 1])
//       msg.reply("Nickname Successfully Reset")
//     } else if (!arg[0]) {
//       msg.reply("Please write the command in the following format.\n\`!nickname {nickname} || reset\`")
//     } else {
//       msg.member.setNickname(arg.join(" ").trim() + " : " + msg.member.nickname.split(' : ')[msg.member.nickname.split(' : ').length - 1])
//       msg.reply("Custom Nickname Successfully Set")
//     }
//   }
// }

function nickname(msg, arg){
  // if user has not created a username
  if (!msg.member.nickname) {
    let arr = arg.split(" ")
    if (arr.length < 3){
      msg.reply("Please write the command in the following format.\n`!nickname {First Name} {Last Name} {Group Number}`")
      return null
    }
    let number = arr[arr.length - 1]
    arr.pop()
    let lastName = arr[arr.length - 1]
    arr.pop()
    let firstName = arr.join(" ")

    // TODO: ADD SOME VALIDATION CODE FOR FNAME L NAME AND GROUP NUMBER
    msg.member.setNickname(`(${firstName} ${lastName} [${number}])`)
    msg.reply("Initial Name Successfully Set")
  }
  else{
    let oldNickname = msg.member.nickname
    let newNickname = oldNickname.substring(oldNickname.lastIndexOf(":")).substring(oldNickname.lastIndexOf("(") + 1)
    if(arg === "reset"){
      if ((newNickname.length - 1) === newNickname.lastIndexOf("]")){
        msg.reply("Nickname Successfully Reset")
        return null
      } else{
        newNickname = newNickname.slice(0,-1)
      }
      console.log(newNickname)
      msg.member.setNickname(newNickname)
      msg.reply("Nickname Successfully Reset")
    }
    else{
      if ((newNickname.length - 1) === newNickname.lastIndexOf(")")){
        newNickname = newNickname.slice(0,-1)

      }
      if (newNickname.length > 32){
        msg.reply("Nickname Error: Name Too Long")
        return null
      }
      msg.member.setNickname(`${arg} (${newNickname})`)
      msg.reply("Custom Nickname Successfully Set")
    }
  }
}
module.exports = nickname
