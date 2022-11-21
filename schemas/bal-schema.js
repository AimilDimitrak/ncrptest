const mongoose = require('mongoose')
const reqInt = {
    required: true,
    type: Number,
}
const balSchema = mongoose.schema({
    did: reqInt,
    amount: reqInt,
    bamount: reqInt,
})
module.exports = mongoose.model('bal', balSchema)