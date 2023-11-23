  function menuLogin(){
    push();
    if(!valid){
      textName.textX=width*0.35;
      textPass.textX=width*0.55;
      textName.draw_Text();
      textPass.draw_Text();
      let inputWidth = width * 0.11;
      let inputHeight = height * 0.016;
      let inputNameX = width * 0.43 - inputWidth * 0.5;
      let inputY = height * 0.8 - inputHeight * 0.7;
      let inputPassX = width * 0.64 - inputWidth * 0.5;
      
      nameInput = createInput();
      nameInput.position(inputNameX, inputY);
      nameInput.size(inputWidth,inputHeight);
      passInput = createInput();
      passInput.position(inputPassX , inputY);
      passInput.size(inputWidth,inputHeight);
      valid = true;
      menuEntrarButton.conteudoTexto="Entrar";
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

function menuPrincipal(){
    push();
    menuLoginButton.draw_Button();
    if(menuLoginButton.on_Hover(mouseX,mouseY))
      menuLoginButton.corBt="#998D51";
    else{
      menuLoginButton.corBt="#e6c837";
    }
  
    menuRegistarButton.draw_Button();
    if(menuRegistarButton.on_Hover(mouseX,mouseY))
      menuRegistarButton.corBt="#998D51";
    else{
      menuRegistarButton.corBt="#e6c837";
    }
    pop();
  }

  function loginPost(){

    let name = nameInput.value();
    let pass = passInput.value();
  
    let user = {
      "name":name,
      "pass":pass      
    }
  
    httpPost('/login',user,'json',(respostaServidor)=>{
    if(respostaServidor.length>0){
     userServidor = respostaServidor;
     
     loadJSON('/getBuildings/'+userServidor[0].id,(resposta)=>{
  
      buildingsPlayer=resposta;
      console.log(buildingsPlayer);
      
      removeElements();
      scene=3;
  
      loop();
  
     });
     loadJSON('/getPlayerXP/'+userServidor[0].id,(resposta)=>{
  
      playerXP=resposta;
      console.log(playerXP);

     });
  
     }else{
     imagem();
     removeElements();
     textFailLogin.conteudoTexto="O nome ou password estão incorretos insira novamente os dados!!";
     textFailLogin.draw_Text();
     valid = false;
  
    }
  
    }
    );
  }