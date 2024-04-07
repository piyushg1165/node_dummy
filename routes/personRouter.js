const express = require('express');
const router =  express.Router();

const Person = require("../models/Person");
const { findOneAndDelete, findByIdAndDelete } = require('../models/Menu');

router.post("/", async (req, res) => {

    try {
     const data = req.body;
 
     const newPerson = new Person(data);
 
     const response = await newPerson.save();
     console.log('data saved');
     res.status(200).json(response);
 
    } catch (error) {
     console.log(error);
     res.status(500).json({error: ' Internal Server Error'});
    }
 
 });

router.get("/", async (req, res) => {
    try {
        const data = await Person.find();
        console.log('data fetched');
        res.status(200).json(data); 

    } catch (error) {
        console.log(error);
        res.status(500).json({error: ' Internal Server Error'});
    }
});

router.get("/:personType", async (req, res) => {

    try{
        const personType = req.params.personType;
        if(personType == "chef" || personType == "manager" || personType == "waiter")
        {
            const data = await Person.find({work: personType});
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

router.put("/:id", async (req, res) => {
    try {
        const personId = req.params.id;
        const updatedPersonData = req.body;

        const response = await Person.findByIdAndUpdate(personId, updatedPersonData, {new: true,
        runValidators: true });

        if(!response){
            return res.status(404).json({error: 'person not found'});
        }
        console.log('data updated');
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: ' Internal Server Error'});
    }
});
router.delete("/:id", async function (req, res) {
    try {
        const personId = req.params.id;
        const response = await Person.findByIdAndDelete(personId);
        if(!response){
            return res.status(404).json({error: 'person not found'});
        }
        console.log('data deleted');
        res.status(200).json({message : 'person data deleted succesfully'});
    } catch (error) {
        console.log(error);
        res.status(500).json({error: ' Internal Server Error'});
    }
});

module.exports = router;