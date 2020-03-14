var mysql=require('mysql');


function getMoviesFromDB(genre, number,callback) {
     var con = mysql.createConnection({
	host: "localhost",
	user: "critic",
	password: "Movie123!"
      });
      
      var movieids = new Array();
      var idx = 0;	
      con.connect(function(err){
	    if (err) {
		  throw err;
             }		    
	     const useStatement = "use movies";
	     con.query(useStatement, function(err, result) {
		if (err) {
		     throw err;
		}     
	      });	
	      const sqlStatement = "SELECT imdbid FROM movies where " + genre + " = true order by rand() limit " + number + ";"; 
	      con.query(sqlStatement, function(err, result,fields) {
	 	    if (err){
			callback(movieids);    
			return;    
		    }
		        if( result == null ) {
			    callback(movieids);	
			    return;	
		        }
		        Object.keys(result).forEach(function(key) {
                                var row = result[key];
			        movieids[idx++] = row.imdbid;	
		        });	
                     callback(movieids);
               });		
	    con.end();
         });

}

exports.getMoviesFromDB = getMoviesFromDB
//getMoviesFromDB("drama", 5, function(theResults) {
	//	   console.log("thanks from cb " + theResults);
//
function callBack(results) {
   console.log("results "  +  results);
}	
	

