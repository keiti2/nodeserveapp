const express= require('express');
var router=express.Router();//interceptacao das rota.
var Produto = require("../App/models/product");


// rota de post produto
router.route('/produtos')
    .post(function(req,res){
        var produto = new Produto();
        produto.nome=req.body.nome;
        produto.preco =req.body.preco;
        produto.descricao=req.body.descricao;
        produto.categoria=req.body.categoria

        produto.save(function(error){
            if(error)
            res.send("Erro ao tentar salvar produto" + error);

            res.status(201).json({message:"produto inserido com sucesso"});

        });
    })

    //rota de get produto

router.route('/produtos')
.get(function(req,res){
        Produto.find(function(err,prods){
            if(err)
            req.send(err);

            res.status(200).json({
                produtos:prods
                
            })  ;  
        });

})

//rota de get by id  produto
router.route('/getbyid/:uid')
.get(function(req,res){
    var uid = req.params.uid
        Produto.findById(uid,function(err,prods){
            if(err){
                res.status(500).json(
                    {message:"Erro ao encontrar produto, id invalido"}
                );
                          }
            else if (produto==null){
              res.status(400).json(
                  {
                      message:"produto nao encontrado para o id passado"
                  }
              );
            }else{
                res.status(200).json(
                    {produtos:prods}
                );

            }
        

        });
})

//rota de delete produto
router.route('/produtos/delete/:deleteid')
.post(function(req,res){
    var deleteid = {adress:deleteid}
        Produto.deleteOne(deleteid,function(err,prods){
            if(err)
            req.send(err);

            res.status(200).json({
                message:"Produtos Deletedo.",
                //produtos:prods
            })  ;  
        });

})

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
