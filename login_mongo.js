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

app.post('/dash.html', function(req,res){
	var id=req.body.id; 
    var pw= req.body.pw;

	var data = {
		"User ID": id,
		"Password":pw,
	}
	db.collection('login').findOne({"User ID": id}, function(err, user){
	if(err) {
		console.log(err);
	  }
	  var message;
        if(user) {
          console.log(user)
            message = "user exists";
            console.log(message)
			return res.redirect('dash.html')
        } else {
            message= "user doesn't exist";
            console.log(message)
			return res.redirect('index.html');
        }
})
// db.collection('login').insertOne(data,function(err, collection){
// 		if (err) throw err;
// 		console.log("Record inserted Successfully");
			
// 	});
	// response = {  
	// 	id:req.body.id,  
	// 	pw:req.body.pw 
	// };  
	// console.log(data);  
	// res.end(JSON.stringify(data));	
	//return res.redirect('success.html');
})


app.get('/',function(req,res){
res.set({
	'Access-control-Allow-Origin': '*'
	});
return res.redirect('index.html');
}).listen(3000)


console.log("server listening at port 3000");
