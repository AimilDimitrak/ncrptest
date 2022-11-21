const mongoose = require('mongoose')
const invSchema = mongoose.schema({
    did: {
        required: true,
        type: Number,
    },
    obj: {
        required: true,
        type: Array || Object,
    }
})
module.exports = mongoose.model('inv', invSchema)