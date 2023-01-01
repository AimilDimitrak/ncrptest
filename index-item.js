const mongo = require('./mongo');
const djs = require('discord.js')
const client = new djs.Client()
const balSchema = require('./schemas/bal-schema')
const invSchema = require('./schemas/inv-schema')
const db = require('discord-buttons')
db(client)
const items = require('./items.json')
const eurid = "<:eur:1044280864227459133>"
client.on('ready', () => {
  client.user.setStatus('online')
  console.log('Successfully connected to Discord!')
})
function isInt(no = new Number()) {
  if (no == 0) {
    return true;
  } else if (no == 1) {
    return true;
  } else if (no == 2) {
    return true;
  } else if (no == 3) {
    return true;
  } else if (no == 4) {
    return true;
  } else if (no == 5) {
    return true;
  } else if (no == 6) {
    return true;
  } else if (no == 7) {
    return true;
  } else if (no == 8) {
    return true;
  } else if (no == 9) {
    return true;
  } else if (no == `"`) {
    return false;
  } else if (no == `}`) {
    return false;
  } else {
    return false;
  }
}
const prefix = "dev-"
client.on('message', (message) => {
  let args = message.content.split(' ')
  if (message.author.id == client.user.id || message.author.bot == true) return;

  if (message.content.startsWith(prefix + "balc")) {
    const user = message.mentions.users.first()
    const mongodb = async () => {
      await mongo().then(async (mongoose) => {
        try {
          console.log('Connected to MongoDB!')
          const bal = {
            did: user.id,
            amount: 15000,
            bamount: 0,
            bmoney: 0,
            collect: {
              day: null,
              month: new Date().getMonth()
            }
          }
          await new balSchema(bal).save()
        } finally {
          mongoose.connection.close()
        }
      })
    }
    mongodb()
  }
  if (message.content.startsWith(prefix + "invc")) {
    const user = message.mentions.users.first()
    const mongodb = async () => {
      await mongo().then(async (mongoose) => {
        try {
          console.log('Connected to MongoDB!')
          const inv = {
            did: user.id,
            items: {}
          }
          await new invSchema(inv).save()
        } finally {
          mongoose.connection.close()
        }
      })
    }
    mongodb()
  }

  if (message.content.startsWith(prefix + "inv")) {
    const mongodb = async () => {
      await mongo().then(async (mongoose) => {
        try {
          console.log('Connected to MongoDB!')
          const result = await invSchema.findOne(
            {
              did: message.author.id
            }
          )
          const inv = result.items
          const values = Object.values(inv)
          const sinv = JSON.stringify(inv)
          let length = values.length
          if (length < 10) {
            length = `0${length}`
          }
          const embed = new djs.MessageEmbed()
            .setAuthor(`${message.author.tag}'s Inventory`, message.author.displayAvatarURL({ dynamic: true }))
          if (sinv == "{}") {
            embed.setDescription("You don't have any items in your inventory!")
            message.channel.send(embed)
          } else if (sinv !== "{}") {
            embed.setTitle(`Page 01 out of ${length}`)
            inv.page1.forEach(async (item) => {
              embed.addField(`${item.quantity} - ${item.item}`, "\u200b", false)
            })
            const b1 = new db.MessageButton()
              .setDisabled(true)
              .setID('invpriv')
              .setStyle('blurple')
              .setLabel('Previous Page')
            const b2 = new db.MessageButton()
              .setID('invnext')
              .setStyle('blurple')
              .setLabel('Next Page')
            if (values.length == 1) {
              b2.setDisabled(true)
            }
            const row = new db.MessageActionRow().addComponents(b1, b2)
            message.channel.send(embed, row)
          }
        } finally {
          mongoose.connection.close()
        }
      })
    }
    mongodb()
  } else if (message.content.startsWith(prefix + "use-item")) {
    let msgq = new Number(args[1]).valueOf()
    let item = `"${message.content.slice(14 + msgq.toString().length)}"`
    if (msgq.toString() == "NaN") {
      item = `"${message.content.slice(13)}"`
      msgq = 1
    }
    const arrtoobj = JSON.stringify(items)
    const search = arrtoobj.search(item)
    if (search == -1) {
      message.channel.send('Invalid item. Check the shop for help.')
    } else if (search !== -1) {
      const mongodb = async () => {
        await mongo().then(async (mongoose) => {
          try {
            console.log('Connected to MongoDB!')
            const result = await invSchema.findOne(
              {
                did: message.author.id
              }
            )
            const inv = result.items
            const obj = Object.values(inv)
            const sinv = JSON.stringify(inv)
            const search = sinv.search(item)
            const dqli = item.lastIndexOf(`"`) - 1
            if (search == -1) {
              message.channel.send(`The item **${item.substring(1, dqli)}** was not found on your inventory.`)
            } else if (search !== -1) {
              const iindex = sinv.indexOf(item)
              let quantity;
              const qno1 = sinv.indexOf("quantity", iindex) + 10
              const qno2 = qno1 + 1
              if (isInt(sinv[qno2]) == true) {
                quantity = sinv[qno1] + sinv[qno2]
              } else if (isInt(sinv[qno2]) == false) {
                quantity = sinv[qno1]
              }
              if (msgq < quantity || msgq == quantity) {
                const newq = quantity - msgq
                if (msgq < quantity && newq > 0) {
                  const index1 = iindex - 9
                  const index2 = sinv.indexOf("}", index1) + 2
                  let iobj = sinv.substring(index1, index2)
                  if (iobj.endsWith("]")) {
                    iobj = sinv.substring(index1, index2 - 1)
                  }
                  const niobj = iobj.replace(`"quantity":${quantity}`, `"quantity":${newq}`)
                  const nstr = sinv.replace(iobj, niobj)
                  const todb = JSON.parse(nstr)
                  await invSchema.findOneAndUpdate(
                    {
                      did: message.author.id
                    },
                    {
                      did: message.author.id,
                      items: todb
                    },
                    {
                      upsert: true,
                      new: true
                    }
                  )
                } else if (quantity == 1 || newq == 0) {
                  const index1 = iindex - 8
                  const index2 = sinv.indexOf("}", index1) + 2
                  let iobj = sinv.substring(index1, index2 - 1)
                  const cbssearch = sinv.lastIndexOf("{")
                  const cbesearch = sinv.lastIndexOf("}") - 1
                  const substr = sinv.substring(cbssearch, cbesearch)
                  const lpindex = obj[obj.length - 1].length
                  let iobjdel;
                  const total = lpindex - 1
                  if (total == 0) {
                    if (obj.length == 1) {
                      iobjdel = sinv.replace(`"page1":[${substr}]`, "")
                    } else if (obj.length > 1) {
                      iobjdel = sinv.replace(`,"page${obj.length}":[${substr}]`, "")
                    }
                  } else if (total !== 0) {
                    iobjdel = sinv.replace(`,${substr}`, "")
                  }
                  const sub = iobjdel.replace(iobj, substr)
                  const todb = JSON.parse(sub)
                  await invSchema.findOneAndUpdate(
                    {
                      did: message.author.id
                    },
                    {
                      did: message.author.id,
                      items: todb
                    },
                    {
                      upsert: true,
                      new: true
                    }
                  )
                }
              } else if (msgq > quantity) {
                message.channel.send(`You only have **${quantity} ${item.substring(1, dqli)}** in your inventory.`)
              }
            }
          } finally {
            mongoose.connection.close()
          }
        })
      }
      mongodb()
    }
  } else if (message.content.startsWith(prefix + "give-item")) {
    const member = message.mentions.users.first()
    let msgq = new Number(args[2]).valueOf()
    let item = `"${message.content.slice(16 + args[1].length + msgq.toString().length)}"`
    if (msgq.toString() == "NaN") {
      item = `"${message.content.slice(15 + args[1].length)}"`
      msgq = 1
    }
    if (!member || !item) {
      message.channel.send("Please use the command in this way: `!give-item <member> [quantity] <item>`")
    } else if (member && item) {
      const arrtoobj = JSON.stringify(items)
      const search = arrtoobj.search(item)
      if (search == -1) {
        message.channel.send('Invalid item. Check the shop for help.')
      } else if (search !== -1) {
        const mongodb = async () => {
          await mongo().then(async (mongoose) => {
            try {
              console.log('Connected to MongoDB!')
              const result = await invSchema.findOne(
                {
                  did: member.id
                }
              )
              const inv = result.items
              const obj = Object.values(inv)
              const sinv = JSON.stringify(inv)
              const search = sinv.search(item)
              if (search == -1) {
                const lpindex = obj[obj.length - 1].length
                const dqli = item.lastIndexOf(`"`)
                if (lpindex < 5) {
                  const cbesearch = sinv.lastIndexOf("}") - 1
                  const sub = sinv.substring(0, cbesearch)
                  const iobj = {
                    "item": item.substring(1, dqli),
                    "quantity": msgq
                  }
                  const iobjstr = JSON.stringify(iobj)
                  const final = new String(sub + `,${iobjstr}]}`).valueOf()
                  const todb = JSON.parse(final)
                  await invSchema.findOneAndUpdate(
                    {
                      did: member.id
                    },
                    {
                      did: member.id,
                      items: todb
                    },
                    {
                      upsert: true,
                      new: true
                    }
                  )
                } else if (lpindex == 5) {
                  const cbesearch = sinv.lastIndexOf("}")
                  const sub = sinv.substring(0, cbesearch)
                  const iobj = {
                    "item": item.substring(1, dqli),
                    "quantity": msgq
                  }
                  const iobjstr = JSON.stringify(iobj)
                  let final;
                  if (obj.length < 1) {
                    final = new String(`{"page${obj.length + 1}":[${iobjstr}]}`).valueOf()
                  } else if (obj.length > 1) {
                    final = new String(sub + `,"page${obj.length + 1}":[${iobjstr}]}`).valueOf()
                  }
                  const todb = JSON.parse(final)
                  await invSchema.findOneAndUpdate(
                    {
                      did: member.id
                    },
                    {
                      did: member.id,
                      items: todb
                    },
                    {
                      upsert: true,
                      new: true
                    }
                  )
                }
              }
              else if (search !== -1) {
                const iindex = sinv.indexOf(item)
                const index1 = iindex - 9
                const index2 = sinv.indexOf("}", index1) + 2
                let iobj = sinv.substring(index1, index2)
                if (iobj.endsWith("]")) {
                  iobj = sinv.substring(index1, index2 - 1)
                }
                let quantity;
                const qno1 = sinv.indexOf("quantity", iindex) + 10
                const qno2 = qno1 + 1
                if (isInt(sinv[qno2]) == true) {
                  quantity = sinv[qno1] + sinv[qno2]
                } else if (isInt(sinv[qno2]) == false) {
                  quantity = sinv[qno1]
                }
                const qno = new Number(quantity).valueOf()
                const msgqno = new Number(msgq).valueOf()
                const newq = qno + msgqno
                const niobj = iobj.replace(`"quantity":${quantity}`, `"quantity":${newq}`)
                const nstr = sinv.replace(iobj, niobj)
                const todb = JSON.parse(nstr)
                await invSchema.findOneAndUpdate(
                  {
                    did: member.id
                  },
                  {
                    did: member.id,
                    items: todb
                  },
                  {
                    upsert: true,
                    new: true
                  }
                )
              }
            } finally {
              mongoose.connection.close()
            }
          })
        }
        mongodb()
      }
    }
  } else if (message.content.startsWith(prefix + "take-item")) {
    const member = message.mentions.users.first()
    let msgq = new Number(args[2]).valueOf()
    let item = `"${message.content.slice(16 + args[1].length + msgq.toString().length)}"`
    if (msgq.toString() == "NaN") {
      item = `"${message.content.slice(15 + args[1].length)}"`
      msgq = 1
    }
    if (!member || !item) {
      message.channel.send("Please use the command in this way: `!take-item <member> [quantity] <item>`")
    } else if (member && item) {
      const arrtoobj = JSON.stringify(items)
      const search = arrtoobj.search(item)
      if (search == -1) {
        message.channel.send('Invalid item. Check the shop for help.')
      } else if (search !== -1) {
        const mongodb = async () => {
          await mongo().then(async (mongoose) => {
            try {
              console.log('Connected to MongoDB!')
              const result = await invSchema.findOne(
                {
                  did: member.id
                }
              )
              const inv = result.items
              const obj = Object.values(inv)
              const sinv = JSON.stringify(inv)
              const search = sinv.search(item)
              const dqli = item.lastIndexOf(`"`) - 1
              if (search == -1) {
                message.channel.send(`The item **${item.substring(1, dqli)}** was not found on the member's inventory.`)
              } else if (search !== -1) {
                const iindex = sinv.indexOf(item)
                let quantity;
                const qno1 = sinv.indexOf("quantity", iindex) + 10
                const qno2 = qno1 + 1
                if (isInt(sinv[qno2]) == true) {
                  quantity = sinv[qno1] + sinv[qno2]
                } else if (isInt(sinv[qno2]) == false) {
                  quantity = sinv[qno1]
                }
                if (msgq < quantity || msgq == quantity) {
                  const newq = quantity - msgq
                  if (msgq < quantity && newq > 0) {
                    const index1 = iindex - 9
                    const index2 = sinv.indexOf("}", index1) + 2
                    let iobj = sinv.substring(index1, index2)
                    if (iobj.endsWith("]")) {
                      iobj = sinv.substring(index1, index2 - 1)
                    }
                    const niobj = iobj.replace(`"quantity":${quantity}`, `"quantity":${newq}`)
                    const nstr = sinv.replace(iobj, niobj)
                    const todb = JSON.parse(nstr)
                    await invSchema.findOneAndUpdate(
                      {
                        did: member.id
                      },
                      {
                        did: member.id,
                        items: todb
                      },
                      {
                        upsert: true,
                        new: true
                      }
                    )
                  } else if (quantity == 1 || newq == 0) {
                    const index1 = iindex - 8
                    const index2 = sinv.indexOf("}", index1) + 2
                    let iobj = sinv.substring(index1, index2 - 1)
                    const cbssearch = sinv.lastIndexOf("{")
                    const cbesearch = sinv.lastIndexOf("}") - 1
                    const substr = sinv.substring(cbssearch, cbesearch)
                    const lpindex = obj[obj.length - 1].length
                    let iobjdel;
                    const total = lpindex - 1
                    if (total == 0) {
                      // iobjdel = sinv.replace(`${substr}`, "")
                      if (obj.length == 1) {
                        iobjdel = sinv.replace(`"page1":[${substr}]`, "")
                      } else if (obj.length > 1) {
                        iobjdel = sinv.replace(`,"page${obj.length}":[${substr}]`, "")
                      }
                    } else if (total !== 0) {
                      iobjdel = sinv.replace(`,${substr}`, "")
                    }
                    const sub = iobjdel.replace(iobj, substr)
                    const todb = JSON.parse(sub)
                    await invSchema.findOneAndUpdate(
                      {
                        did: message.author.id
                      },
                      {
                        did: message.author.id,
                        items: todb
                      },
                      {
                        upsert: true,
                        new: true
                      }
                    )
                  }
                } else if (msgq > quantity) {
                  message.channel.send(`The member only has **${quantity} ${item.substring(1, dqli)}** in his inventory.`)
                }
              }
            } finally {
              mongoose.connection.close()
            }
          })
        }
        mongodb()
      }
    }
  } else if (message.content.startsWith(prefix + "buy-item")) {
    let msgq = new Number(args[1]).valueOf()
    let item = `"${message.content.slice(14 + msgq.toString().length)}"`
    if (msgq.toString() == "NaN") {
      item = `"${message.content.slice(13)}"`
      msgq = 1
    }
    const arrtoobj = JSON.stringify(items)
    const search = arrtoobj.search(item)
    if (search == -1) {
      message.channel.send('Invalid item. Check the shop for help.')
    } else if (search !== -1) {
      const mongodb = async () => {
        await mongo().then(async (mongoose) => {
          try {
            console.log('Connected to MongoDB!')
            const inventory = await invSchema.findOne(
              {
                did: message.author.id
              }
            )
            const inv = inventory.items
            const obj = Object.values(inv)
            const sinv = JSON.stringify(inv)
            const balance = await balSchema.findOne(
              {
                did: message.author.id
              }
            )
            // Start Price
            const index = arrtoobj.indexOf(item)
            const dqli = item.lastIndexOf(`"`)
            const fitem = item.substring(1, dqli)
            const euro = index + fitem.length + 3
            let comma = arrtoobj.indexOf(",", euro)
            if (comma == -1) {
              comma = arrtoobj.indexOf("}")
            }
            let price;
            if (msgq == 1) {
              price = new Number(arrtoobj.substring(euro, comma)).valueOf()
            } else if (msgq !== 1) {
              price = new Number(arrtoobj.substring(euro, comma)).valueOf() * msgq
            }
            // End Price
            if (price <= balance.amount) {
              const amount = balance.amount - price
              await balSchema.findOneAndUpdate(
                {
                  did: message.author.id
                },
                {
                  did: message.author.id,
                  amount: amount,
                  bamount: balance.bamount,
                  bmoney: balance.bmoney,
                  collect: {
                    day: balance.collect.day,
                    month: balance.collect.month
                  }
                },
                {
                  upsert: true,
                  new: true
                }
              )
              const search = sinv.search(item)
              if (search == -1) {
                const lpindex = obj[obj.length - 1].length
                if (lpindex < 5) {
                  const cbesearch = sinv.lastIndexOf("}") - 1
                  const sub = sinv.substring(0, cbesearch)
                  const iobj = {
                    "item": fitem,
                    "quantity": msgq
                  }
                  const iobjstr = JSON.stringify(iobj)
                  const final = new String(sub + `,${iobjstr}]}`).valueOf()
                  const todb = JSON.parse(final)
                  await invSchema.findOneAndUpdate(
                    {
                      did: message.author.id
                    },
                    {
                      did: message.author.id,
                      items: todb
                    },
                    {
                      upsert: true,
                      new: true
                    }
                  )
                } else if (lpindex == 5) {
                  const cbesearch = sinv.lastIndexOf("}")
                  const sub = sinv.substring(0, cbesearch)
                  const iobj = {
                    "item": fitem,
                    "quantity": msgq
                  }
                  const iobjstr = JSON.stringify(iobj)
                  let final;
                  if (obj.length < 1) {
                    final = new String(`{"page${obj.length + 1}":[${iobjstr}]}`).valueOf()
                  } else if (obj.length > 1) {
                    final = new String(sub + `,"page${obj.length + 1}":[${iobjstr}]}`).valueOf()
                  }
                  const todb = JSON.parse(final)
                  await invSchema.findOneAndUpdate(
                    {
                      did: message.author.id
                    },
                    {
                      did: message.author.id,
                      items: todb
                    },
                    {
                      upsert: true,
                      new: true
                    }
                  )
                }
              }
              else if (search !== -1) {
                const iindex = sinv.indexOf(item)
                const index1 = iindex - 9
                const index2 = sinv.indexOf("}", index1) + 2
                let iobj = sinv.substring(index1, index2)
                if (iobj.endsWith("]")) {
                  iobj = sinv.substring(index1, index2 - 1)
                }
                let quantity;
                const qno1 = sinv.indexOf("quantity", iindex) + 10
                const qno2 = qno1 + 1
                if (isInt(sinv[qno2]) == true) {
                  quantity = sinv[qno1] + sinv[qno2]
                } else if (isInt(sinv[qno2]) == false) {
                  quantity = sinv[qno1]
                }
                const qno = new Number(quantity).valueOf()
                const msgqno = new Number(msgq).valueOf()
                const newq = qno + msgqno
                const niobj = iobj.replace(`"quantity":${quantity}`, `"quantity":${newq}`)
                const nstr = sinv.replace(iobj, niobj)
                const todb = JSON.parse(nstr)
                await invSchema.findOneAndUpdate(
                  {
                    did: message.author.id
                  },
                  {
                    did: message.author.id,
                    items: todb
                  },
                  {
                    upsert: true,
                    new: true
                  }
                )
              }
            } else if (price > balance.amount) {
              message.channel.send(`You don't have that much money! You only have ${eurid + balance.amount.toLocaleString()} on hand.`)
            }
          } finally {
            mongoose.connection.close()
          }
        })
      }
      mongodb()
    }
  } else if (message.content.startsWith(prefix + "sell-item")) {
    const member = message.mentions.users.first()
    let msgq = new Number(args[2]).valueOf()
    let item = `"${message.content.slice(16 + args[1].length + msgq.toString().length)}"`
    if (msgq.toString() == "NaN") {
      item = `"${message.content.slice(15 + args[1].length)}"`
      msgq = 1
    }
    if (!member || !item) {
      message.channel.send("Please use the command in this way: `!sell-item <member> [quantity] <item>`")
    } else if (member && item) {
      const arrtoobj = JSON.stringify(items)
      const search = arrtoobj.search(item)
      if (search == -1) {
        message.channel.send('Invalid item. Check the shop for help.')
      } else if (search !== -1) {
        const mongodb = async () => {
          await mongo().then(async (mongoose) => {
            try {
              console.log('Connected to MongoDB!')
              const authorinv = await invSchema.findOne(
                {
                  did: message.author.id
                }
              )
              const ainv = authorinv.items
              const obj = Object.values(ainv)
              const sinv = JSON.stringify(ainv)
              const search = sinv.search(item)
              const dqli = item.lastIndexOf(`"`)
              if (search == -1) {
                message.channel.send(`The item **${item.substring(1, dqli)}** was not found on your inventory.`)
              } else if (search !== -1) {
                const iindex = sinv.indexOf(item)
                let quantity;
                const qno1 = sinv.indexOf("quantity", iindex) + 10
                const qno2 = qno1 + 1
                if (isInt(sinv[qno2]) == true) {
                  quantity = sinv[qno1] + sinv[qno2]
                } else if (isInt(sinv[qno2]) == false) {
                  quantity = sinv[qno1]
                }
                if (msgq < quantity || msgq == quantity) {
                  const e1 = new djs.MessageEmbed()
                    .setColor('#8C29DE')
                    .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                    .setDescription(`What price do you want to sell <@${member.id}> ${msgq} ${item.substring(1, dqli)}?`)
                  message.channel.send(e1)
                  const collect1 = message.channel.createMessageCollector(m => message.author.id == m.author.id, { max: 1, time: 120000, idle: 120000 })
                  collect1.on('end', (collection, reason) => {
                    if (reason == "time") {
                      message.channel.send('<:xmark:1049773584429617294> Command cancelled. Time expired.')
                    }
                  })
                  let euro;
                  collect1.on('collect', m => {
                    let no = new Number(m.content).valueOf()
                    if (no.toString() == "NaN") {
                      message.channel.send('<:xmark:1049773584429617294> Command cancelled. Invalid argument type.')
                    }
                    else if (no.toString() !== "NaN") {
                      euro = no
                      const e2 = new djs.MessageEmbed()
                        .setColor('#8C29DE')
                        .setDescription(`<@${message.author.id}> wants to sell you ${quantity} ${item.substring(1, dqli)} for ${eurid + no}\nDo you accept this? (yes/no)`)
                        .setFooter('You have 5 minutes to answer.')
                      message.channel.send(`<@${member.id}>`, e2)
                      const collect2 = message.channel.createMessageCollector(m => member.id == m.author.id, { max: 1, time: 300000, idle: 300000 })
                      collect2.on('end', (collection, reason) => {
                        if (reason == "time") {
                          message.channel.send('<:xmark:1049773584429617294> Command cancelled. Time expired.')
                        }
                      })
                      collect2.on('collect', async (m) => {
                        if (m.content == "yes") {
                          // remove item from sender
                          const newq = quantity - msgq
                          if (msgq < quantity && newq > 0) {
                            const index1 = iindex - 9
                            const index2 = sinv.indexOf("}", index1) + 2
                            let iobj = sinv.substring(index1, index2)
                            if (iobj.endsWith("]")) {
                              iobj = sinv.substring(index1, index2 - 1)
                            }
                            const niobj = iobj.replace(`"quantity":${quantity}`, `"quantity":${newq}`)
                            const nstr = sinv.replace(iobj, niobj)
                            const todb = JSON.parse(nstr)
                            await invSchema.findOneAndUpdate(
                              {
                                did: message.author.id
                              },
                              {
                                did: message.author.id,
                                items: todb
                              },
                              {
                                upsert: true,
                                new: true
                              }
                            )
                          } else if (quantity == 1 || newq == 0) {
                            const index1 = iindex - 8
                            const index2 = sinv.indexOf("}", index1) + 2
                            let iobj = sinv.substring(index1, index2 - 1)
                            const cbssearch = sinv.lastIndexOf("{")
                            const cbesearch = sinv.lastIndexOf("}") - 1
                            const substr = sinv.substring(cbssearch, cbesearch)
                            const lpindex = obj[obj.length - 1].length
                            let iobjdel;
                            const total = lpindex - 1
                            if (total == 0) {
                              if (obj.length == 1) {
                                iobjdel = sinv.replace(`"page1":[${substr}]`, "")
                              } else if (obj.length > 1) {
                                iobjdel = sinv.replace(`,"page${obj.length}":[${substr}]`, "")
                              }
                            } else if (total !== 0) {
                              iobjdel = sinv.replace(`,${substr}`, "")
                            }
                            const sub = iobjdel.replace(iobj, substr)
                            const todb = JSON.parse(sub)
                            await invSchema.findOneAndUpdate(
                              {
                                did: message.author.id
                              },
                              {
                                did: message.author.id,
                                items: todb
                              },
                              {
                                upsert: true,
                                new: true
                              }
                            )
                          }
                          // add money to sender
                          const sbal = await balSchema.findOne(
                            {
                              did: message.author.id
                            }
                          )
                          const snamount = sbal.amount + euro
                          await balSchema.findOneAndUpdate(
                            {
                              did: message.author.id
                            },
                            {
                              did: message.author.id,
                              amount: snamount,
                              bamount: sbal.bamount,
                              bmoney: sbal.bmoney,
                              collect: {
                                day: sbal.collect.day,
                                month: sbal.collect.month
                              }
                            },
                            {
                              upsert: true,
                              new: true
                            }
                          )
                          // add item to receiver
                          const search = sinv.search(item)
                          if (search == -1) {
                            const lpindex = obj[obj.length - 1].length
                            if (lpindex < 5) {
                              const cbesearch = sinv.lastIndexOf("}") - 1
                              const sub = sinv.substring(0, cbesearch)
                              const iobj = {
                                "item": item.substring(1, dqli),
                                "quantity": msgq
                              }
                              const iobjstr = JSON.stringify(iobj)
                              const final = new String(sub + `,${iobjstr}]}`).valueOf()
                              const todb = JSON.parse(final)
                              await invSchema.findOneAndUpdate(
                                {
                                  did: member.id
                                },
                                {
                                  did: member.id,
                                  items: todb
                                },
                                {
                                  upsert: true,
                                  new: true
                                }
                              )
                            } else if (lpindex == 5) {
                              const cbesearch = sinv.lastIndexOf("}")
                              const sub = sinv.substring(0, cbesearch)
                              const iobj = {
                                "item": item.substring(1, dqli),
                                "quantity": msgq
                              }
                              const iobjstr = JSON.stringify(iobj)
                              let final;
                              if (obj.length < 1) {
                                final = new String(`{"page${obj.length + 1}":[${iobjstr}]}`).valueOf()
                              } else if (obj.length > 1) {
                                final = new String(sub + `,"page${obj.length + 1}":[${iobjstr}]}`).valueOf()
                              }
                              const todb = JSON.parse(final)
                              await invSchema.findOneAndUpdate(
                                {
                                  did: member.id
                                },
                                {
                                  did: member.id,
                                  items: todb
                                },
                                {
                                  upsert: true,
                                  new: true
                                }
                              )
                            }
                          }
                          else if (search !== -1) {
                            const iindex = sinv.indexOf(item)
                            const index1 = iindex - 9
                            const index2 = sinv.indexOf("}", index1) + 2
                            let iobj = sinv.substring(index1, index2)
                            if (iobj.endsWith("]")) {
                              iobj = sinv.substring(index1, index2 - 1)
                            }
                            let quantity;
                            const qno1 = sinv.indexOf("quantity", iindex) + 10
                            const qno2 = qno1 + 1
                            if (isInt(sinv[qno2]) == true) {
                              quantity = sinv[qno1] + sinv[qno2]
                            } else if (isInt(sinv[qno2]) == false) {
                              quantity = sinv[qno1]
                            }
                            const qno = new Number(quantity).valueOf()
                            const msgqno = new Number(msgq).valueOf()
                            const newq = qno + msgqno
                            const niobj = iobj.replace(`"quantity":${quantity}`, `"quantity":${newq}`)
                            const nstr = sinv.replace(iobj, niobj)
                            const todb = JSON.parse(nstr)
                            await invSchema.findOneAndUpdate(
                              {
                                did: member.id
                              },
                              {
                                did: member.id,
                                items: todb
                              },
                              {
                                upsert: true,
                                new: true
                              }
                            )
                          }
                          // remove money from receiver
                          const rbal = await balSchema.findOne(
                            {
                              did: member.id
                            }
                          )
                          const rnamount = rbal.amount - euro
                          await balSchema.findOneAndUpdate(
                            {
                              did: member.id
                            },
                            {
                              did: member.id,
                              amount: rnamount,
                              bamount: sbal.bamount,
                              bmoney: sbal.bmoney,
                              collect: {
                                day: sbal.collect.day,
                                month: sbal.collect.month
                              }
                            },
                            {
                              upsert: true,
                              new: true
                            }
                          )
                        } else if (m.content == "no") {
                          message.channel.send('<:xmark:1049773584429617294> Command cancelled. Receiver denied offer.')
                        } else {
                          message.channel.send('<:xmark:1049773584429617294> Command cancelled. Invalid argument type.')
                        }
                      })
                    }
                  })
                } else if (msgq > quantity) {
                  message.channel.send(`You only have **${quantity} ${item.substring(1, dqli)}** in your inventory.`)
                }
              }
            } finally {
              mongoose.connection.close()
            }
          })
        }
        mongodb()
      }
    }
  }
})
client.on('clickButton', async (button) => {
  if (button.id === 'invpriv') {
    const mongodb = async () => {
      await mongo().then(async (mongoose) => {
        try {
          console.log('Connected to MongoDB!')
          const result = await invSchema.findOne(
            {
              did: button.clicker.user.id
            }
          )
          const inv = result.items
          const obj = Object.values(inv)
          let length = obj.length
          if (length < 10) {
            length = `0${length}`
          }
          const title = button.message.embeds[0].title
          const arg = title.split(' ')
          let int = arg[1]
          const embed = new djs.MessageEmbed()
            .setAuthor(`${button.clicker.user.tag}'s Inventory`, button.clicker.user.displayAvatarURL({ dynamic: true }))
          if (int < 10) {
            int = arg[1].slice(1)
          }
          let no = new Number(int)
          no = no.valueOf()
          const page = no - 2
          const pg = page + 1
          if (obj.length > page || obj.length == page) {
            if (page <= 10) {
              embed.setTitle(`Page 0${pg} out of ${length}`)
            } else {
              embed.setTitle(`Page ${pg} out of ${length}`)
            }
            obj[page].forEach(async (item) => {
              embed.addField(`${item.quantity} - ${item.item}`, "\u200b", false)
            })
            const b1 = new db.MessageButton()
              .setID('invpriv')
              .setStyle('blurple')
              .setLabel('Previous Page')
            if (pg == 1) {
              b1.setDisabled(true)
            }
            const b2 = new db.MessageButton()
              .setID('invnext')
              .setStyle('blurple')
              .setLabel('Next Page')
            const row = new db.MessageActionRow().addComponents(b1, b2)
            button.message.edit(embed, row)
            await button.reply.defer(true)
          }
        } finally {
          mongoose.connection.close()
        }
      })
    }
    mongodb()
  } else if (button.id === 'invnext') {
    const mongodb = async () => {
      await mongo().then(async (mongoose) => {
        try {
          console.log('Connected to MongoDB!')
          const result = await invSchema.findOne(
            {
              did: button.clicker.user.id
            }
          )
          const inv = result.items
          const obj = Object.values(inv)
          let length = obj.length
          if (length < 10) {
            length = `0${length}`
          }
          const title = button.message.embeds[0].title
          const arg = title.split(' ')
          let int = arg[1]
          const embed = new djs.MessageEmbed()
            .setAuthor(`${button.clicker.user.tag}'s Inventory`, button.clicker.user.displayAvatarURL({ dynamic: true }))
          int = arg[1].slice(1)
          let no = new Number(int)
          no = no.valueOf()
          const pg = no + 1
          if (obj.length > no || obj.length == no) {
            if (pg < 10) {
              embed.setTitle(`Page 0${pg} out of ${length}`)
            } else if (pg > 10 || pg == 10) {
              embed.setTitle(`Page ${pg} out of ${length}`)
            }
            obj[no].forEach(async (item) => {
              embed.addField(`${item.quantity} - ${item.item}`, "\u200b", false)
            })
            const b1 = new db.MessageButton()
              .setID('invpriv')
              .setStyle('blurple')
              .setLabel('Previous Page')
            const b2 = new db.MessageButton()
              .setID('invnext')
              .setStyle('blurple')
              .setLabel('Next Page')
            if (obj.length == pg) {
              b2.setDisabled(true)
            }
            const row = new db.MessageActionRow().addComponents(b1, b2)
            button.message.edit(embed, row)
            await button.reply.defer(true)
          }
        } finally {
          mongoose.connection.close()
        }
      })
    }
    mongodb()
  }
})