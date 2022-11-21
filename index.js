const djs = require('discord.js');
const client = new djs.Client();
const prefix = "pf!";
const mongo = require('./mongo')
client.on("message", (message) => {
  let args = message.content.split(' ');
  if (message.content.startsWith(prefix + "bal")) {
    const mongodb = async () => {
      await mongo().then(async (mongoose) => {
        try {
          console.log("Connected to MongoDB!")
          const result = await userSchema.findOne(
            {
              did: message.author.id,
            },
          )
          console.log("Result:\n", result)
        } finally {
          mongoose.connection.close()
        }
      })
    }
  }
});
