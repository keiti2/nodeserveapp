import express from 'express';
import bodyParser from 'body-parser';

//configuracao mongoose
var mongoose = require('mongoose');
var Produto = require('./App/models/product');
var Categoria = require('./App/models/categoria');

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

// rota de post produto
router.route('/Produtos')
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


//Vincular a aplicacao (app) com o motor de rotas
app.use('/api',router);

app.listen(3000,()=>{
    console.log('Server up and ruinning!');
});

