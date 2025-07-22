const express = require('express');
const router = express.Router()
module.exports = router;
const Provider=require('../model/Provider');

router.get('/', function (req, res) {
    res.send("This is Provider Page....!!!")
});

//Post Method
router.post('/registerProvider', async (req, res) => {
    const data = new Provider ({
        email: req.body.email,
        name: req.body.name,
        password: req.body.password,
        contact: req.body.contact,
        description: req.body.description

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
router.get('/getAllProvider',async ( req, res) => {
    try{
        const data = await Provider.find();
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Login Method
router.post('/loginProvider',async ( req, res) => {
    try{
        const data = await Provider.find({email: req.body.email, password: req.body.password  });
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Get by ID Method
router.get('/getProviderByID/:id', async (req, res) => {
    try{
        const data = await Provider.findById(req.params.id);
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Update by ID Method
router.patch('/updateProvider/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await Provider.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//Delete by ID Method
router.delete('/deleteProvider/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Provider.findByIdAndDelete(id)
        res.send(`Document with ${data.name} has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

module.exports = router