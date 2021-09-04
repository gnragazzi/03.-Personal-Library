/*
*
*
*       Complete the API routing below
*       
*       
*/

'use strict';

const { addNewBook, getAllBooks, getBookById, commentBook, deleteBookById, deleteAllBooks } = require("../lib/db");

module.exports = function (app) {

  app.route('/api/books')
    .get(function (req, res){
      getAllBooks().then(books=>{
        res.json(books)
      }).catch(err=>res.json({err}))
    })
    
    .post(function (req, res){
      let title = req.body.title;
      if(!title) return res.send('missing required field title')
      addNewBook(title).then(newBook=>{
        const {title, _id} = newBook
        return res.json({_id, title})
      }).catch(err=>res.json({err}))
    })
    
    .delete(function(req, res){
      deleteAllBooks().then(books=>{
        if(!books) return res.send('no book exists')
        return res.send('complete delete successful')
      }).catch(err=>res.send('no book exists'))
    });



  app.route('/api/books/:id')
    .get(function (req, res){
      let bookid = req.params.id;
      getBookById(bookid).then(book=>{
        if(!book) return res.send('no book exists')
        return res.json(book)
      }).catch(err=>res.send('no book exists'))
    })
    
    .post(function(req, res){
      let bookid = req.params.id;
      let comment = req.body.comment;
      if(!comment) return res.send('missing required field comment')
      getBookById(bookid).then(book=>{
        if(!book) return res.send('no book exists')
        const {comments} = book
        comments.push(comment)
        const commentcount = comments.length
        commentBook(bookid,comments, commentcount)
          .then(book=>{
            return res.json(book)
          })
          .catch(err=>res.send(`no book exists`))
      }).catch(err=>res.send(`no book exists`))
    })
    
    .delete(function(req, res){
      let bookid = req.params.id;
      deleteBookById(bookid).then(book=>{
        if(!book) return res.send('no book exists')
        return res.send('delete successful')
      }).catch(err=>res.send('no book exists'))
    });
  
};
