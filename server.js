var datastore = require("nedb");
var db = new datastore({filename: 'path/to/datafile', autoload: true});

var express = require('express');
var bodyParser = require("body-parser");
var app = express();

var urlencodedBodyParser = bodyParser.urlencoded({extended: true});
app.use(urlencodedBodyParser);

//look in public first
app.use(express.static("public"));

app.set('view engine', 'ejs');


//set an array to store data 
var submittedData =[];


app.post("/memoryform", function(req, res){
//res.send('Thank you for order with us!');


// sort data in an object
var dataToSave = {
    name: req.body.name,
    memory: req.body.memory
};

//store data in an array
//submittedData.push(dataToSave);
db.insert(dataToSave, function(err, newDoc){
    //res.send("Your City & Memory are saved :" + newDoc);
    db.find({}, function(err,docs){
        //var dataWrapper = { data: docs };
    });
});

//console.log(submittedData);

var dataWrapper = { data: submittedData };
// var output = "<html><body>";
// for(var i=0; i<submittedData.length; i++){
//     output += "<div>" + "Thank you for your memory" + " " + submittedData[submittedData.length - 1].name + "!" + "</div>";
// }
// output += "</body></html>"

// res.send(output);
res.render("outputtemplete.ejs",dataWrapper);
}); 

app.listen(80, function(){
    console.log("Example app listening on port 80");
});