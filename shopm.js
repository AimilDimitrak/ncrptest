// Start Variable Area
const shope = require('./shope')
const env = require('./env.json')
const djs = require('discord.js')
const client = new djs.Client()
client.on("ready", async () => {
    console.log('hello world')
})
const c = [
    {
        "type": 1,
        "components": [
            {
                "type": 2,
                "style": 1,
                "label": "Previous Page",
                "custom_id": "shopprivpage"
            },
            {
                "type": 2,
                "style": 1,
                "label": "Next Page",
                "custom_id": "shopnextpage"
            }
        ]
    }
]
const author = {
    "name": env.name,
    "icon_url": env.icon
}
// End Variable Area
// Start Embed Area
const e1 = {
    "title": shope.title.page1,
    "description": shope.description,
    "author": author,
    "fields": shope.fields.page1,
    "color": shope.color    
}
const e2 = {
    "title": shope.title.page2,
    "description": shope.description,
    "author": author,
    "fields": shope.fields.page2,
    "color": shope.color
}
const e3 = {
    "title": shope.title.page3,
    "description": shope.description,
    "author": author,
    "fields": shope.fields.page3,
    "color": shope.color
}
const e4 = {
    "title": shope.title.page4,
    "description": shope.description,
    "author": author,
    "fields": shope.fields.page4,
    "color": shope.color
}
const e5 = {
    "title": shope.title.page5,
    "description": shope.description,
    "author": author,
    "fields": shope.fields.page5,
    "color": shope.color
}
const e6 = {
    "title": shope.title.page6,
    "description": shope.description,
    "author": author,
    "fields": shope.fields.page6,
    "color": shope.color
}
const e7 = {
    "title": shope.title.page7,
    "description": shope.description,
    "author": author,
    "fields": shope.fields.page7,
    "color": shope.color
}
const e8 = {
    "title": shope.title.page8,
    "description": shope.description,
    "author": author,
    "fields": shope.fields.page8,
    "color": shope.color
}
const e9 = {
    "title": shope.title.page9,
    "description": shope.description,
    "author": author,
    "fields": shope.fields.page9,
    "color": shope.color
}
const e10 = {
    "title": shope.title.page10,
    "description": shope.description,
    "author": author,
    "fields": shope.fields.page10,
    "color": shope.color
}
const e11 = {
    "title": shope.title.page11,
    "description": shope.description,
    "author": author,
    "fields": shope.fields.page11,
    "color": shope.color
}
const e12 = {
    "title": shope.title.page12,
    "description": shope.description,
    "author": author,
    "fields": shope.fields.page12,
    "color": shope.color
}
const e13 = {
    "title": shope.title.page13,
    "description": shope.description,
    "author": author,
    "fields": shope.fields.page13,
    "color": shope.color
}
const e14 = {
    "title": shope.title.page14,
    "description": shope.description,
    "author": author,
    "fields": shope.fields.page14,
    "color": shope.color
}
const e15 = {
    "title": shope.title.page15,
    "description": shope.description,
    "author": author,
    "fields": shope.fields.page15,
    "color": shope.color
}
// End Embed Area
// Start Message Area
const msg1 = {
    "embeds": [e1],
    "components": [
        {
            "type": 1,
            "components": [
                {
                    "type": 2,
                    "style": 1,
                    "label": "Previous Page",
                    "custom_id": "shopprivpage",
                    "disabled": true
                },
                {
                    "type": 2,
                    "style": 1,
                    "label": "Next Page",
                    "custom_id": "shopnextpage"
                }
            ]
        }        
    ]
}
const msg2 = {
    "embeds": [e2],
    "components": c
}
const msg3 = {
    "embeds": [e3],
    "components": c
}
const msg4 = {
    "embeds": [e4],
    "components": c
}
const msg5 = {
    "embeds": [e5],
    "components": c
}
const msg6 = {
    "embeds": [e6],
    "components": c
}
const msg7 = {
    "embeds": [e7],
    "components": c
}
const msg8 = {
    "embeds": [e8],
    "components": c
}
const msg9 = {
    "embeds": [e9],
    "components": c
}
const msg10 = {
    "embeds": [e10],
    "components": c
}
const msg11 = {
    "embeds": [e11],
    "components": c
}
const msg12 = {
    "embeds": [e12],
    "components": c
}
const msg13 = {
    "embeds": [e13],
    "components": c
}
const msg14 = {
    "embeds": [e14],
    "components": c
}
const msg15 = {
    "embeds": [e15],
    "components": [
        {
            "type": 1,
            "components": [
                {
                    "type": 2,
                    "style": 1,
                    "label": "Previous Page",
                    "custom_id": "shopprivpage"
                },
                {
                    "type": 2,
                    "style": 1,
                    "label": "Next Page",
                    "custom_id": "shopnextpage",
                    "disabled": true
                }
            ]
        }
    ]
}
// End Message Area
// Start Export Area
module.exports = {
    msg1: msg1,
    msg2: msg2,
    msg3: msg3,
    msg4: msg4,
    msg5: msg5,
    msg6: msg6,
    msg7: msg7,
    msg8: msg8,
    msg9: msg9,
    msg10: msg10,
    msg11: msg11,
    msg12: msg12,
    msg13: msg13,
    msg14: msg14,
    msg15: msg15
}
// End Export Area