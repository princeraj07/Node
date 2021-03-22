const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true});
app.use(bodyParser.urlencoded({ extended:true }))
app.use(express.static("public"));
app.set('view engine', 'ejs');
var items=["day","rest"];
var workitems=[];
app.get("/", function(req, res){
    var day=new Date();
    var options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    }
    var day1= day.toLocaleDateString("en-US", options);
    res.render('list',{currentDay:day1, item:items});
})
app.post("/", function(req, res){
    var button = req.body.button;
    if(button ==="Work")
    {
        var k1 = req.body.tex;
        workitems.push(k1);
        res.redirect("/work");
    }
    else{
    var k = req.body.tex;
    items.push(k);
    res.redirect("/");
    }
})

app.get("/work", function(req, res){
    res.render('list',{currentDay:"Work", item:workitems});
})

app.listen(3000, function(){
    console.log("Running");
})