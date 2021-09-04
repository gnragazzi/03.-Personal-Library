const mongoose = require('mongoose')

const bookSchema = mongoose.Schema({
    comments: [{type: String, required: true}],
    title: {type: String, required: true},
    commentcount: {type: Number, default: 0, required: true}
})

module.exports = mongoose.model('PersonalLibraryModel', bookSchema)