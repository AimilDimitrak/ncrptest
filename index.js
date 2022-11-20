const djs = require('discord.js');
const client = new djs.Client();
const prefix = "pf!";

client.on("message", (message) => {
  let args = message.content.split(' ');
  if (message.content.startsWith(prefix + "kick")) {
    
  }
});
