const mongoose = require('mongoose')
const invSchema = mongoose.Schema({
    did: {
        required: true,
        type: Number,
    },
    obj: {
        required: true,
        type: Object,
    }
})
module.exports = mongoose.model('inv', invSchema)
