const express = require("express");
const app = express();
const db = require("./db");
require('dotenv').config();
const passport = require('./auth.js');



const bodyParser = require('body-parser');
app.use(bodyParser.json());


const logRequest = (req, res, next) => {
    console.log(`${new Date().toLocaleString() } Request made to : ${req.originalUrl} `);
    next();
}

app.use(logRequest);



app.use(passport.initialize());

const localAuthMiddleware = passport.authenticate('local', {session: false});

app.get("/", (req, res) => {
    res.send('hello there');
});

const personRoutes = require('./routes/personRouter.js');
app.use("/person",localAuthMiddleware, personRoutes);

const menuRoutes = require('./routes/menuRouter.js');
app.use("/menu", menuRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT , () =>{
    console.log("listening on port 3000")
});