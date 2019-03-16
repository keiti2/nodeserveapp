var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var produtoSchema = new Schema ({
    nome:String,
    preco:String,
    descricao:String,
    categoria:String
});

module.exports=mongoose.model('Produto',produtoSchema);
