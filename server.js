const express = require('express')
var bodyParser = require('body-parser')

const mysql = require('mysql');

const app = express()
const port = 8080

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

//parse application/json
app.use(bodyParser.json())


app.use(express.static('public'))

//CODE FOR CONNECTION TO DATABASE
const dbase = mysql.createConnection({
host:"localhost",
port:"3306",
user:"root",
database:"TerraFertil",
});

dbase.connect(function(err){
if(err)throw err;

console.log("Database Connected!");

});


app.post('/login',(req,res)=>{

  let name = req.body.name;
  let pass = req.body.pass;

  let sql = "SELECT * FROM User WHERE Username='"+name+"' AND Password = '"+pass+"';"

  dbase.query(sql, (err,result)=>{
  if(err) throw err; 

    res.send(result);

  });

}); 
/*ack 0 nome já existe e pass < 8
ack 1 nome já exsite
ack 2 pass < 8
ack 3 fez login
*/
app.post('/register',(req,res)=>{

  let name = req.body.name;
  let pass = req.body.pass;
  let gameName = req.body.gameName;

  let sql = "SELECT * from User WHERE Username ='"+name+"';"

  dbase.query(sql, (err,result)=>{
  if(err) throw err; 
    if(gameName.length<5){
      gameName=name;
    }
    if((result.length>0) && (pass.length<8)){

      res.send({"ack":0})

    }else if(result.length>0){
    
      res.send({"ack":1})
    
    }else if(pass.length<8){

      res.send({"ack":2})

    }else{

      let sql = "INSERT INTO User (`Username`,`Password`,`GameName`) VALUES ('"+name+"','"+pass+"','"+gameName+"');";

        dbase.query(sql, (err,result)=>{
        if (err) throw err;

        // Obter o ID do usuário recém-inserido
        let userId = result.insertId;

        // Inserir registros na tabela "edificios" para o novo usuário
        for (let i = 1; i <= 2; i++) {
          for (let j = 1; j <= 2; j++) {
            let posX = i;
            let posY = j;
            let edificiosInsertSql = "INSERT INTO edificios (`id_Player`, `type`, `posX`, `posY`) VALUES (" + userId + ", 'Campo', " + posX + ", " + posY + ");";
            dbase.query(edificiosInsertSql, (err, edificiosResult) => {
              if (err) throw err;
            });
          }
        }

        let trigo = { item: "Trigo", quantidade: 4 };
        let milho = { item: "Milho", quantidade: 2 };
        let soja = { item: "Soja", quantidade: 0 };
        let canaDeAcucar = { item: "Cana de Açúcar", quantidade: 0 };

        let items = [trigo, milho, soja, canaDeAcucar];

        items.forEach(item => {
          let sementesInsertSql = `INSERT INTO celeiro (id_Player, item, quantidade) VALUES (${userId}, '${item.item}', ${item.quantidade});`;
          
          dbase.query(sementesInsertSql, (err, sementesResult) => {
              if (err) throw err;
              console.log(`Inserido ${item.item} com quantidade ${item.quantidade}`);
          });
      });

        res.send({ "ack": 3 });
      });

    }

  });

});

//-------------------------------------------------------------------------------------------------------//
// INSERIR BUILDINGS

app.post('/insertBuilding',(req,res)=>{

  console.log(req.body);

  let idPlayer = req.body.id_Player;
  let typeB = req.body.typeB;
  let posX = req.body.posX;
  let posY = req.body.posY;

  let sql = "INSERT INTO edificios (`id_Player`,`type`,`posX`,`posY`) VALUES ('"+idPlayer+"','"+typeB+"','"+posX+"','"+posY+"');";

    dbase.query(sql, (err,result)=>{
       if(err) throw err; 

        res.send(result);

    });

});

// OBTER BUILDINGS CONFORME O ID DO JOGADOR

app.get('/getBuildings/:id',(req,res)=>{

let id_Player=req.params.id;

let sql = "SELECT * FROM edificios WHERE id_Player='"+id_Player+"';"

    dbase.query(sql, (err,result)=>{
       if(err) throw err; 

        res.send(result);

    });


});

// OBTER XP CONFORME O ID DO JOGADOR

app.get('/getPlayerXP/:id',(req,res)=>{

  let id=req.params.id;
  
  let sql = "SELECT Xp FROM user WHERE id='"+id+"';"
  
      dbase.query(sql, (err,result)=>{
         if(err) throw err; 
  
          res.send(result);
  
      });
  
  });
  // OBTER BUILDINGS CONFORME O ID DO JOGADOR

  app.get('/getCrafts/:id',(req,res)=>{

    let id_Player=req.params.id;
    
    let sql = "SELECT * FROM craft WHERE id_Player='"+id_Player+"';"
    
      dbase.query(sql, (err,result)=>{
         if(err) throw err; 
  
          res.send(result);
  
      });
  
  
  });

  // OBTER ITENS NO CELEIRO

  app.get('/getPlayerSementes/:id',(req,res)=>{

    let id=req.params.id;
    
    let sql = "SELECT * FROM celeiro WHERE id_Player='"+id+"';"
    
        dbase.query(sql, (err,result)=>{
           if(err) throw err; 
    
            res.send(result);
    
        });
    
    });

  // INSERIR crafts campo

  app.post('/insertCraftingCampo',(req,res)=>{

    console.log(req.body);

    let idPlayer = req.body.id_Player;
    let item = req.body.item;
    let segundos_Falta = req.body.segundos_Falta;
    let typeB = req.body.typeB;
    let posX = req.body.posX;
    let posY = req.body.posY;

    let sql = "INSERT INTO craft (`id_Player`,`item`,`segundos_Falta`,`type`,`posX`,`posY`) VALUES ('"+idPlayer+"','"+item+"','"+segundos_Falta+"','"+typeB+"','"+posX+"','"+posY+"');";

      dbase.query(sql, (err,result)=>{
        if(err) throw err; 

          res.send(result);

      });

  });

  // UPDATE tempo
  function atualizarSegundos(){
    let sqlUpdate = "UPDATE craft SET segundos_Falta = CASE WHEN segundos_Falta > 0 THEN segundos_Falta - 1 ELSE 0 END;";

    dbase.query(sqlUpdate, (err, result) => {
      if (err) throw err;

      //console.log("Valor de segundos_Falta atualizado no banco de dados.");
    });  
  }

  setInterval(atualizarSegundos, 1000);

  //SEMEAR CAMPO
  app.post('/updateSemearSemente', (req, res) => {
    let item = req.body.item;

    let sqlSemear = "UPDATE celeiro SET quantidade = quantidade - 1 WHERE item = ('"+item+"');";

      dbase.query(sqlSemear, (err, result) => {
        if (err) throw err;
      });
  });

  //COLHER CAMPO
  app.post('/updateColherSemente', (req, res) => {
    let item = req.body.item;

    let sqlColher = "UPDATE celeiro SET quantidade = quantidade + 2 WHERE item = ('"+item+"');";

      dbase.query(sqlColher, (err, result) => {
        if (err) throw err;
      });
  });

  //ATUALIZAR CELEIRO
  app.post('/updateCeleiro', (req, res) => {
    let id_Craft = req.body.id_Craft;

    let sqlCeleiro = "UPDATE craft SET id_Player = '', item = '', segundos_Falta = '', type = '', posX = '', posY = '' WHERE id_Craft = ('"+id_Craft+"');";

      dbase.query(sqlCeleiro, (err, result) => {
        if (err) throw err;
      });
  });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})