
var charInterval ;
var passedcount = 0;

var switchInterval = 20;
var passedSwitchCount = 0;

var sceneImgArray = new Array();
var subSceneImgArray = new Array();
var subSceneCount = 0;
var sceneImgPath = './img/Scene/';

var arrowsSpriteImgArray = new Array();
var spriteImgArray = new Array();
var spriteImgPath = './img/Sprite/';

var spriteArray = new Array();
var spriteCount = 0;
var arrowsSprite = new Array();

var currentSecneNum = 0;
var currentSceneImg ;

var currentTextNum = 0;
var currentText = "";

function preload(){
  for( var i in sceneData){
    sceneImgArray[i] = loadImage( sceneImgPath + sceneData[i].mainImg );

    if(sceneData[i].subSceneImg){
      subSceneImgArray[subSceneCount] = loadImage( sceneImgPath + sceneData[i].subSceneImg );
      subSceneCount++;
    }
  }

  for(var i in spriteData){
    spriteImgArray[i] = loadImage( spriteImgPath + spriteData[i] );
  }

  for(var i in arrowsData){
    arrowsSpriteImgArray[i] = loadImage(spriteImgPath + arrowsData[i].name);
  }

}

function setup(){

  createCanvas(canvasWidth,canvasHeight);
  imageMode(CENTER);
  frameRate(60);

  OnEnter();

}

function draw(){
  background(255);
  passedSwitchCount ++;

  for (var i = 0; i < spriteArray.length; i++) {
    spriteArray[i].remove();
  }
  if('Sprite' in sceneData[currentSecneNum]){
    console.log('make sprite');
    for (var i = 0; i < sceneData[currentSecneNum].Sprite.length; i++) {
      var f = function(){};
      if(sceneData[currentSecneNum].Sprite[i].mousePressed){
        f = sceneData[currentSecneNum].Sprite[i].mousePressed;
      }
      setSprite(sceneData[currentSecneNum].Sprite[i].index,
        i,
        sceneData[currentSecneNum].Sprite[i].x,
        sceneData[currentSecneNum].Sprite[i].y,
        sceneData[currentSecneNum].Sprite[i].w,
        sceneData[currentSecneNum].Sprite[i].h,
        f
    );
   }
 }

  if(enableSprite && passedSwitchCount > switchInterval){
    if('Sprite' in sceneData[currentSecneNum]){
      for (var i in spriteArray) {
        spriteArray[i].setCollider("rectangle", 0, 0, sceneData[currentSecneNum].Sprite[i].w, sceneData[currentSecneNum].Sprite[i].h);
      }
    }

    for (var i in arrowsSprite) {
      arrowsSprite[i].setCollider("rectangle", 0, 0,  arrowsData[i].w,  arrowsData[i].h);
    }
  }else{
    if('Sprite' in sceneData[currentSecneNum]){
      for (var i in spriteArray) {
        spriteArray[i].setCollider("rectangle", 0, 0, 0, 0);
      }
    }

    for (var i in arrowsSprite) {
      arrowsSprite[i].setCollider("rectangle", 0, 0, 0, 0);

    }
  }

  if(sceneData[currentSecneNum].Flags){
    for (var i = 0; i < sceneData[currentSecneNum].Flags.length; i++) {

      if(sceneData[currentSecneNum].Flags[i].flag){
        if(sceneData[currentSecneNum].Flags[i].event){
          sceneData[currentSecneNum].Flags[i].event();
        }
      }
    }
  }

  image(currentSceneImg,canvasWidth/2,canvasHeight/2);


  if(currentText != '' ){
    currentTextNum = drawText(currentText,currentTextNum);
    return;
  }

  //矢印処理

  for (var i = 0; i < arrowsSprite.length; i++) {
    if(sceneData[currentSecneNum].Arrows[i] != 99){

      drawSprite(arrowsSprite[i]);
    }
  }
  if(spriteArray.length > 0){
    for (var i = 0; i < spriteArray.length; i++) {
      drawSprite(spriteArray[i]);
    }

  }

}


function mousePressed(){
  if(currentTextNum == -1){
    HideTextWindow();
    if(sceneData[currentSecneNum].mainText.clicked){
        sceneData[currentSecneNum].mainText.clicked();
    }
  }
}
