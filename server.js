import express from 'express';
import bodyParser from 'body-parser';
//configuracao mongoose
var mongoose = require('mongoose');
var Produto = require('./App/models/product');

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


//Definindo Rotas
var router = express.Router();// intercepta todas as rotas

//MiddLeware
router.use(function(req,res,next){
    //Aqui oderao ser implementadas rotinas de 
    //logs,validacoes,autenticacao.
    console.log("Interceptação pelo Middleware");
    next();
});

router.get('/',
(req,res)=>res.json({'message':'rota teste ok'}));
// rota de post
router.route('/Produtos')
    .post(function(req,res){
        var produto = new Produto();
        produto.nome=req.body.nome;
        produto.preco =req.body.preco;
        produto.descricao=req.body.descricao;

        produto.save(function(error){
            if(error)
            res.send("Erro ao tentar salvar produto" + error);

            res.status(201).json({message:"produto inserido com sucesso"});

        });
    })

    //rota de get 

router.route('/produtos')
.get(function(req,res){
        Produto.find(function(err,prods){
            if(err)
            req.send(err);

            res.status(200).json({
                message:"Produtos retornados.",
                produtos:prods
            })  ;  
        });

})

//rota de get by id 
router.route('/produtos/getbyid/:uid')
.get(function(req,res){
    var uid = req.params.uid
        Produto.findById(uid,function(err,prods){
            if(err)
             req.send(err);
            res.status(200).json({
                message:"Produto:" ,
                produtos:prods
            })  ;  
        });
})

//rota de delete
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

//rota put
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

//Vincular a aplicacao (app) com o motor de rotas
app.use('/api',router);

app.listen(3000,()=>{
    console.log('Server up and ruinning!');
});

