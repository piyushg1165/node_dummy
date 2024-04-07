const express = require("express");
const router = express.Router();
const Menu = require("../models/Menu");

router.post("/", async (req, res) => {
    try {
        const data = req.body;
        const newMenu = new Menu(data);
        const response = await newMenu.save();
        console.log('data saved');
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: ' Internal Server Error'});
       }
});

router.get("/", async (req, res) => {
    try {
        const data = await Menu.find();
        console.log('data fetched');
        res.status(200).json(data); 

    } catch (error) {
        console.log(error);
        res.status(500).json({error: ' Internal Server Error'});
    }
});

router.get("/:taste", async (req, res) => {

    try{
        const taste = req.params.taste;
        if(taste == "sweet" || taste == "sour" || taste == "spicy")
        {
            const data = await Menu.find({taste: taste});
            console.log('data fetched');
            res.status(200).json(data);
        }else{
            res.status(404).json({error: ' Invalid person type'});
        }
    }catch(error){
        console.log(error);
        res.status(500).json({error: ' Internal Server Error'});
    }
});

module.exports = router;