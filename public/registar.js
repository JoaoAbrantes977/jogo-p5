function menuRegistar(){
    push();
    if(!valid){
      textName.textX=width*0.28;
      textPass.textX=width*0.47;
      textGameName.textX=width*0.68;
      textName.draw_Text();
      textPass.draw_Text();
      textGameName.draw_Text();
      let inputWidth = width * 0.11;
      let inputHeight = height * 0.016;
      let inputNameX = width * 0.36 - inputWidth * 0.5;
      let inputY = height * 0.8 - inputHeight * 0.7;
      let inputPassX = width * 0.56 - inputWidth * 0.5;
      let inputGameNameX = width * 0.78 - inputWidth * 0.5;
      
      nameInput = createInput();
      nameInput.position(inputNameX, inputY);
      nameInput.size(inputWidth,inputHeight);
      passInput = createInput();
      passInput.position(inputPassX , inputY);
      passInput.size(inputWidth,inputHeight);
      gameNameInput = createInput();
      gameNameInput.position(inputGameNameX , inputY);
      gameNameInput.size(inputWidth,inputHeight);
      menuEntrarButton.conteudoTexto="Registar";
      valid = true;
    }
  
    menuEntrarButton.draw_Button();
    if(menuEntrarButton.on_Hover(mouseX,mouseY))
      menuEntrarButton.corBt="#998D51";
    else{
      menuEntrarButton.corBt="#e6c837";
    }
    
    menuVoltarButton.draw_Button();
    if(menuVoltarButton.on_Hover(mouseX,mouseY))
      menuVoltarButton.corBt="#998D51";
    else{
      menuVoltarButton.corBt="#e6c837";
    }
    pop();
  }

  function registarPost(){

    let name = nameInput.value();
    let pass = passInput.value();
    let gameName = gameNameInput.value();
    
    let user = {
        "name":name,
        "pass":pass, 
        "gameName":gameName
    }
    
    httpPost('/register',user,'json',(respostaServidor)=>{
      
      console.log(respostaServidor);
    if(respostaServidor.ack==0){
      imagem();
      textFailRegistar.conteudoTexto="Utilizador já registado e a password tem de ser maior que 8 caracteres!!";
      textFailRegistar.draw_Text();
    }else if(respostaServidor.ack==1){
      imagem();
      textFailRegistar.conteudoTexto="Utilizador já está registado no sistema!!";
      textFailRegistar.draw_Text();
    }else if(respostaServidor.ack==2){
      imagem();
      textFailRegistar.conteudoTexto="A password deve ser maior que 8 caracteres!!";
      textFailRegistar.draw_Text();
    
      }else{
       scene=1
       imagem();
       removeElements();
       textFailLogin.conteudoTexto="Registado com sucesso, pode fazer Login!!"
       textFailLogin.draw_Text();
       valid = false;
    
      }
    
    });
    
    }