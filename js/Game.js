class Game{
  constructor(){
        
  }
        
  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
    gameState = data.val();
    });
  }
        
  update(state){
    database.ref('/').update({
      gameState: state
    });
  }
        
  async start(){
    if (gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if (playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }

      form = new Form()
      form.display();
    }      
  
    mickeymouse = createSprite(110,200,30,30);
    //mickeymouse.addImage(mickeymouseImg);

    doraemon = createSprite(110,250,30,30);
    //doraemon.addImage(doraemonImg);

    sonic = createSprite(110,300,30,30);
    //sonic.addImage(sonicImg);

    jerry = createSprite(110,350,30,30);
    //jerry.addImage(jerryImg);

    tom = createSprite(110,400,30,30);
    //tom.addImage(tomImg);

    bunny = createSprite(110,450,30,30);
    //bunny.addImage(bunnyImg);

    chottabheem = createSprite(110,500,30,30);
    //chottabheem.addImage(chottabheemImg);

    runners = [mickeymouse,doraemon,sonic,jerry,tom,bunny,chottabheem];
    finished = false;
  }
        
  play(){
    form.hide();
        
    Player.getPlayerInfo();
    player.getFinishedPlayers();
            
    if (allPlayers !== undefined){
      image(backgroundImg,0,displayHeight*4,displayWidth,displayHeight*5);
      //index of the array
      var index = 0;
      //x and y position of the cartoons
      var x=100;
      var y=70;
        
      for (var plr in allPlayers){  
        //add 1 to the index for every loop        
        index = index + 1 ;
                y = y+70;
                x = displayWidth + allPlayers[plr].distance ;

        
        runners[index-1].x = x;
        runners[index-1].y = y;
       

        if (index === player.index){
          runners[index-1].shapeColor = "red";
          camera.position.x = runners[index-1].x;
          camera.position.y = displayHeight/2;
        }
      }
    }

    if(keyIsDown(RIGHT_ARROW) && player.index !== null){
      player.distance +=20
      player.update();
    }

    if(player.distance > 2000){
      gameState = 2;
      console.log(gameState)
    }
   
    if (finished === false){
      Player.updateFinishedPlayers();
      player.place = finishedPlayers;
      player.update();
      finished = true;
    }

    drawSprites();
  }

  displayRanks(){      
    camera.position.y = 0;
    camera.position.x = 0;
  
    imageMode(CENTER);
  
    Player.getPlayerInfo();
  
    image(bronzeMedalImg,displayWidth/-4,-100+displayHeight/9,200,240);
    image(silverMedalImg,displayWidth/4,-100+displayHeight/10,225,270);
    image(goldMedalImg,0,-100,250,300);
  
    textAlign(CENTER);
    textSize(50);
    for (var plr in allPlayers){
      if (allPlayers[plr].place === 1){
        text("1st: "+allPlayers[plr].name,0,85);
      } else if (allPlayers[plr].place === 2){
        text("2nd: "+allPlayers[plr].name,displayWidth/4,displayHeight/9+73);
      } else if (allPlayers[plr].place === 3){
        text("3rd: "+allPlayers[plr].name,displayWidth/-4,displayHeight/10+76);
      } else {
        textSize(30);
        text("Honorable Mention: "+allPlayers[plr].name,0,225);
    }
  }
}
}