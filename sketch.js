var database;
var finished, finishedPlayers;
var playerCount, allPlayers;
var form, player, game;
var backgroundImage;
var invisibleGround, ground;
var mickeymouse, mickey_loadImg, mickey_createIma;
var minniemouse, minnie_loadImg, minnie_createImg;
var doraemon, doraemon_loadImg, doraemon_createImg;
var sonic, sonic_loadImg, sonic_createImg;
var jerry, jerry_loadImg, jerry_createImg;
var tom, tom_loadImg, tom_createImg;
var bunny, bunny_loadImg, bunny_createImg;
var chottabheem, bheem_loadImg, bheem_createImg;
var spider, spiderImg;
var mouse, mouseImg;
var i, obstaclesGroup;
var runners;
var goldMedalImg, silverMedalImg, bronzeMedalImg;
var distance = 0;
var gameState = 0;

function preload(){
    backgroundImg = loadImage("sprites/background.jpg");

    mickey_loadImg = loadImage("sprites/mickey.gif");
    doremon_loadImg = loadImage("sprites/doraemon.gif");
   sonic_loadImg = loadImage("sprites/sonic.png");
jerry_loadImg = loadImage("sprites/jerry.jpg");
 tom_loadImg = loadImage("sprites/tom.gif");
 bheem_loadImg = loadImage("sprites/chottabheem.png");
    spiderImg = loadImage("sprites/spider.png");
    mouseImg = loadImage("sprites/mouse.png");
    goldMedalImg = loadImage("sprites/gold.png");
    silverMedalImg = loadImage("sprites/silver.png");
    bronzeMedalImg = loadImage("sprites/bronze.png");
}

function setup(){
    createCanvas(displayWidth,displayHeight-165);
    database = firebase.database();

   // invisibleGround = createSprite(displayWidth/2,displayHeight-100,displayWidth,20);


    gameState = 0;
    distance = 0;
    finishedPlayers = 0;
    //obstaclesGroup = createGroup();

    game = new Game();
    game.getState();
    game.start();
}

function draw(){
    background(200,200,255);

    if (playerCount === 2 && finishedPlayers === 0){
        game.update(1);
    }
    
    if (gameState === 1) {
        game.play();
    }
    
    if (finishedPlayers === 2){
        game.update(2);
    }
    
    if (gameState === 2 && finishedPlayers === 2){
        game.displayRanks();
    }
}