var express = require("express");
const session = require('express-session');
//const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const db = require("./db");
var app = express();

app.use(express.static("public"));

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT || 3001;

app.listen(port);

console.log('RESTful API server started on: ' + port);

app.get("/trangchu", function(request, response) {

    response.render("home");
});

app.get("/", function(request, response) {

    response.render("homePage");
});
app.get("/dangnhap", function(request, response) {
    response.render("dangnhap")
})


app.get("/dangky", function(request, response) {
    response.render("dangky")
})


app.get("/dangnhap", function(request, response) {

    response.render("dangnhap");
});

app.get("/dangkythi", function(request, response) {

    response.render("dangkythi");
});


app.post("/dangnhap", function(request, response) {

    var email = request.body.email;
    var password = request.body.password;
    console.log(email, password);
    if (email && password) {
        db.query('SELECT * FROM tai_khoan WHERE email = ? AND password = ?', [email, password], function(error, results, fields) {
            if (results.length > 0) {
                request.session.loggedin = true;
                request.session.email = email;
                response.redirect('/trangchu');
            } else {
                response.send('Incorrect Username and/or Password!');
            }
            response.end();
        });
    } else {
        response.send('Please enter Username and Password!');
        response.end();
    }
})