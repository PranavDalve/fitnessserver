const express = require('express');
const Router = express.Router();
const fetchuser = require('../Middleware/fetchuser');
const { body, validationResult } = require('express-validator')
const Diet = require("../Models/Diet")
const User = require('../Models/User')
const app = express();

// Route 1 : get all the developers profile
Router.get('/getalldiet', fetchuser, async (req, res) => {
    try {
        const diets = await Diet.find()
        res.json(diets);
    } catch (error) {
        res.status(401).send("Something went wrong");
    }
})



// Router 2 : add the developer profile. 
Router.post('/adddiet', fetchuser, async (req, res) => {

    try {
        const { name, email, contactNum, description} = req.body;

        // If there are errors, return Bad request and the errors
        // const errors = validationResult(req);
        // if (!errors.isEmpty()) {
        //     return res.status(400).json({ errors: errors.array() });
        // }
        const element = new Diet({
            name, email, contactNum, description, user: req.user.id
        })
        const savedelement = await element.save()

        res.json(savedelement)

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// ------------------------------------------------------
// Route3 :  get the Developer profiles of the logged in user.
Router.get('/fetchdiet', fetchuser, async (req, res) => {
    try {
        const mydevprofile = await Diet.find({ user: req.user.id });
        // console.log(mydevprofile);
        res.json(mydevprofile);
    } catch (error) {
        res.status(401).send("Something went Wrong")
    }
})


//Route 4 :  update the profile . 
Router.put('/updatediet/:id', fetchuser, async (req, res) => {
    const { name, email, contactNum, description, achievements, date } = req.body;
    // create a new developer object. 
    try {
        const newdev = {};
        if (name) { newdev.name = name };
        if (email) { newdev.email = email }
        if (contactNum) { newdev.contactNum = contactNum }
        if (description) { newdev.description = description };
        if (date) { newdev.date = date };

        // update the developer. 
        let diet = await Diet.findById(req.params.id);
        if (!diet) {
            return res.status(400).send("Not Found");
        }
        if (diet.user.toString() != req.user.id) {
            return res.status(401).send("Not allowed");
        }
        diet = await Diet.findByIdAndUpdate(req.params.id, { $set: newdev }, { new: true });
        res.json({ diet });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }


})


// Route 5 : 
// router delete an existing developer using DELETE: api/dev/delete/:id
Router.delete('/diet/:id', fetchuser, async (req, res) => {
    try {
        let deve = await Diet.findById(req.params.id);
        console.log("Got it 1")
        if (!deve) {
            // 400 shows bad status like not found
            return res.status(404).send("Not Found");
        }
        // if (deve.user.toString() !== req.user.id) {
        //     // 401 is for unauthorized error.
        //     return res.status(401).send("Not Allowed to Delete !");
        // }
        deve = await Element.findByIdAndDelete(req.params.id);
        res.json({ success: "Successfully deleted the developer" });
    } catch (error) {
        res.status(400).send("something went wrong");
    }
})
module.exports = Router;