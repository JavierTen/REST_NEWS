const express = require('express');
const router = express.Router();

const mysqlConnection  = require('../database.js');


router.get('/news', (req, res) => {
  mysqlConnection.query('SELECT * FROM news', (err, rows, fields) => {
    if(!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });  
});

//select * from news where headline like '%nada%' or author like '%nada%'

router.get('/searchNews/:word', (req, res) => {
  const { word } = req.params; 
  const query = `
  SELECT * FROM news WHERE REGEXP_LIKE(headline, ?) or REGEXP_LIKE(author, ?) or REGEXP_LIKE(content, ?)  `;
  mysqlConnection.query(query , [word,word,word], (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
});


router.post('/createNews', (req, res) => {
  const {id, headline, author, content} = req.body;
  const query = `
    SET @id = ?;
    SET @headline = ?;
    SET @author = ?;
    SET @content = ?;
    SET @creationDate = ?;
    SET @updateDate = ?;
    CALL newsAddOrEdit(@id, @headline, @author,@content,@creationDate,@updateDate );`;

    const date = new Date();
  mysqlConnection.query(query, [id, headline, author,content,date,date], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'Se ha creado correctamente una nueva noticia'});
    } else {
      console.log(err);
    }
  });

});


router.put('/updateNews/:id', (req, res) => {
  const { headline, author, content, creationDate } = req.body;
  const { id } = req.params;
  const query = `
  SET @id = ?;
  SET @headline = ?;
  SET @author = ?;
  SET @content = ?;
  SET @creationDate = ?;
  SET @updateDate = ?;
  CALL newsAddOrEdit(@id, @headline, @author,@content,@creationDate,@updateDate );`;
  const date = new Date();
  mysqlConnection.query(query, [id, headline, author,content,creationDate,date], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'Se han actualizado correctamente los datos de la noticia'});
    } else {
      console.log(err);
    }
  });
});


router.delete('/deleteNews/:id', (req, res) => {
  const { id } = req.params;
  mysqlConnection.query('DELETE FROM news WHERE id = ?', [id], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'Se ha eliminado correctamente la noticia'});
    } else {
      console.log(err);
    }
  });
});

module.exports = router;