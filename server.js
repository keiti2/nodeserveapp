import express from 'express';
import bodyParser from 'body-parser';

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

//Vincular a aplicacao (app) com o motor de rotas
app.use('/api',router);

app.listen(3000,()=>{
    console.log('Server up and ruinning!');
});

