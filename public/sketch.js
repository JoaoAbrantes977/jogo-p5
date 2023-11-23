let img; 
let scene=0;
let valid=false;
/* scene 0 = Menu principal onde tem o botão Login e Registar
scene 1 = menu de login, onde inseres os dados
scene 2 = menu de registar, onde te registas
scene 3 = menu principal do jogo, aqui vê-se a grid, máquinas, campos etc
scene 4 = shop menu
scene 5 = cultivo menu
scene 6 = menu de craft de máquinas, se possivel ser uma class e consoante o que apresenta na base de dados mostra diferentes coisas
scene 7 = menu de mercado */

// para criar um botao ir a funçao iniciar, depos o botao.draw_button e adiciona-lo a funcao mousePressed

//AUTHENTICATION VARIABLES---
 let nameInput; 
 let passInput;
 let gameNameInput;
//---------------------------

let userServidor;
let board = [];
let typeB;
let boardClicable=false;
let buildingsPlayer;
let shopValid=false;
let validShopArray = [];
let sementesValid=false;
let countByType = {};
let countCampo = 0;
let countCampoValid = 0;

let lvl1 = 675;
let lvl2 = 2040;
let lvl3 = 4270;
let lvl4 = 6520;
let lvl5 = 10485;
let lvl6 = 13150;
let lvl7 = 20020;
let lvl8 = 26220;

function preload(){
  img=loadImage('LogoJogoWeb.jpg');
  imgShopIcon=loadImage('shopIcon.png');
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  imagem();
  iniciar();
  create_Board();
}

function mousePressed(x,y){
  if(menuLoginButton.on_Click(mouseX,mouseY) && (scene==0)){
    scene=1;
    console.log("Entrou Login")
  }else if(menuRegistarButton.on_Click(mouseX,mouseY) && (scene==0)){
    scene=2;
    console.log("Entrou Registar")
  }else if(menuEntrarButton.on_Click(mouseX,mouseY) && (scene==1)){
    loginPost();
    console.log("Jogo")
  }else if(menuVoltarButton.on_Click(mouseX,mouseY) && (scene==1)){
    imagem();
    removeElements();
    scene=0;
    console.log("Voltou")
  }else if(menuEntrarButton.on_Click(mouseX,mouseY) && (scene==2)){
    registarPost();
    console.log("Registou e entrou")
  }else if(menuVoltarButton.on_Click(mouseX,mouseY) && (scene==2)){
    imagem();
    removeElements();
    scene=0
    console.log("Voltou")
  }else if(shopBtn.on_Click(mouseX,mouseY) && (shopValid==false)){
    scene = 4;
    shopValid=true;
    console.log("Entrou na Shop")
  }else if(shopBtn.on_Click(mouseX,mouseY) && (shopValid==true)){
    scene = 3;
    shopValid = false;
    console.log("Saiu na Shop")
  }else if(campoBtn.on_Click(mouseX,mouseY) && (scene==4)){
    if (
      (playerXP[0].Xp < lvl1 && countCampo === 4) ||
      (playerXP[0].Xp < lvl2 && countCampo === 6) ||
      (playerXP[0].Xp < lvl3 && countCampo === 8) ||
      (playerXP[0].Xp < lvl4 && countCampo === 10) ||
      (playerXP[0].Xp < lvl5 && countCampo === 12) ||
      (playerXP[0].Xp < lvl6 && countCampo === 14) ||
      (playerXP[0].Xp < lvl7 && countCampo === 16) ||
      (playerXP[0].Xp < lvl8 && countCampo === 20)
    ) {
      boardClicable = false;
    } else {
      boardClicable = true;
      typeB=campoBtn.conteudoTexto;
    }
  
  }else if(galinhaBtn.on_Click(mouseX,mouseY) && (scene==4)){
    if("Galinheiro" in countByType){
      boardClicable=false;
      console.log("boardClicable - " + boardClicable)
    }else {
      typeB=galinhaBtn.conteudoTexto;
      boardClicable=true;
      console.log("boardClicable - " + boardClicable)
    }
  }else if(moinhoRaçaoBtn.on_Click(mouseX,mouseY) && (scene==4)){
    if("Moinho de Ração" in countByType){
      boardClicable=false;
    }else {
      typeB=moinhoRaçaoBtn.conteudoTexto;
      boardClicable=true;
    }
  }else if(pastelariaBtn.on_Click(mouseX,mouseY) && (scene==4)){
    if("Pastelaria" in countByType){
      boardClicable=false;
    }else {
      typeB=pastelariaBtn.conteudoTexto;
      boardClicable=true;
    }
  }else if(pipoqueiraBtn.on_Click(mouseX,mouseY) && (scene==4)){
    if("Pipoqueira" in countByType){
      boardClicable=false;
    }else {
      typeB=pipoqueiraBtn.conteudoTexto;
      boardClicable=true;
    }
  }else if(vacaBtn.on_Click(mouseX,mouseY) && (scene==4)){
    if("Vacaria" in countByType){
      boardClicable=false;
    }else {
      typeB=vacaBtn.conteudoTexto;
      boardClicable=true;
    }
  }else if(queijariaBtn.on_Click(mouseX,mouseY) && (scene==4)){
    if("Queijaria" in countByType){
      boardClicable=false;
    }else {
      typeB=queijariaBtn.conteudoTexto;
      boardClicable=true;
    }
  }else if(porcoBtn.on_Click(mouseX,mouseY) && (scene==4)){
    if("Curral" in countByType){
      boardClicable=false;
    }else {
      typeB=porcoBtn.conteudoTexto;
      boardClicable=true;
    }
  }else if(churrasqueiraBtn.on_Click(mouseX,mouseY) && (scene==4)){
    if("Churrasqueira" in countByType){
      boardClicable=false;
    }else {
      typeB=churrasqueiraBtn.conteudoTexto;
      boardClicable=true;
    }
  }else if(moinhoAçucarBtn.on_Click(mouseX,mouseY) && (scene==4)){
    if("Moinho de Açúcar" in countByType){
      boardClicable=false;
    }else {
      typeB=moinhoAçucarBtn.conteudoTexto;
      boardClicable=true;
    }
  }else if(voltarCultivoBtn.on_Click(mouseX,mouseY) && (scene==5)){
    scene = 3;
    shopValid = false;
    console.log("Saiu do cultivo")
  }

  if (scene==3){
      
    loadJSON('/getBuildings/'+userServidor[0].id,(resposta)=>{

      buildingsPlayer=resposta;
      console.log(buildingsPlayer);
      
      });
   
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j].click_Tile(mouseX, mouseY)) {
          // verificar se o tile clicado corresponde a um tile de um utilizador
          for (let k = 0; k < buildingsPlayer.length; k++) {
            if(board[i][j].tx === buildingsPlayer[k].posX &&
              board[i][j].ty === buildingsPlayer[k].posY &&
              buildingsPlayer[k].type == "Campo"){
              //guarda i j e ao clicar no "trigo" envia para a BD o craft
              scene=5;
              sementesValid=true;
            }
          }
        }
      }
    }
  }
  
  let validShopBuilding;
  if((boardClicable) && (scene==4)){
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j].click_Tile(mouseX, mouseY)) {
          console.log(board[i][j].tx + ";" + board[i][j].ty);
          for (let k = 0; k < buildingsPlayer.length; k++) {
            if (
              board[i][j].tx === buildingsPlayer[k].posX &&
              board[i][j].ty === buildingsPlayer[k].posY &&
              (buildingsPlayer[k].type == "Campo" ||
              buildingsPlayer[k].type == "Galinheiro" || 
              buildingsPlayer[k].type == "Moinho de Ração"|| 
              buildingsPlayer[k].type == "Pastelaria"|| 
              buildingsPlayer[k].type == "Pipoqueira"|| 
              buildingsPlayer[k].type == "Vacaria"|| 
              buildingsPlayer[k].type == "Queijaria"|| 
              buildingsPlayer[k].type == "Curral"|| 
              buildingsPlayer[k].type == "Churrasqueira"|| 
              buildingsPlayer[k].type == "Moinho de Açúcar")
            ) {
              //console.log("Entrei na house ou farm");
              validShopBuilding = false;
              break; 
              } else {
                //console.log("Vazio");
                if (!verificaCoordenadas(i, j)) {
                  let coordenadas = [i, j];
                  validShopArray.push(coordenadas);
                  console.log("Adicionei coordenadas:", coordenadas);
                  validI = i;
                  validJ = j;
                  validShopBuilding = true;
                  boardClicable = false;
                
                } else {
                  //console.log("Coordenadas já existem:", [i, j]);
                }
              }
            }
          }
        }
      }
    }
  if (validShopBuilding == true){
    let building ={
      "id_Player":userServidor[0].id,
      "typeB":typeB,
      "posX":validI,
      "posY":validJ
    }

    httpPost('/insertBuilding',building,'json',(resposta)=>{

      if (typeB=="Campo"){
        board[validI][validJ].clr="#e6ca83";
      }else if(typeB=="Galinheiro"){
        board[validI][validJ].clr="#a87532"; 
      }else if (typeB=="Moinho de Ração"){
        board[validI][validJ].clr="#a84432";
      }else if (typeB=="Pastelaria"){
        board[validI][validJ].clr="#a88932";
      }else if (typeB=="Pipoqueira"){
        board[validI][validJ].clr="#cacc45";
      }else if (typeB=="Vacaria"){
        board[validI][validJ].clr="#3b3a45";
      }else if (typeB=="Queijaria"){
        board[validI][validJ].clr="#817e96";
      }else if (typeB=="Curral"){
        board[validI][validJ].clr="#d15cc7";
      }else if (typeB=="Churrasqueira"){
        board[validI][validJ].clr="#bd3592";
      }else if (typeB=="Moinho de Açúcar"){
        board[validI][validJ].clr="#42db5b";
      }

      loop()
    });
  }

  //colher e enviar para a bd as sementes
  /*if((boardClicable) && (scene==4)){
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j].click_Tile(mouseX, mouseY)) {
          console.log(board[i][j].tx + ";" + board[i][j].ty);
          for (let k = 0; k < buildingsPlayer.length; k++) {
            if (
              board[i][j].tx === buildingsPlayer[k].posX &&
              board[i][j].ty === buildingsPlayer[k].posY &&
              (buildingsPlayer[k].type == "Campo" ||
              buildingsPlayer[k].type == "Galinheiro" || 
              buildingsPlayer[k].type == "Moinho de Ração"|| 
              buildingsPlayer[k].type == "Pastelaria"|| 
              buildingsPlayer[k].type == "Pipoqueira"|| 
              buildingsPlayer[k].type == "Vacaria"|| 
              buildingsPlayer[k].type == "Queijaria"|| 
              buildingsPlayer[k].type == "Curral"|| 
              buildingsPlayer[k].type == "Churrasqueira"|| 
              buildingsPlayer[k].type == "Moinho de Açúcar")
            ) {
              //console.log("Entrei na house ou farm");
              validShopBuilding = false;
              break; 
              } else {
                //console.log("Vazio");
                if (!verificaCoordenadas(i, j)) {
                  let coordenadas = [i, j];
                  validShopArray.push(coordenadas);
                  console.log("Adicionei coordenadas:", coordenadas);
                  validI = i;
                  validJ = j;
                  validShopBuilding = true;
                  boardClicable = false;
                
                } else {
                  //console.log("Coordenadas já existem:", [i, j]);
                }
              }
            }
          }
        }
      }
    }*/
}

function verificaCoordenadas(i,j){
  return validShopArray.some(coordenadas => coordenadas[0] === i && coordenadas[1] === j);
}

function draw() {
  if(scene==0){
    menuPrincipal();
    console.log("Entrou principal")
  }else if(scene==1){
    menuLogin();
    console.log("Entrou login")
  }else if(scene==2){
    menuRegistar();
    console.log("Entrou Registar")
  }else if(scene==3){
    gameScene();
    console.log("Entrou Jogo")
  }else if(scene==4){
    shop();
    //console.log("Entrou shop")
  }else if(scene==5){
    cultivo();
    console.log("Entrou cultivo")
  }
}

function imagem(){
  background(255);
  imageMode(CENTER);
  image(img,width*0.5,height*0.4,width*0.7,height*0.7);
  valid=false;
}

function shop(){
  draw_Board();
  shopBtn.draw_Button();
  
  imageMode(CENTER); 
  image(imgShopIcon,width*0.04,height*0.92,width*0.07,height*0.07);

  loadJSON('/getBuildings/'+userServidor[0].id,(resposta)=>{

    buildingsPlayer = resposta;
    //console.log(buildingsPlayer)
  
  });

    buildingsPlayer.forEach(edificio => {
      if (edificio.type in countByType) {
          countByType[edificio.type]++;
      } else {
          countByType[edificio.type] = 1;
      }
    
  });

  if (countByType['Galinheiro']) {
    galinhaBtn.corBt="#e67737";
  }if (countByType['Moinho de Ração']) {
    moinhoRaçaoBtn.corBt="#e67737";
  }if (countByType['Pastelaria']) {
    pastelariaBtn.corBt="#e67737";
  }if (countByType['Pipoqueira']) {
    pipoqueiraBtn.corBt="#e67737";
  }if (countByType['Vacaria']) {
    vacaBtn.corBt="#e67737";
  }if (countByType['Queijaria']) {
    queijariaBtn.corBt="#e67737";
  }if (countByType['Curral']) {
    porcoBtn.corBt="#e67737";
  }if (countByType['Churrasqueira']) {
    churrasqueiraBtn.corBt="#e67737";
  }if (countByType['Moinho de Açúcar']) {
    moinhoAçucarBtn.corBt="#e67737";
  }
  
  countCampo = 0;
  for (let i = 0; i < buildingsPlayer.length; i++) {
    if (buildingsPlayer[i].type === 'Campo') {
      countCampo++;
    }
  }
  
  countCampoValid = countCampo;
  if (
    (playerXP[0].Xp < lvl1 && countCampo === 4) ||
    (playerXP[0].Xp < lvl2 && countCampo === 6) ||
    (playerXP[0].Xp < lvl3 && countCampo === 8) ||
    (playerXP[0].Xp < lvl4 && countCampo === 10) ||
    (playerXP[0].Xp < lvl5 && countCampo === 12) ||
    (playerXP[0].Xp < lvl6 && countCampo === 14) ||
    (playerXP[0].Xp < lvl7 && countCampo === 16) ||
    (playerXP[0].Xp < lvl8 && countCampo === 20)
  ) {
    campoBtn.corBt = "#e67737";
  } else {
    campoBtn.corBt = "#e6c837";
  }
  //add uma verificação para quando subir de nivel atualizar aqui com um if
  if(playerXP[0].Xp < lvl1){
    //console.log("tem de ganhar mais xp para aparecer estes botoes")
    //aqui so vai poder fazer missoes de trigo e milho
  }if(playerXP[0].Xp >= lvl1){
    campoBtn.draw_Button();
    galinhaBtn.draw_Button();
    moinhoRaçaoBtn.draw_Button();
    pastelariaBtn.draw_Button();
  }if(playerXP[0].Xp >= lvl2){
    pipoqueiraBtn.draw_Button();
  }if(playerXP[0].Xp >= lvl3){
    vacaBtn.draw_Button();
    queijariaBtn.draw_Button();
  }if(playerXP[0].Xp >= lvl4){
    //Não desbloqueia nada na shop
  }if(playerXP[0].Xp >= lvl5){
    porcoBtn.draw_Button();
    churrasqueiraBtn.draw_Button();
  }if(playerXP[0].Xp >= lvl6){
    //Não desbloqueia nada na shop
  }if(playerXP[0].Xp >= lvl7){
    moinhoAçucarBtn.draw_Button();
  }if(playerXP[0].Xp >= lvl8){
    //Não desbloqueia nada na shop
  }

} 

function cultivo(){
  draw_Board();
  shopBtn.draw_Button();

  if (sementesValid){
    loadJSON('/getPlayerSementes/'+userServidor[0].id,(resposta)=>{

    playerSementes=resposta;

    playerSementes.forEach(item => {
      switch (item.item) {
          case "Trigo":
              trigoBtn.conteudoTexto = item.quantidade + " Trigo";
              break;
          case "Milho":
              milhoBtn.conteudoTexto = item.quantidade + " Milho";
              break;
          case "Soja":
              sojaBtn.conteudoTexto = item.quantidade + " Soja";
              break;
          case "Cana de Açúcar":
              canaAçucarBtn.conteudoTexto = item.quantidade + " Cana de Açúcar";
              break;
      }
    });

  });
  sementesValid=false;
  }
    
  voltarCultivoBtn.draw_Button();
  //if para receber da base de dados a quantidade de trigo, milho, etc etc etc e alterar o text do button para "Trigo - 10" por exemplo, 10 vem da base de dados
  
  trigoBtn.draw_Button();
  milhoBtn.draw_Button();
  sojaBtn.draw_Button();
  canaAçucarBtn.draw_Button();

  imageMode(CENTER); 
  image(imgShopIcon,width*0.04,height*0.92,width*0.07,height*0.07);
} 

function gameScene(){
  draw_Board();
  /*for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j].click_Tile(mouseX, mouseY)) {
        //console.log(board[i][j].tx + ";" + board[i][j].ty);
        // verificar se o tile clicado corresponde a um tile de um utilizador
        for (let k = 0; k < buildingsPlayer.length; k++) {
          if(board[i][j].tx === buildingsPlayer[k].posX &&
            board[i][j].ty === buildingsPlayer[k].posY &&
            buildingsPlayer[k].type == "Campo"){
            //guarda i j e ao clicar no "trigo" envia para a BD o craft
            cultivo();
          }else if (
            board[i][j].tx === buildingsPlayer[k].posX &&
            board[i][j].ty === buildingsPlayer[k].posY &&
            buildingsPlayer[k].type == "Galinheiro") {
            //aqui vai mostra o HUD de craft
          }else if(board[i][j].tx === buildingsPlayer[k].posX &&
            board[i][j].ty === buildingsPlayer[k].posY &&
            buildingsPlayer[k].type == "Moinho de Ração"){
            //aqui vai mostra o HUD de craft
          }else if(board[i][j].tx === buildingsPlayer[k].posX &&
            board[i][j].ty === buildingsPlayer[k].posY &&
            buildingsPlayer[k].type == "Pastelaria"){
            //aqui vai mostra o HUD de craft
          }else if(board[i][j].tx === buildingsPlayer[k].posX &&
            board[i][j].ty === buildingsPlayer[k].posY &&
            buildingsPlayer[k].type == "Pipoqueira"){
            //aqui vai mostra o HUD de craft
          }else if(board[i][j].tx === buildingsPlayer[k].posX &&
            board[i][j].ty === buildingsPlayer[k].posY &&
            buildingsPlayer[k].type == "Vacaria"){
            //aqui vai mostra o HUD de craft
          }else if(board[i][j].tx === buildingsPlayer[k].posX &&
            board[i][j].ty === buildingsPlayer[k].posY &&
            buildingsPlayer[k].type == "Queijaria"){
            //aqui vai mostra o HUD de craft
          }else if(board[i][j].tx === buildingsPlayer[k].posX &&
            board[i][j].ty === buildingsPlayer[k].posY &&
            buildingsPlayer[k].type == "Curral"){
            //aqui vai mostra o HUD de craft
          }else if(board[i][j].tx === buildingsPlayer[k].posX &&
            board[i][j].ty === buildingsPlayer[k].posY &&
            buildingsPlayer[k].type == "Churrasqueira"){
            //aqui vai mostra o HUD de craft
          }else if(board[i][j].tx === buildingsPlayer[k].posX &&
            board[i][j].ty === buildingsPlayer[k].posY &&
            buildingsPlayer[k].type == "Moinho de Açúcar"){
            //aqui vai mostra o HUD de craft
          }
        }
      }
    }
  }*/
  shopBtn.draw_Button();
  imageMode(CENTER); 
  image(imgShopIcon,width*0.04,height*0.92,width*0.07,height*0.07);
}

function draw_Board() {

  for(let i=0;i<buildingsPlayer.length;i++){
    if (buildingsPlayer[i].type=="Campo") {
      board[buildingsPlayer[i].posX][buildingsPlayer[i].posY].clr="#e6ca83";
    }else if(buildingsPlayer[i].type=="Galinheiro"){
     board[buildingsPlayer[i].posX][buildingsPlayer[i].posY].clr="#a87532";
    }else if (buildingsPlayer[i].type=="Moinho de Ração") {
      board[buildingsPlayer[i].posX][buildingsPlayer[i].posY].clr="#a84432";
    }else if (buildingsPlayer[i].type=="Pastelaria") {
      board[buildingsPlayer[i].posX][buildingsPlayer[i].posY].clr="#a88932";
    }else if (buildingsPlayer[i].type=="Pipoqueira") {
      board[buildingsPlayer[i].posX][buildingsPlayer[i].posY].clr="#cacc45";
    }else if (buildingsPlayer[i].type=="Vacaria") {
      board[buildingsPlayer[i].posX][buildingsPlayer[i].posY].clr="#3b3a45";
    }else if (buildingsPlayer[i].type=="Queijaria") {
      board[buildingsPlayer[i].posX][buildingsPlayer[i].posY].clr="#817e96";
    }else if (buildingsPlayer[i].type=="Curral") {
      board[buildingsPlayer[i].posX][buildingsPlayer[i].posY].clr="#d15cc7";
    }else if (buildingsPlayer[i].type=="Churrasqueira") {
      board[buildingsPlayer[i].posX][buildingsPlayer[i].posY].clr="#bd3592";
    }else if (buildingsPlayer[i].type=="Moinho de Açúcar") {
      board[buildingsPlayer[i].posX][buildingsPlayer[i].posY].clr="#42db5b";
    }
  }

  background(255);
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      board[i][j].draw_Tile();
    }
  }
}

function create_Board() {
  let i = 0;
  let j = 0;
  
  let initialPosX=width*0.15;
  let initialPosY=height*0.01;
  let nTiles=10;
  let size = windowHeight*0.095;
  let sizeTile=size;
  let boardSizeX=initialPosX+(nTiles+5)*size;
  let boardSizeY=initialPosY+nTiles*size;

  for (let x = initialPosX; x < boardSizeX; x += sizeTile) {
    board[i] = [];
    for (let y = initialPosY; y < boardSizeY; y += sizeTile) {
      board[i][j] = new Tile(x, y, i, j, size);
      j++;
    }
    j = 0;
    i++;
  }
}