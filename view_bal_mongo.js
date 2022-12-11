var express=require("express");
var bodyParser=require("body-parser");

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/Banking');
var db=mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', function(callback){
	console.log("connection succeeded");
})

var app=express()
app.use(bodyParser.json());
app.use(express.static('forms'));
app.use(bodyParser.urlencoded({
	extended: true
}));

app.post('/view_bal', function(req,res){
	var accno=req.body.acc_no; 
    var article = [];
	var data = {
		"AccNo": accno
	};
db.collection('balance').find(data).toArray(function(err, result){
		if (err) throw err;
		console.log(result);
        return res.end(JSON.stringify(result));
	});
	// response = {  
	// 	ben_name:req.body.ben_name,  
	// 	ben_no:req.body.acc_no,
	// 	ifsc:req.body.ifsc,
	// 	amount:req.body.amt,
	// 	purp:req.body.Purpose  
	// };  
	// console.log(data);  
	// res.end(JSON.stringify(data));	
	//return res.redirect('success.html');
})


app.get('/',function(req,res){
res.set({
	'Access-control-Allow-Origin': '*'
	});
return res.redirect('view_bal.html');
}).listen(3000)


console.log("server listening at port 3000");
