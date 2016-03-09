var client = require('client.js'); 

var score = [0,0,0,0,0,0]; 
var score2 = [0,0,0,0,0,0]; 

var isFallen = [0,0,0,0,0,0]; 

exports.score; 
exports.isFallen; 

exports.postDevice = function( req, res){ // THIS IS KINECT 
	var ID =  req.params.ID;
	var newScore =  req.params.score;
	isFallen[ID] = 1; 

	if( newScore > 8){
		newScore = 5; 
	}else if( newScore > 6){
		newScore = 4; 
	}else if( newScore > 4){
		newScore = 3; 
	}else if( newScore > 2){
		newScore = 2; 
	}else{
		newScore = 1; 
	}

		console.log("we have both!!!");

		var realScore = Math.round( (score[1] + score2[1]) ) ; 
		client.publish('/bcx16', JSON.stringify({"score":realScore} ) ) ;
		console.log( "pub POST done");

	res.json({
         "status": 200,
         msg: "received"
      });
}; 
	
exports.postDeviceTest = function( req, res){
	var ID =  req.params.ID;
	var data =  req.params.data;


	isFallen[ID] = 1; 
	res.json({
         "status": 200,
         msg: "received" + data
      });
}; 


exports.postKintect= function( req, res){ // THIS IS DEVICE
	
	var ID =  req.params.ID;
	var move = req.params.move;
	score2[ID] = move; 

	console.log("we have both!!!"); 
	var realScore = Math.round( (score[1] + score2[1]) ) ; 
	client.publish('/bcx16', JSON.stringify({"score":realScore} ) ) ;
	console.log( "pub POST done");


	console.log( ) ; 
	res.json({
         "status": 200,
         msg: "got data " + score[ID]
      });


}; 

exports.clear = function (req, res){

	score = [0,0,0,0,0,0]; 
	res.json({
         "status": 200,
         msg: "cleared"
      });
}; 

exports.getScore = function ( req, res){
	res.json(score);

}; 

exports.index = function (req, res) {
	console.log(req); 
	console.log(res); 
  res.render('home/index', {
    title: 'SuperJump'
  });
};

