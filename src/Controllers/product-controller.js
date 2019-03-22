var Produto = require("../App/models/product");
var mongoose = require('mongoose');


exports.post = (req, res) => {
    var produto = new Produto();
    produto.nome = req.body.nome;
    produto.preco = req.body.preco;
    produto.descricao = req.body.descricao;
    produto.categoria = req.body.categoria

    produto.save(function (error) {
        if (error)
            res.send("Erro ao tentar salvar produto" + error);

        res.status(201).json({ message: "produto inserido com sucesso" });

    });
}

exports.get = (req, res) => {
    Produto.find(function (err, prods) {
        if (err)
            req.send(err);
        res.status(200).json({
            produtos: prods
        });
    });

}

exports.getById = (req, res) => {
    var uid = req.params.uid
    Produto.findById(uid, function (err, prods) {
        if (err) {
            res.status(500).json(
                { message: "Erro ao encontrar produto, id invalido" }
            );
        }
        else if (produto == null) {
            res.status(400).json(
                {
                    message: "produto nao encontrado para o id passado"
                }
            );
        } else {
            res.status(200).json(
                { produtos: prods }
            );
        }
    });
}


exports.deletebyid=(req,res)=>{
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