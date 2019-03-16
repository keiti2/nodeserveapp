var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var produtoSchema = new Schema ({
    nomecategoria:String,
    descricao:String
});

module.exports=mongoose.model('Categoria',produtoSchema);
