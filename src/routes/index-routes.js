const express= require('express');
var router=express.Router();//interceptacao das rota.

//MiddLeware
router.use(function(req,res,next){
    //Aqui oderao ser implementadas rotinas de 
    //logs,validacoes,autenticacao.
    console.log("Interceptação pelo Middleware");
    next();
});

router.get('/',
(req,res)=>res.json({'message':'rota teste ok'}));

module.exports=router;

