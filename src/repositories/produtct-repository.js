var Produto = require('../App/models/product');
var mongoose = require('mongoose');

exports.get = async () => {
    const res = await Produto.find();
    return res;
}

exports.getById = async (id) => {
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
    var produto = new Produto(data);
    await produto.save();
}


exports.delete = async (id) => {
    await Produto.findOneAndRemove(id);
}