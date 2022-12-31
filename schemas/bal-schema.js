const mongoose = require('mongoose')
const reqInt = {
    required: true,
    type: Number,
}
const balSchema = mongoose.Schema({
    did: reqInt,
    amount: reqInt,
    bamount: reqInt,
    bmoney: reqInt,
    collect: {
        required: true,
        type: Object,
    }
})
module.exports = mongoose.model('bal', balSchema)
