const express= require('express');
var router=express.Router();//interceptacao das rota.
var Produto = require("../App/models/product");
const controller = require ('../Controllers/product-controller');

// rota de post produto
router.post("/",controller.post);

    //rota de get produto

router.get("/",controller.get);

//rota de get by id  produto
router.get('/:uid',controller.getById);


//rota de delete produto
router.post('/:deleteid',controller.deletebyid);


//rota put produto
router.route('/produtos/put/:id')
.put(function(req,res){
    const id = req.params.id;
        Produto.findByIdAndUpdate({_id:req.params.id},req.body,function(err,prods){
            if(err)
            req.send(err);

            res.status(200).json({
                message:"Produtos Atualizado.",
                produtos:prods
            })  ;  
        });
})

module.exports=router;
