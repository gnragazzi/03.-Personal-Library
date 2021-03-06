require('dotenv').config()
const mongoose = require('mongoose')
const { db } = require('../models/Book')

mongoose.connect(process.env.DB,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(console.log('DB SUCCESSFULLY CONNECTED π±βπ€π±βπ€π±βπ€')).catch(err=>process.exit(1))

const Book = require('../models/Book')

module.exports = {
    addNewBook: async (title)=>{
        return await new Book({
            comments: [],
            title,
            }).save()
    },
    getAllBooks: async ()=> await Book.find(),
    getBookById: async (_id) => await Book.findById(_id),
    commentBook: async (_id,comments, commentcount) => {
        return await Book.findByIdAndUpdate(_id,{comments, commentcount},{new:true}) //*** DEBO COMPROBAR QUE ESTA FUNCIΓN HAGA LO QUE YO CREO QUE VA A HACER ππππ
    },
    deleteBookById: async (_id) => await Book.findByIdAndDelete(_id),
    deleteAllBooks: async ()=> await Book.deleteMany() // NUNCA USΓ ESTE MΓTODO... IGUAL QUE ARRIBA, COMPROBAR QUE ESTO SE COMPORTE COMO ESPERO πππ
}