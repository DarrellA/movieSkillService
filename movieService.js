const query = require("./database.js");
const express = require('express');
 
const app = express();

app.get('/kill',shutdownController);
app.get('/movies', movieController);

function movieController(req,res) {
     let genre = req.query.genre;
     let count = req.query.count;
     query.getMoviesFromDB(genre, count,function(results) {
	res.json(results);
     });	     
}


function shutdownController(req,res) {
    process.exit();
}	

app.listen(7012);

