const express = require('express');
const Item = require('./item');

const router = express.Router();


//Render list of shopping items
router.get('', (req, res,next) =>{
    try{
        return res.json({items: Item.findAll()});
    }catch(err){
        return next(err);
    }
});

//Accept json and add to shopping list
router.post('', (req, res, next) => {
    try{
        let newItem = new Item(req.body.name, req.body.price);
        return res.json({item: newItem});
    }catch(err){
        return next(err);
    }
});

//Display a single item
router.get('/:name', (req, res, next) =>{
    try{
        let selectedItem = Item.find(req.params.name);
        return res.json({item:selectedItem});
    }catch(err){
       return next(err);
    }
});

//Modify a single item
router.patch('/:name', (req, res, next) =>{
    try{
        let selectedItem = Item.update(req.params.name, req.body);
        return res.json({item:selectedItem});
    }catch(err){
       return next(err);
    }
});

//Delete specific item
router.delete('/:name', (req, res, next) =>{
    try{
        Item.remove(req.params.name);
        return res.json({msg:'Item Deleted'});
    }catch(err){
       return next(err);
    }
});

module.exports = router;