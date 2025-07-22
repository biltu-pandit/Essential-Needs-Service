const express = require('express');
const router = express.Router()
module.exports = router;
const User= require('../model/User');

router.get('/', function (req, res) {
    res.send("This is User Page....!!!")
});

//Post Method
router.post('/registerUser', async (req, res) => {
    const data = new User ({
        email: req.body.email,
        name: req.body.name,
        password: req.body.password,
        contact: req.body.contact,
        address: req.body.address,
        city: req.body.city,
        district: req.body.district

    })
    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
})


//Get all Method
router.get('/getAllUser',async ( req, res) => {
    try{
        const data = await User.find();
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Login Method
router.post('/loginUser',async ( req, res) => {
    try{
        const data = await User.find({email: req.body.email, password: req.body.password  });
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Get by ID Method
router.get('/getUserByID/:id', async (req, res) => {
    try{
        const data = await User.findById(req.params.id);
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Update by ID Method
router.patch('/updateUser/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await User.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//Delete by ID Method
router.delete('/deleteUser/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await User.findByIdAndDelete(id)
        res.send(`Document with ${data.name} has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})
module.exports = router