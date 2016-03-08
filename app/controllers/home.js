
/*!
 * Module dependencies.
 */


var score = [0,0,0,0,0,0]; 
var isFallen = [0,0,0,0,0,0]; 

exports.score; 
exports.isFallen; 

exports.postDevice = function( req, res){
	var ID =  req.params.ID;
	//var data =  req.params.data;
	isFallen[ID] = 1; 
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


exports.postKintect= function( req, res){
	
	var ID =  req.params.ID;
	var move = req.params.move;

	score[ID] += move*100; 
	console.log( ) ; 
	res.json({
         "status": 200,
         msg: "got data"
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
  res.render('home/index', {
    title: 'SuperJump'
  });
};

