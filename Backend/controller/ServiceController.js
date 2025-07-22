const express = require('express');
const router = express.Router();
module.exports = router;
const Service = require('../model/Service');

router.get('/', function (req, res) {
    res.send("This is Service Page....!!!")
});

//Post Method
router.post('/registerService', async (req, res) => {
    const data = new Service ({
        providerid: req.body.providerid,
        service_name: req.body.service_name,
        description: req.body.description,
        address: req.body.address,
        city: req.body.city,
        district: req.body.district,
        opening_time: req.body.opening_time,
        closing_time: req.body.closing_time

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
router.get('/:serviceType', async (req, res) => {
  try {
    const serviceType = req.params.serviceType.toLowerCase();
    
    const services = await Service.find({ 
      service_name: { $regex: new RegExp(`^${serviceType}$`, 'i') }
    })
    .populate('providerid')
    .exec();
    
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Modified location search endpoint that also filters by service type
router.get('/:serviceType/search/location/:keyword', async (req, res) => {
  try {
    const { serviceType, keyword } = req.params;
    const decodedKeyword = decodeURIComponent(keyword);
    
    // Split the address into components for more flexible searching
    const addressParts = decodedKeyword.split(/[,\s]+/).filter(part => part.length > 0);
    
    // Create search conditions for each part of the address
    const locationConditions = addressParts.map(part => ({
      $or: [
        { address: { $regex: part, $options: 'i' } },
        { city: { $regex: part, $options: 'i' } },
        { district: { $regex: part, $options: 'i' } }
      ]
    }));

    const services = await Service.find({
      service_name: { $regex: new RegExp(`^${serviceType}$`, 'i') },
      $and: locationConditions
    })
    .populate('providerid')
    .exec();

    res.json({ 
      success: true,
      results: services 
    });
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ 
      success: false,
      message: "Location search failed",
      error: error.message 
    });
  }
});
//Get all service by providerid
router.get('/getAllServiceByProvider/:id',async ( req, res) => {
    try{
        const data = await Service.find({'providerid':req.params.id});
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
//Get by ID Method
router.get('/getServiceByID/:id', async (req, res) => {
    try{
        const data = await Service.findById(req.params.id);
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Update by ID Method
router.patch('/updateService/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await Service.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//Delete by ID Method
router.delete('/deleteService/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Service.findByIdAndDelete(id)
        res.send(`Document with ${data.name} has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

module.exports = router