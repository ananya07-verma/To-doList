const express = require("express");
const https = require("https");
const app = express();
//express.json() is a built in middleware function in Express starting from v4.16.0. It parses incoming JSON requests and puts the parsed data in req.body.
app.use(express.json());
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'ejs');

app.use(express.static("public"));


let newItems = []
app.get('/', (req, res) => {
    let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    let today = new Date();
    let day = today.toLocaleDateString("en-US", options);
    res.render("list", { KindofDay: day, newListItems: newItems }); //The res.render() function is used to render a view                                                              and sends the rendered HTML string to the client. 
});

app.post('/', function (req, res, next) {

    // DELETEbtn

    if (req.body.delete) {

        let index = newItems.indexOf(req.body.delete);
        if (index > -1) {
            newItems.splice(index, 1);
        }
    } else {
        next();
    }


    res.redirect('/');
});


app.post('/', (req, res) => {
    let newItem = req.body.newItem;
    newItems.push(newItem);
    res.redirect('/');

});




app.listen(3080);
