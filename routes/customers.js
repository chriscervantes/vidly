const auth = require('../middleware/auth');
const {Customer, validate} = require('../models/customer');
const express = require('express');
const router = express.Router();

router.get('/',async (req,res) => {
    const customer = await Customer.find().sort('name');
    res.send(customer);
});

router.post('/',auth, async(req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
  
    let customer = new Customer({
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold });
    customer = await customer.save();
    
  //genres.push(genre);
    res.send(customer);
  });

  router.put('/:id', async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
  
    const customer = await Customer.findByIdAndUpdate(req.params.id,{name: req.body.name},{new: true});
  
    //const genre = genres.find(c => c.id === parseInt(req.params.id));
    if (!customer) return res.status(404).send('The customer with the given ID was not found.');
  
    customer.name = req.body.name; 
    customer.phone = req.body.phone;
    customer.isGold = req.body.isGold;
    res.send(customer);
  });
  
  router.delete('/:id', async(req, res) => {
    const customer = await Customer.findByIdAndRemove(req.params.id);
  
    //const genre = genres.find(c => c.id === parseInt(req.params.id));
    if (!customer) return res.status(404).send('The customer with the given ID was not found.');
  
    //const index = genres.indexOf(genre);
    //genres.splice(index, 1);
  
    res.send(customer);
  });
  
  router.get('/:id', async(req, res) => {
    const customer = await Customer.findById(req.params.id);
    //const genre = genres.find(c => c.id === parseInt(req.params.id));
    if (!customer) return res.status(404).send('The customer with the given ID was not found.');
    res.send(customer);
  });

  

module.exports = router;