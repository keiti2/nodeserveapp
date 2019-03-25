const express= require('express');
var router=express.Router();//interceptacao das rota.
var Produto = require("../App/models/product");
const controller = require ('../Controllers/product-controller');

// rota de post produto
router.post("/",controller.post);

    //rota de get produto

router.get("/",controller.get);

//rota de get by id  produto
router.get('/:id',controller.getById);


//rota de delete produto
router.post('/:id',controller.deletebyid);


//rota put produto
router.put('/put:id');


module.exports=router;
