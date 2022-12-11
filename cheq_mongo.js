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

app.post('/sign_up', function(req,res){
    var acc_no= req.body.accno;
    var thr=req.body.thr;
    var no = req.body.no;
    var leaves=req.body.leaves;

	var data = {
		"Account Number":acc_no,
		"threshold":thr,
		"no":no,
        "leaves":leaves
	}
db.collection('Cheque').insertOne(data,function(err, collection){
		if (err) throw err;
		console.log("Record inserted Successfully");
			
	});
	// response = {  
	// 	ben_name:req.body.ben_name,  
	// 	ben_no:req.body.acc_no,
	// 	ifsc:req.body.ifsc,
	// 	amount:req.body.amt,
	// 	purp:req.body.Purpose  
	// };  
	console.log(data);  
	res.end(JSON.stringify(data));	
	//return res.redirect('success.html');
})


app.get('/',function(req,res){
res.set({
	'Access-control-Allow-Origin': '*'
	});
return res.redirect('request_cheque.html');
}).listen(3000)


console.log("server listening at port 3000");
