const express = require("express");
const app = express();
const db = require("./db");
require('dotenv').config();


const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.get("/", (req, res) => {
    res.send('hello there');
});





const personRoutes = require('./routes/personRouter.js');
app.use("/person",personRoutes);

const menuRoutes = require('./routes/menuRouter.js');
app.use("/menu",menuRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT , () =>{
    console.log("listening on port 3000")
});