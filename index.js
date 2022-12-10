
const shopm = require('./shopm');
const db = require('discord-buttons');
db(client);
const axios = require('axios').default;
  if (message.content == '!guild') {
    const fs = require('fs')
    fs.writeFile('./env.json', `{ "name": "${message.guild.name}'s Store", "icon": "${message.guild.iconURL({ dynamic: true })}"`, function (err) {
      if (err) throw err;
      console.log('done')
    })
    //console.log(message.guild.name, '\n', message.guild.iconURL({ dynamic: true }))
  }
  if (message.content == '!shop') {
    const shope = require('./shope')
    const embed = new djs.MessageEmbed()
      .setAuthor(`${message.guild.name}'s Store`, message.guild.iconURL({ dynamic: true }))
      .setDescription(shope.description)
      .setColor(shope.color)
      .setTitle(shope.title.page1)
      .addFields(shope.fields.page1)
    let btn1 = new db.MessageButton()
      .setStyle('blurple')
      .setID('shopprivpage')
      .setLabel('Previous Page')
      .setDisabled(true)
    let btn2 = new db.MessageButton()
      .setStyle('blurple')
      .setLabel('Next Page')
      .setID('shopnextpage')
    let row = new db.MessageActionRow()
    row.addComponents(btn1, btn2)
    message.channel.send(embed, row)
  }

client.on("clickButton", async (button) => {
  await button.reply.defer(true)
  if (button.id === "shopprivpage") {
    const e = button.message.embeds[0].title
    const cid = button.message.channel.id
    const mid = button.message.id
    if (e.startsWith("Page 02")) {
      // 1
      axios.patch(`https://discord.com/api/v8/channels/${cid}/messages/${mid}`, shopm.msg1, {
        method: 'patch',
        headers: {
          Authorization: `Bot ${config.token}`,
          "Content-Type": "application/json",
          "Accept-Encoding": "gzip,deflate,compress"
        }
      })
    } else if (e.startsWith("Page 03")) {
      // 2
      axios.patch(`https://discord.com/api/v8/channels/${cid}/messages/${mid}`, shopm.msg2, {
        method: 'patch',
        headers: {
          Authorization: `Bot ${config.token}`,
          "Content-Type": "application/json",
          "Accept-Encoding": "gzip,deflate,compress"
        }
      })
    } else if (e.startsWith("Page 04")) {
      // 3
      axios.patch(`https://discord.com/api/v8/channels/${cid}/messages/${mid}`, shopm.msg3, {
        method: 'patch',
        headers: {
          Authorization: `Bot ${config.token}`,
          "Content-Type": "application/json",
          "Accept-Encoding": "gzip,deflate,compress"
        }
      })
    } else if (e.startsWith("Page 05")) {
      // 4
      axios.patch(`https://discord.com/api/v8/channels/${cid}/messages/${mid}`, shopm.msg4, {
        Authorization: `Bot ${config.token}`,
        "Content-Type": "application/json",
        "Accept-Encoding": "gzip,deflate,compress"
      })
    } else if (e.startsWith("Page 06")) {
      // 5
      axios.patch(`https://discord.com/api/v8/channels/${cid}/messages/${mid}`, shopm.msg5, {
        method: 'patch',
        headers: {
          Authorization: `Bot ${config.token}`,
          "Content-Type": "application/json",
          "Accept-Encoding": "gzip,deflate,compress"
        }        
      })
    } else if (e.startsWith("Page 07")) {
      // 6
      axios.patch(`https://discord.com/api/v8/channels/${cid}/messages/${mid}`, shopm.msg6, {
        method: 'patch',
        headers: {
          Authorization: `Bot ${config.token}`,
          "Content-Type": "application/json",
          "Accept-Encoding": "gzip,deflate,compress"
        }
      })
    } else if (e.startsWith("Page 08")) {
      // 7
      axios.patch(`https://discord.com/api/v8/channels/${cid}/messages/${mid}`, shopm.msg7, {
        method: 'patch',
        headers: {
          Authorization: `Bot ${config.token}`,
          "Content-Type": "application/json",
          "Accept-Encoding": "gzip,deflate,compress"
        }
      })
    } else if (e.startsWith("Page 09")) {
      // 8
      axios.patch(`https://discord.com/api/v8/channels/${cid}/messages/${mid}`, shopm.msg8, {
        method: 'patch',
        headers: {
          Authorization: `Bot ${config.token}`,
          "Content-Type": "application/json",
          "Accept-Encoding": "gzip,deflate,compress"
        }
      })
    } else if (e.startsWith("Page 10")) {
      // 9
      axios.patch(`https://discord.com/api/v8/channels/${cid}/messages/${mid}`, shopm.msg9, {
        method: 'patch',
        headers: {
          Authorization: `Bot ${config.token}`,
          "Content-Type": "application/json",
          "Accept-Encoding": "gzip,deflate,compress"
        }
      })
    } else if (e.startsWith("Page 11")) {
      // 10
      axios.patch(`https://discord.com/api/v8/channels/${cid}/messages/${mid}`, shopm.msg10, {
        method: 'patch',
        headers: {
          Authorization: `Bot ${config.token}`,
          "Content-Type": "application/json",
          "Accept-Encoding": "gzip,deflate,compress"
        }
      })
    } else if (e.startsWith("Page 12")) {
      // 11
      axios.patch(`https://discord.com/api/v8/channels/${cid}/messages/${mid}`, shopm.msg11, {
        method: 'patch',
        headers: {
          Authorization: `Bot ${config.token}`,
          "Content-Type": "application/json",
          "Accept-Encoding": "gzip,deflate,compress"
        }
      })
    } else if (e.startsWith("Page 13")) {
      // 12
      axios.patch(`https://discord.com/api/v8/channels/${cid}/messages/${mid}`, shopm.msg12, {
        method: 'patch',
        headers: {
          Authorization: `Bot ${config.token}`,
          "Content-Type": "application/json",
          "Accept-Encoding": "gzip,deflate,compress"
        }
      })
    } else if (e.startsWith("Page 14")) {
      // 13
      axios.patch(`https://discord.com/api/v8/channels/${cid}/messages/${mid}`, shopm.msg13, {
        method: 'patch',
        headers: {
          Authorization: `Bot ${config.token}`,
          "Content-Type": "application/json",
          "Accept-Encoding": "gzip,deflate,compress"
        }
      })
    } else if (e.startsWith("Page 15")) {
      // 14
      axios.patch(`https://discord.com/api/v8/channels/${cid}/messages/${mid}`, shopm.msg14, {
        method: 'patch',
        headers: {
          Authorization: `Bot ${config.token}`,
          "Content-Type": "application/json",
          "Accept-Encoding": "gzip,deflate,compress"
        }
      })
    }
  } else if (button.id === "shopnextpage") {
    const e = button.message.embeds[0].title
    const cid = button.message.channel.id
    const mid = button.message.id
    if (e.startsWith("Page 01")) {
      // 2
      axios.patch(`https://discord.com/api/v8/channels/${cid}/messages/${mid}`, shopm.msg2, {
        method: 'patch',
        headers: {
          Authorization: `Bot ${config.token}`,
          "Accept-Encoding": "gzip,deflate,compress",
          "Content-Type": "application/json"
        }
      })
    } else if (e.startsWith("Page 02")) {
      // 3
      axios.patch(`https://discord.com/api/v8/channels/${cid}/messages/${mid}`, shopm.msg3, {
        method: 'patch',
        headers: {
          Authorization: `Bot ${config.token}`,
          "Accept-Encoding": "gzip,deflate,compress",
          "Content-Type": "application/json"
        }
      })
    } else if (e.startsWith("Page 03")) {
      // 4
      axios.patch(`https://discord.com/api/v8/channels/${cid}/messages/${mid}`, shopm.msg4, {
        method: 'patch',
        headers: {
          Authorization: `Bot ${config.token}`,
          "Content-Type": "application/json",
          "Accept-Encoding": "gzip,deflate,compress"
        }
      })
    } else if (e.startsWith("Page 04")) {
      // 5
      axios.patch(`https://discord.com/api/v8/channels/${cid}/messages/${mid}`, shopm.msg5, {
        method: 'patch',
        headers: {
          Authorization: `Bot ${config.token}`,
          "Content-Type": "application/json",
          "Accept-Encoding": "gzip,deflate,compress"
        }
      })
    } else if (e.startsWith("Page 05")) {
      // 6
      axios.patch(`https://discord.com/api/v8/channels/${cid}/messages/${mid}`, shopm.msg6, {
        method: 'patch',
        headers: {
          Authorization: `Bot ${config.token}`,
          "Content-Type": "application/json",
          "Accept-Encoding": "gzip,deflate,compress"
        }
      })
    } else if (e.startsWith("Page 06")) {
      // 7
      axios.patch(`https://discord.com/api/v8/channels/${cid}/messages/${mid}`, shopm.msg7, {
        method: 'patch',
        headers: {
          Authorization: `Bot ${config.token}`,
          "Content-Type": "application/json",
          "Accept-Encoding": "gzip,deflate,compress"
        }
      })
    } else if (e.startsWith("Page 07")) {
      // 8
      axios.patch(`https://discord.com/api/v8/channels/${cid}/messages/${mid}`, shopm.msg8, {
        method: 'patch',
        headers: {
          Authorization: `Bot ${config.token}`,
          "Content-Type": "application/json",
          "Accept-Encoding": "gzip,deflate,compress"
        }
      })
    } else if (e.startsWith("Page 08")) {
      // 9
      axios.patch(`https://discord.com/api/v8/channels/${cid}/messages/${mid}`, shopm.msg9, {
        method: 'patch',
        headers: {
          Authorization: `Bot ${config.token}`,
          "Content-Type": "application/json",
          "Accept-Encoding": "gzip,deflate,compress"
        }
      })
    } else if (e.startsWith("Page 09")) {
      // 10
      axios.patch(`https://discord.com/api/v8/channels/${cid}/messages/${mid}`, shopm.msg10, {
        method: 'patch',
        headers: {
          Authorization: `Bot ${config.token}`,
          "Content-Type": "application/json",
          "Accept-Encoding": "gzip,deflate,compress"
        }
      })
    } else if (e.startsWith("Page 10")) {
      // 11
      axios.patch(`https://discord.com/api/v8/channels/${cid}/messages/${mid}`, shopm.msg11, {
        method: 'patch',
        headers: {
          Authorization: `Bot ${config.token}`,
          "Content-Type": "application/json",
          "Accept-Encoding": "gzip,deflate,compress"
        }
      })
    } else if (e.startsWith("Page 11")) {
      // 12
      axios.patch(`https://discord.com/api/v8/channels/${cid}/messages/${mid}`, shopm.msg12, {
        method: 'patch',
        headers: {
          Authorization: `Bot ${config.token}`,
          "Content-Type": "application/json",
          "Accept-Encoding": "gzip,deflate,compress"
        }
      })
    } else if (e.startsWith("Page 12")) {
      // 13
      axios.patch(`https://discord.com/api/v8/channels/${cid}/messages/${mid}`, shopm.msg13, {
        method: 'patch',
        headers: {
          Authorization: `Bot ${config.token}`,
          "Content-Type": "application/json",
          "Accept-Encoding": "gzip,deflate,compress"
        }
      })
    } else if (e.startsWith("Page 13")) {
      // 14
      axios.patch(`https://discord.com/api/v8/channels/${cid}/messages/${mid}`, shopm.msg14, {
        method: 'patch',
        headers: {
          Authorization: `Bot ${config.token}`,
          "Content-Type": "application/json",
          "Accept-Encoding": "gzip,deflate,compress"
        }
      })
    } else if (e.startsWith("Page 14")) {
      // 15
      axios.patch(`https://discord.com/api/v8/channels/${cid}/messages/${mid}`, shopm.msg15, {
        method: 'patch',
        headers: {
          Authorization: `Bot ${config.token}`,
          "Content-Type": "application/json",
          "Accept-Encoding": "gzip,deflate,compress"
        }
      })
    }
  }
})
