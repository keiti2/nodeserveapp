import express from 'express';
import bodyParser from 'body-parser';

//configuracao mongoose
var mongoose = require('mongoose');

//persistencia
mongoose.connect('mongodb://localhost/bdcrud')

//------------------------

const app = express();

//Configuracao do server para usar body parser
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//Definindo a porta via arquivo de configuracao
var port=process.env.port || 3000;
app.get('/',(req,res) => res.send('hello') );

var indexRoute=require("./src/routes/index-routes")
var producRoute=require("./src/routes/product-routes")
var categoriaRoute=require("./src/routes/categoria-routes")


//Vincular a aplicacao (app) com o motor de rotas
app.use('/api',indexRoute);
//rotas para produtos/categoria;
app.use('/produtos',producRoute)
app.use('/categoria',categoriaRoute)
app.listen(3000,()=>{
    console.log('Server up and ruinning!');
});

