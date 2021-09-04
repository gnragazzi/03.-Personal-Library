/*
*
*
*       Complete the API routing below
*       
*       
*/

'use strict';

const { addNewBook, getAllBooks } = require("../lib/db");

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
      //if successful response will be 'complete delete successful'
    });



  app.route('/api/books/:id')
    .get(function (req, res){
      let bookid = req.params.id;
      //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
    })
    
    .post(function(req, res){
      let bookid = req.params.id;
      let comment = req.body.comment;
      //json res format same as .get
    })
    
    .delete(function(req, res){
      let bookid = req.params.id;
      //if successful response will be 'delete successful'
    });
  
};
