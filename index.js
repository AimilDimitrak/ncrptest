const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = "pf!";
const fs = require('fs');

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
  command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

var used1 = false;
client.on("ready", async () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setStatus('online').catch(console.error);
  setInterval(() => {
    if (used1) {
      client.user.setActivity("Works with prefix pf!", {
        type: "PLAYING"
      })
      used1 = false;
    }
    else {
      client.user.setActivity("The server going more active!", {
        type: "WATCHING"
      })
      used1 = true;
    }
  }, 10000);
})
client.on("message", (message) => {
  let args = message.content.split(' ');
  if (message.content.startsWith(prefix + "kick")) {
    client.commands.get('kick').execute(message, args);
    } else
      if (message.content.startsWith(prefix + "ban")) {
        client.commands.get('ban').execute(message, args);
      } else
        if (message.content.startsWith(prefix + "slowmode")) {
          client.commands.get('slowmode').execute(message, args);
        } else
          if (message.content.startsWith(prefix + "clear")) {
            client.commands.get('clear').execute(message, args);
          } else
            if (message.content.startsWith(prefix + "mute")) {
              client.commands.get('mute').execute(message, args);
            } else
                if (message.content.startsWith(prefix + "unmute")) {
                    client.commands.get('unmute').execute(message, args);
                } else
                    if (message.content.startsWith(prefix + "myinfo")) {
                        client.commands.get('myinfo').execute(message, args);
                            } else
                                if (message.content.startsWith(prefix + "help")) {
                                    let embed = new Discord.MessageEmbed()
                                        .setTitle('Here is all of my commands!')
                                        .setDescription('`pf!help` Show all of my commands!\n`pf!slowmode` Change a slowmode of a channel\n`pf!clear` Clear some messages!\n`pf!mute` Mute a member\n`pf!unmute` Unmute a member!\n`pf!myinfo` Shows your account information.\n`pf!kick` Kick a member\n`pf!ban` Ban a member\n`pf!ping` Shows the client latency\n`pf!staff` Sends you the application to become staff\n`pf!developer` Sends you the application to become developer')
                                        .setColor("RANDOM")
                                        .setFooter('The Proffesionals Server Utilities')
                                        .setTimestamp(message.timestamp = Date.now())
                                    message.channel.send(embed)
                                } else
                                  if (message.content.startsWith(prefix + 'say')) { // CHANGE ONLY IF EXPERT // 
                                    let sendMessage = message.content.slice(5).trim(); //2 is accounting for the 2 space between prefix and # and prefix and the main content
                                    setTimeout(() => { message.delete() }, 1000)
                                    message.channel.send(sendMessage)
                  } else
                  if (message.content.startsWith(prefix + "ping")) {
                      message.channel.send('Loading data').then(async (msg) => {
                        msg.delete()
                        let embed = new Discord.MessageEmbed()
                          .setTitle('Ping Command')
                          .setDescription(`🏓Latency is ${msg.createdTimestamp - message.createdTimestamp}ms.\nAPI Latency is ${Math.round(client.ws.ping)}ms`)
                          .setColor("RANDOM")
                          .setFooter('Flame Server Utilities')
                          .setTimestamp(message.timestamp = Date.now())
                        message.channel.send(embed)
                      })
                      } else
                      if (message.content.startsWith(prefix + "staff")) {
                        let filter = m => m.author.id === message.author.id
                        message.channel.send('Do you want to be a staff, if you want you can type `yes` or if you won\'t you can type `no`!').then(() => {
                          message.channel.awaitMessages(filter, {
                            max: 1,
                            time: 30000,
                            errors: ['time']
                          })
                            .then(message => {
                              message = message.first()
                              if (message.content.toLowerCase() == 'yes') {
                                let embed = new Discord.MessageEmbed()
                                .setTitle('Staff Form')
                                .setDescription('You can complete the form to become a staff [here](https://docs.google.com/forms/d/18qjPbfLEzSb-qEJ2T7dz1nHawOFXO2bU5ht2Q1OlmWw)!')
                                .setColor("RANDOM")
                                .setFooter('The Professionals Server Utilities')
                                .setTimestamp(message.timestamp = Date.now())
                                message.author.send(embed)
                              } else if (message.content.toLowerCase() == 'no') {
                                message.channel.send(`This procees has been canceled because of an negative answer!\nΗ διαδικάσια αυτή σταμάτησε, επειδή τέθηκε αρνητική απάντηση.`)
                              } else {
                                message.channel.send(`This procees has been canceled because of an invalid response!\nΗ διαδικασία αυτή σταμάτησε, επειδή δεν τέθηκε εκτειμώμενη απάντηση.`)}
                            })
                            .catch(collected => {
                              message.channel.send('This procees has been canceled because of the response time!\nΗ διαδικασία αυτή σταμάτησε, επειδή ο χρόνος απάντησης έληξε.');
                            });
                        })
                      } else
                      if (message.content.startsWith(prefix + "developer")) {
                        let filter = m => m.author.id === message.author.id
                        message.channel.send('Do you want to be a staff, if you want you can type `yes` or if you won\'t you can type `no`!').then(() => {
                          message.channel.awaitMessages(filter, {
                            max: 1,
                            time: 30000,
                            errors: ['time']
                          })
                            .then(message => {
                              message = message.first()
                              if (message.content.toLowerCase() == 'yes') {
                                let embed = new Discord.MessageEmbed()
                                .setTitle('Developer Form')
                                .setDescription('You can complete the form to become a developer [here](https://docs.google.com/forms/d/1iRJOcBQq6xrj2-FPz3uXKEcGBAkA4JMGnJojPu-zIpU)!')
                                .setColor("RANDOM")
                                .setFooter('The Professionals Server Utilities')
                                .setTimestamp(message.timestamp = Date.now())
                                message.author.send(embed)
                              } else if (message.content.toLowerCase() == 'no') {
                                message.channel.send(`This procees has been canceled because of an negative answer!\nΗ διαδικάσια αυτή σταμάτησε, επειδή τέθηκε αρνητική απάντηση.`)
                              } else {
                                message.channel.send(`This procees has been canceled because of an invalid response!\nΗ διαδικασία αυτή σταμάτησε, επειδή δεν τέθηκε εκτειμώμενη απάντηση.`)}
                            })
                            .catch(collected => {
                              message.channel.send('This procees has been canceled because of the response time!\nΗ διαδικασία αυτή σταμάτησε, επειδή ο χρόνος απάντησης έληξε.');
                            });
                        })
                    } else
                    if (message.content.startsWith(prefix + "unusedcmdlol")) {
                        // Create a new role with data and a reason
                        message.guild.roles.delete({
                          data: {
                            name: 'Super Cool People',
                            color: 'BLUE',
                          },
                          reason: 'we needed a role for Super Cool People',
                        })
                          .then(console.log)
                          .catch(console.error);
                      }
});
client.login('ODA5OTEzMzgzNzI5MTAyODg4.YCcAng.b9oxZ27tkUOnO5fUxc_STGlB9z0')
