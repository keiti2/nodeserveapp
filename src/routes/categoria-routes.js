const express= require('express');
var router=express.Router();//interceptacao das rota.
var Categoria = require("../App/models/categoria");


// Inicio categoria

// rota de post categoria
router.route('/Categoria')
    .post(function(req,res){
        var categoria = new Categoria();
        categoria.nomecategoria=req.body.nomecategoria;
        categoria.descricao=req.body.descricao;

        categoria.save(function(error){
            if(error)
            res.send("Erro ao tentar salvar Categoria" + error);

            res.status(201).json({message:"Categoria inserida com sucesso"});

        });
    })

    //rota de get categoria

router.route('/Categoria')
.get(function(req,res){
    Categoria.find(function(err,cate){
            if(err)
            req.send(err);

            res.status(200).json({
                categoria:cate
                
            })  ;  
        });

})

//rota de get by id  categoria
router.route('/Categoria/getbyid/:uid')
.get(function(req,res){
    var uid = req.params.uid
    Categoria.findById(uid,function(err,cate){
            if(err)
             req.send(err);
            res.status(200).json({
                message:"Categoria:" ,
                produtos:cate
            })  ;  
        });
})

//rota de delete categoria
router.route('/Categoria/delete/:deleteid')
.post(function(req,res){
    var deleteid = {adress:deleteid}
    Categoria.deleteOne(deleteid,function(err,prods){
            if(err)
            req.send(err);

            res.status(200).json({
                message:"Produtos Deletedo.",
            })  ;  
        });

})

//rota put categoria
router.route('/Categoria/put/:id')
.put(function(req,res){
    const id = req.params.id;
    Categoria.findByIdAndUpdate({_id:req.params.id},req.body,function(err,cate){
            if(err)
            req.send(err);

            res.status(200).json({
                message:"Produtos Atualizado.",
                categoria:cate
            })  ;  
        });
})

module.exports=router;