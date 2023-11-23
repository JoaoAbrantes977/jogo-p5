class Button{
    constructor(){
      
      this.centroX=width*0.5;
      this.centroY=height*0.5;
      this.largura=width*0.13;
      this.altura=height*0.06;
      this.corBt="#e6c837";
      this.corBordaBt ="#ebeae6";
      this.tamTexto=width*0.015;
      this.corTexto=0;
      this.curva=width*0.008;
      this.conteudoTexto="Undefined";
    }
      
      draw_Button(){
    
      push();
      rectMode(CENTER);
      fill(this.corBt);
      stroke(this.corBordaBt);
      rect(this.centroX,this.centroY,this.largura,this.altura,this.curva);
      textAlign(CENTER,CENTER);
      textSize(this.tamTexto);
      fill(this.corTexto);
      text(this.conteudoTexto,this.centroX,this.centroY);
      pop();
    }
      on_Click(x,y){
        if(
      x > this.centroX - this.largura / 2 &&
      x < this.centroX + this.largura / 2 &&
      y > this.centroY - this.altura / 2 &&
      y < this.centroY + this.altura / 2){
      
      return true;
    }else{
      return false;
    }
    }
    on_Hover(x,y){
    
      if (
      x > this.centroX - this.largura / 2 &&
      x < this.centroX + this.largura / 2 &&
      y > this.centroY - this.altura / 2 &&
      y < this.centroY + this.altura / 2
    ) {
      return true;
    } else {
      return false;
    }
    }
  }

  class Text{
    constructor(){
      this.textX = width * 0.5;
      this.textY = height * 0.5;
      this.tamTexto = width*0.015 
      this.conteudoTexto = "Undefined"
    }
      
      draw_Text(){
    
      push();
      textAlign(CENTER, CENTER);
      textSize(this.tamTexto);
      text(this.conteudoTexto,this.textX,this.textY);
      pop();
    }
  }

  class Tile {
    constructor(x, y, tx, ty, s) {
      this.x = x;
      this.y = y;
      this.tx = tx;
      this.ty = ty;
      this.s = s;
      this.clr="darkgreen";
    }
  
    draw_Tile() {
      fill(this.clr)
      square(this.x, this.y, this.s);
    }
  
    click_Tile(x, y) {
      if (
        x > this.x &&
        x < this.x + this.s &&
        y > this.y &&
        y < this.y + this.s
      ) {
        return true;
      } else {
        return false;
      }
    }
  }

  function iniciar(){
    push();
    // INICIO LOGIN
    menuLoginButton = new Button();
    menuLoginButton.conteudoTexto="Login";
    menuLoginButton.centroX=width*0.43;
    menuLoginButton.centroY=height*0.87;
    
    menuRegistarButton = new Button();
    menuRegistarButton.conteudoTexto="Registar";
    menuRegistarButton.centroX=width*0.57;
    menuRegistarButton.centroY=height*0.87;
    
    textName = new Text();
    textName.conteudoTexto="Nome:";
    textName.textX=width*0.35;
    textName.textY=height*0.8;
  
    textPass = new Text();
    textPass.conteudoTexto="Password:";
    textPass.textX=width*0.55;
    textPass.textY=height*0.8;
  
    menuEntrarButton = new Button();
    menuEntrarButton.conteudoTexto="Entrar";
    menuEntrarButton.centroX=width*0.43;
    menuEntrarButton.centroY=height*0.87;
  
    menuVoltarButton = new Button();
    menuVoltarButton.conteudoTexto="Voltar";
    menuVoltarButton.centroX=width*0.57;
    menuVoltarButton.centroY=height*0.87;
  
    textGameName = new Text();
    textGameName.conteudoTexto="Game Name:";
    textGameName.textX=width*0.35;
    textGameName.textY=height*0.8;
    
    textFailLogin = new Text();
    textFailLogin.conteudoTexto="O nome ou password estão incorretos insira novamente os dados!!";
    textFailLogin.textX=width*0.5;
    textFailLogin.textY=height*0.75;
    
    textFailRegistar = new Text();
    textFailRegistar.conteudoTexto="O utilizador já está registado no sistema!!";
    textFailRegistar.textX=width*0.5;
    textFailRegistar.textY=height*0.75;
    
    // FIM LOGIN

    // INICIO SHOP

    campoBtn = new Button();
    campoBtn.conteudoTexto="Campo";
    campoBtn.centroX=width*0.07;
    campoBtn.centroY=height*0.05;
  
    galinhaBtn = new Button();
    galinhaBtn.conteudoTexto="Galinheiro";
    galinhaBtn.centroX=width*0.07;
    galinhaBtn.centroY=height*0.115;
  
    moinhoRaçaoBtn = new Button();
    moinhoRaçaoBtn.conteudoTexto="Moinho de Ração";
    moinhoRaçaoBtn.centroX=width*0.07;
    moinhoRaçaoBtn.centroY=height*0.18;
    
    pastelariaBtn = new Button();
    pastelariaBtn.conteudoTexto="Pastelaria";
    pastelariaBtn.centroX=width*0.07;
    pastelariaBtn.centroY=height*0.245;
    
    pipoqueiraBtn = new Button();
    pipoqueiraBtn.conteudoTexto="Pipoqueira";
    pipoqueiraBtn.centroX=width*0.07;
    pipoqueiraBtn.centroY=height*0.31;
    
    vacaBtn = new Button();
    vacaBtn.conteudoTexto="Vacaria";
    vacaBtn.centroX=width*0.07;
    vacaBtn.centroY=height*0.375;
    
    queijariaBtn = new Button();
    queijariaBtn.conteudoTexto="Queijaria";
    queijariaBtn.centroX=width*0.07;
    queijariaBtn.centroY=height*0.44;
    
    porcoBtn = new Button();
    porcoBtn.conteudoTexto="Curral";
    porcoBtn.centroX=width*0.07;
    porcoBtn.centroY=height*0.505;
    
    churrasqueiraBtn = new Button();
    churrasqueiraBtn.conteudoTexto="Churrasqueira";
    churrasqueiraBtn.centroX=width*0.07;
    churrasqueiraBtn.centroY=height*0.57;
    
    moinhoAçucarBtn = new Button();
    moinhoAçucarBtn.conteudoTexto="Moinho de Açúcar";
    moinhoAçucarBtn.centroX=width*0.07;
    moinhoAçucarBtn.centroY=height*0.635;

    shopBtn = new Button();
    shopBtn.conteudoTexto=" ";
    shopBtn.centroX=width*0.04;
    shopBtn.centroY=height*0.92;
    shopBtn.largura=width*0.07;
    shopBtn.altura=height*0.07;
    
    // FIM SHOP

    voltarCultivoBtn = new Button();
    voltarCultivoBtn.conteudoTexto="←";
    voltarCultivoBtn.centroX=width*0.95;
    voltarCultivoBtn.centroY=height*0.92;
    voltarCultivoBtn.largura=width*0.07;
    voltarCultivoBtn.altura=height*0.07;

    trigoBtn = new Button();
    trigoBtn.centroX=width*0.92;
    trigoBtn.centroY=height*0.05;

    milhoBtn = new Button();
    milhoBtn.centroX=width*0.92;
    milhoBtn.centroY=height*0.115;

    sojaBtn = new Button();
    sojaBtn.centroX=width*0.92;
    sojaBtn.centroY=height*0.18;

    canaAçucarBtn = new Button();
    canaAçucarBtn.centroX=width*0.92;
    canaAçucarBtn.centroY=height*0.245;
    
    
    pop();
  }