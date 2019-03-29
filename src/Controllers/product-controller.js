var Produto = require("../App/models/product");
var mongoose = require('mongoose');
var repository = require('../repositories/produtct-repository');

exports.post = async (req, res) => {
    try {
        await repository.post({
            nome: req.body.nome,
            preco:req.body.preco,
            descricao: req.body.descricao
        });
        res.status(201).send({
            message:'Produto Cadastrado com sucesso!'
        });
    } catch (error) {
        consele.log(erro)
        res.status(500).send({
            message:'Falha ao processar sua requisicao'
        });
    }
}

exports.get = async (req, res) => {
   try {
       var data = await repository.get();
       res.status(200).send(data);
   } catch (error) {
       res.status(500).send({
           message:"Falha requisicao",
           erro:error
       });
   }

}

exports.getById = async (req, res) => {
   try {
       const id = req.params.produto
       var data = await repository.getById(id);
       res.status(200).send(data);
   } catch (error) {
    res.status(500).send({
        message:"Falha requisicao",
        erro:error
    });
   }
    
}


exports.deletebyid= async (req,res)=>{
    var deleteid = {adress:deleteid}
        Produto.deleteOne(deleteid,function(err,prods){
            if(err)
            req.send(err);
            res.status(200).json({
                message:"Produtos Deletedo.",
                //produtos:prods
            })  ;  
        });

}

exports.put = async (req,res) => {
    try {
        const id = req.params.productid;
        var data = await repository.put(id,req.body);
        res.status(200).send({
            message: "Produto atualizado"
        });
    } catch (error) {
        res.status(500).send({
            message:"Falha requisicao",
            erro:error
        });
    }
}
