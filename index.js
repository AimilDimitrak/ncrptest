const mongo = require('./mongo');
const djs = require('discord.js')
const client = new djs.Client()
const balSchema = require('./schemas/bal-schema')
const nextDay = require('next-day')
client.on('ready', () => {
  client.user.setStatus('online')
  console.log('Successfully connected to Discord!')
})
// client.on('guildMemberAdd', async (member) => {
//   const mongodb = async () => {
//     await mongo().then(async (mongoose) => {
//       try {
//         console.log('Connected to MongoDB!')
//         const user = {
//           did: member.id,
//           amount: 15000,
//           bamount: 0,
//           bmoney: 0,
//           collect: {
//             day: null,
//             month: new Date().getMonth()
//           }
//         }
//         await new balSchema(user).save()
//       }
//       finally {
//         mongoose.connection.close()
//       }
//     })
//   }
//   mongodb()
// })
const prefix = "dev-"
client.on('message', (message) => {
  let args = message.content.split(' ')

  if (message.content.startsWith(prefix + "setup-economy")) {
    const mongodb = async () => {
      await mongo().then(async (mongoose) => {
        try {
          console.log('Connected to MongoDB!')
          message.guild.members.fetch().then(async (members) => {
            members.forEach(async (member) => {
              const bal = {
                did: member.id,
                amount: 15000,
                bamount: 0,
                bmoney: 0,
                collect: {
                  day: null,
                  month: new Date().getMonth()
                }
              }
              await new balSchema(bal).save()
            })
          })
        } finally {
          mongoose.connection.close()
        }
      })
    }
    mongodb()
  }

  if (message.content.startsWith(prefix + "give")) {
    const taker = message.mentions.users.first()
    if (taker) {
      const amount = args[2]
      const mongodb = async () => {
        await mongo().then(async (mongoose) => {
          try {
            console.log('Connected to MongoDB!')
            const user1 = await balSchema.findOne(
              {
                did: message.author.id,
              }
            )
            const user2 = await balSchema.findOne(
              {
                did: taker.id,
              }
            )
            if (user1.amount > amount || user1.amount == amount) {
              const namount1 = user1.amount - amount
              const namount2 = user2.amount + amount
              balSchema.findOneAndUpdate(
                {
                  did: message.author.id
                },
                {
                  did: message.author.id,
                  amount: namount1,
                  bamount: user1.bamount,
                  bmoney: user1.bmoney,
                  collect: user1.collect
                },
                {
                  upsert: true,
                  new: true
                }
              )
              balSchema.findOneAndUpdate(
                {
                  did: taker.id
                },
                {
                  did: taker.id,
                  amount: namount2,
                  bamount: user2.bamount,
                  bmoney: user2.bmoney,
                  collect: user2.collect
                },
                {
                  upsert: true,
                  new: true
                }
              )
            } else if (user1.amount < amount) {
              message.channel.send(`You don't have that much money! You only have ${eurid + result.amount} on hand.`)
            }
          } finally {
            mongoose.connection.close()
          }
        })
      }
      mongodb()
    } else if (!taker) {
      message.channel.send("Use the command this way: `!give <user> <amount>`.")
    }
  }
  if (message.content.startsWith(prefix + "collect")) {
    const mongodb = async () => {
      await mongo().then(async (mongoose) => {
        try {
          console.log('Connected to MongoDB!')
          const result = balSchema.findOne(
            {
              did: message.author.id
            }
          )
          const date = new Date()
          if (date.getDate() == result.collect.day && result.collect.day !== null || date.getDate() > result.collect.day && result.collect.day !== null || result.collect.day == null) {
            let total;
            const roles = message.member.roles.cache
            if (roles.get("995620773093969970") !== undefined) {
              // elas
              total + 15000
            }
            if (roles.get("995620774016733255") !== undefined) {
              // elas + ajiwmatouxos
              total + 5000
            }
            if (roles.get("995620775975473162") !== undefined) {
              // ekab
              total + 15000
            }
            if (roles.get("995620776898211901") !== undefined) {
              // ekab + diefthintis
              total + 5000
            }
            if (roles.get("995620778399760456") !== undefined) {
              // ekab + ipodiefthintis
              total + 3500
            }
            if (roles.get("995620808045105162") !== undefined) {
              // diefthintis
              total + 10000
            }
            if (roles.get("995620809278226442") !== undefined) {
              // ipodiefthintis
              total + 7000
            }
            if (roles.get("995620810242920508") !== undefined) {
              // ipallhlos
              total + 5000
            }
            if (roles.get("995632820380774410") !== undefined) {
              // civilian
              total + 3000
            }
            const d = new Date()
            const nd = nextDay(d, d.getDay())
            const limit = {
              day: nd.date.getDay(),
              month: nd.date.getMonth()
            }
            balSchema.findOneAndUpdate(
              {
                did: message.author.id
              },
              {
                did: message.author.id,
                amount: result.amount + total,
                bamount: result.bamount,
                bmoney: result.bmoney,
                collect: limit
              },
              {
                upsert: true,
                new: true
              }
            )
          } else if (date.getDate() < result.collect.day && result.collect.day !== null) {
            message.channel.send(`You can't collect money. You will be able to collect money in **${result.collect.day - date.getDate()} days**!`)
          }
        } finally {
          mongoose.connection.close()
        }
      })
    }
    mongodb()
  }
  if (message.content.startsWith(prefix + "balc")) {
    const user = message.mentions.users.first()
    const mongodb = async () => {
      await mongo().then(async (mongoose) => {
        try {
          console.log('Connected to MongoDB!')
          const bal = {
            did: user.id,
            amount: 0,
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
  if (message.content.startsWith(prefix + "add-money-role")) {
    const role = message.mentions.roles.first()
    const amount = args[2]
    if (role) {
      const mongodb = async () => {
        await mongo().then(async (mongoose) => {
          try {
            console.log('Connected to MongoDB!')
            const members = message.guild.roles.cache.get().members
            members.forEach(async (member) => {
              const result = balSchema.findOne(
                {
                  did: member.id
                }
              )
              balSchema.findOneAndUpdate(
                {
                  did: member.id
                },
                {
                  did: member.id,
                  amount: result.amount + amount,
                  bmoney: result.bmoney,
                  bamount: result.bamount,
                  collect: result.collect
                },
                {
                  upsert: true,
                  new: true
                }
              )
            })
          } finally {
            mongoose.connection.close()
          }
        })
      }
      mongodb()
    } else if (!role) {
      message.channel.send("Use the command this way: `!add-money-role <role> <amount>")
    }
  }


  if (message.content.startsWith(prefix + "reset-economy")) {
    const mongodb = async () => {
      await mongo().then(async (mongoose) => {
        try {
          console.log('Connected to MongoDB!')
          balSchema.deleteMany({})
        } finally {
          mongoose.connection.close()
        }
      })
    }
    mongodb()
  }
})
