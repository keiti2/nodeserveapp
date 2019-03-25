var Produto = require('../app/models/product');
var mongoose = require('mongoose');

exposts.get = async () => {
    const res = await Produto.find();
    return res;
}

exposts.getById = async (id) => {
    const res = await Produto.findById(id);
    return res;
}

exports.puts = async (id, data) => {
    await Produto.findByIdAndUpdate(id, {
        $set: {
            nome: data.nome,
            preco: data.preco,
            descricao: data.descricao
        }
    }
    );
}


exports.post = async (data) => {
    try {
       var produto = new Produto(data)
       await product.save();

        res.status(200).send({
            message: "Produto Cadastrado"
        });
    } catch (error) {
        res.status(500).send({
            message:"Falha requisicao",
            erro:error
        });
    }
}


exposts.delete = async (id) => {
    await Produto.findOneAndRemove(id);
}