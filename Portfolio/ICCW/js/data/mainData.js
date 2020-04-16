
var canvasWidth = 640;
var canvasHeight = 480;

var enableSprite = true;

var preSceneNumber = 0;

var eventFlags = {
  '' : false
}

var arrowsData = [
  {
    name : 'up.png',
    x : canvasWidth/2,
    y : 77,
    w : 276,
    h : 149
  },
  {
    name : 'right.png',
    x : canvasWidth - 70,
    y : canvasHeight /2,
    w : 149,
    h : 276
  },
  {
    name : 'down.png',
    x : canvasWidth/2,
    y : canvasHeight - 70,
    w : 276,
    h : 149
  },
  {
    name : 'left.png',
    x : 70,
    y : canvasHeight/2,
    w : 149,
    h : 276
  }
]



var spriteData = [
  'monoWindow.png',
  'ped.png',
  'None.png'

]
//Arrows =>  up , right , down , left
var sceneData = [
  {
    'mainImg' : '00Title.PNG',
    'mainText' : {
      'serif' : 'クリックだけで進行するよ ',
      'duration' : 1.0,
      'clicked' : function(){

      }
    },
    'Flags' : [
      {
        'flag' : false,
        'once' : false,
        'event' : function(){
          if(!sceneData[0].Flags[0].once){
          BeginTextDisplay('2週目に何かが用意されているなんてことはない',1.0);
          sceneData[0].Flags[0].once = true;
          }
        }

      }
    ],
    'Arrows' : [
      1,
      99,
      99,
      99
    ],
    'OnEnter' : function(){},
    'OnExit'  : function(){
      sceneData[0].Flags[0].flag = true;
    }

  },
  {
    'mainImg' : '01.PNG',
    'mainText' : {
      'serif' : '気がつくと、知らない部屋にいた。\n部屋には台しかない',
      'duration' : 1.0
    },
    'Arrows' : [
      99,
      99,
      99,
      99
    ],
    'Sprite' : [
      {
        'index' : 1,
        x : canvasWidth/2-12,
        y : canvasHeight/2+5,
        w : 164,
        h : 203,
        mousePressed : function(){
          ChangeScene(2);
        }
      }
    ],
    'Flags' : [
      {
        'flag' : false

      }
    ],
    'OnEnter' : function(){
      if(sceneData[1].Flags[0].flag){
        ChangeScene(3);
      }
    },
    'OnExit'  : function(){
      sceneData[1].Flags[0].flag = true;
    }
  },
  {
    'mainImg' : '02.PNG',
    'mainText' : {
      'serif' : '台の真ん中は水に満たされている。\n中には会話をしている人間が写っているみたいだ。\nその中に自分もいるみたいだ。',
      'duration' : 1.0
    },
    'Arrows' : [
      13,
      99,
      preSceneNumber,
      99
    ],
    'OnEnter' : function(){
      sceneData[2].Arrows[2] = preSceneNumber;

    },
    'OnExit'  : function(){}
  },
  {
    'mainImg' : '03.PNG',
    'subSceneImg' : '03_add.png',
    'mainText' : {
      'serif' : '自分と同じ背格好をしている人間がこちらを見ている。\nその人間は、後ろの扉に入っていった。',
      'duration' : 1.0,
      'clicked' : function(){
        sceneData[3].Flags[0].flag = true;
      }
    },
    'Arrows' : [
      4,
      99,
      99,
      99
    ],
    'Sprite' : [
      {
        'index' : 2,
        x : canvasWidth/2-20,
        y : canvasHeight/2+60,
        w : 164,
        h : 150,
        mousePressed : function(){
          ChangeScene(2);
        }
      }
    ],
    'Flags' : [
      {
        'flag' : false,
        'once' : false,
        'event' : function(){
          if(!sceneData[3].Flags[0].once){
            ChangeSceneImg(subSceneImgArray[0]);
            sceneData[3].Flags[0].once = true;
          }
        }

      }
    ],
    'OnEnter' : function(){
        if(sceneData[3].Flags[0].flag){
          ChangeSceneImg(subSceneImgArray[0]);
        }
    },
    'OnExit'  : function(){},

  },
  {
    'mainImg' : '04.PNG',//5,6,7のふらぐがたってたら処理を
    'mainText' : {
      'serif' : 'また、台がある。\n右の扉が不気味だ',
      'duration' : 1.0,
      'clicked' : function(){
        sceneData[4].Flags[0].flag = true;
      }
    },
    'Arrows' : [
      6,
      7,
      3,
      5
    ],
    'Sprite' : [
      {
        'index' : 2,
        x : canvasWidth/2-5,
        y : canvasHeight/2+55,
        w : 164,
        h : 203,
        mousePressed : function(){
          ChangeScene(2);
        }
      }
    ],
    'Flags' : [
      {
        'flag' : false,
        'once' : false,
        'event' : function(){
          if(!sceneData[4].Flags[0].once){
            //ChangeSceneImg(subSceneImgArray[1]);
            sceneData[4].Flags[0].once = true;
          }
        }

      }
    ],
    'OnEnter' : function(){
      if(sceneData[5].Flags[0].flag && sceneData[6].Flags[0].flag && sceneData[7].Flags[0].flag ){
        ChangeScene(8);
      }
    },
    'OnExit'  : function(){}
  },
  {
    'mainImg' : '05.PNG',
    'subSceneImg' : '05_add.png',
    'mainText' : {
      'serif' : '本や紙で部屋が散乱している。\nまた同じ背格好をした人間だ。\nドッペルゲンガーだろうか......\n無言で部屋を出ていった',
      'duration' : 1.0,
      'clicked' : function(){
        sceneData[5].Flags[0].flag = true;
      }
    },
    'Arrows' : [
      99,
      99,
      4,
      99
    ],
    'Flags' : [
      {
        'flag' : false,
        'once' : false,
        'event' : function(){
          if(!sceneData[5].Flags[0].once){
            ChangeSceneImg(subSceneImgArray[1]);
            sceneData[5].Flags[0].once = true;
          }
        }

      }
    ],
    'OnEnter' : function(){
      if(sceneData[5].Flags[0].flag){
        ChangeSceneImg(subSceneImgArray[1]);
      }
    },
    'OnExit'  : function(){}
  },
  {
    'mainImg' : '06.PNG',
    'subSceneImg' : '06_add.png',
    'mainText' : {
      'serif' : 'お絵描きをしている。\n楽しそうにはしゃいでいる。\nスキップしながら出て行ってしまった。',
      'duration' : 1.0,
      'clicked' : function(){
        sceneData[6].Flags[0].flag = true;
      }
    },
    'Arrows' : [
      99,
      99,
      4,
      99
    ],
    'Flags' : [
      {
        'flag' : false,
        'once' : false,
        'event' : function(){
          if(!sceneData[6].Flags[0].once){
            ChangeSceneImg(subSceneImgArray[2]);
            sceneData[6].Flags[0].once = true;
          }
        }

      }
    ],
    'OnEnter' : function(){
      if(sceneData[6].Flags[0].flag){
        ChangeSceneImg(subSceneImgArray[2]);
      }
    },
    'OnExit'  : function(){}
  },
  {
    'mainImg' : '07.PNG',
    'subSceneImg' : '07_add.png',
    'mainText' : {
      'serif' : '真っ黒だ\n最初にあった奴がいる。\nまた出ていった。何がしたいのだろうか',
      'duration' : 1.0,
      'clicked' : function(){
        sceneData[7].Flags[0].flag = true;
      }
    },
    'Arrows' : [
      99,
      99,
      4,
      99
    ],
    'Flags' : [
      {
        'flag' : false,
        'once' : false,
        'event' : function(){
          if(!sceneData[7].Flags[0].once){
            ChangeSceneImg(subSceneImgArray[3]);
            sceneData[7].Flags[0].once = true;
          }
        }

      }
    ],
    'OnEnter' : function(){
      if(sceneData[7].Flags[0].flag){
        ChangeSceneImg(subSceneImgArray[3]);
      }
    },
    'OnExit'  : function(){}
  },
  {
    'mainImg' : '08.PNG',
    'mainText' : {
      'serif' : '扉が消えた！\nしかも全員いる！\n怖い......\nしかもどこにも行けないじゃないか......',
      'duration' : 1.0,
      'clicked' : function(){
        sceneData[3].Flags[0].flag = true;
      }
    },
    'Arrows' : [
      99,
      99,
      99,
      99
    ],
    'Sprite' : [
      {
        'index' : 2,
        x : canvasWidth/2-15,
        y : canvasHeight/2+60,
        w : 100,
        h : 125,
        mousePressed : function(){
          ChangeScene(9);
        }
      }
    ],
    'OnEnter' : function(){},
    'OnExit'  : function(){}
  },
  {
    'mainImg' : '09.PNG',
    'mainText' : {
      'serif' : 'まだ、彼らは会話をしている',
      'duration' : 1.0,
      'clicked' : function(){
          ChangeScene(10);
      }
    },

    'Arrows' : [
      99,
      99,
      99,
      99
    ],
    'OnEnter' : function(){},
    'OnExit'  : function(){},

  },
  {
    'mainImg' : '10.PNG',
    'mainText' : {
      'serif' : 'みんな、みんなの言動を気にしているようだ',
      'duration' : 1.0,
      'clicked' : function(){
          ChangeScene(11);
      }
    },
    'Arrows' : [
      99,
      99,
      99,
      99
    ],
    'OnEnter' : function(){},
    'OnExit'  : function(){},
  },
  {
    'mainImg' : '11.PNG',
    'mainText' : {
      'serif' : 'ここに写っている私は誰だ？？',
      'duration' : 1.0,
      'clicked' : function(){
          ChangeScene(12);
      }
    },
    'Arrows' : [
      99,
      99,
      99,
      99
    ],
    'OnEnter' : function(){},
    'OnExit'  : function(){},
  },
  {
    'mainImg' : '12Fin.PNG',
    'mainText' : {
      'serif' : 'fin',
      'duration' : 1.0,
      'clicked' : function(){
          ChangeScene(0);
      }
    },
    'Arrows' : [
      99,
      99,
      99,
      99
    ],
    'OnEnter' : function(){},
    'OnExit'  : function(){
      for (var i = 1; i < sceneData.length; i++) {
        if('Flags' in sceneData[i]){
          for (var j in sceneData[i].Flags) {

            sceneData[i].Flags[j].flag = false;
          }
        }
      }

    },
  },
  {
    'mainImg' : '02.PNG',
    'mainText' : {
      'serif' : 'このまま終わりますか？\n終わりたいなら進んで\n終わらないなら戻ることをお勧めするよ',
      'duration' : 1.0,
      'clicked' : function(){
      }
    },
    'Arrows' : [
      14,
      99,
      2,
      99
    ],
    'OnEnter' : function(){

    },
    'OnExit'  : function(){

    },
  },
  {
    'mainImg' : '12Fin.PNG',
    'mainText' : {
      'serif' : 'それでは、また',
      'duration' : 1.0,
      'clicked' : function(){
        sceneData[0].Flags[0].flag = false;
      }
    },
    'Arrows' : [
      0,
      99,
      99,
      99
    ],
    'OnEnter' : function(){

    },
    'OnExit'  : function(){

    },
  },
]

function drawText(serif, count){//durationをつけなきゃ30文字で改行
  image(spriteImgArray[0],canvasWidth/2,400);
  textSize(18);
  fill(0);

  var x = 25;
  var y = 375;

  if(count != -1){
    text(serif.slice(0,count), x+10, y);
  }else{
    text(serif,x +10,y);
    text('Click!',x+485,y+70);
    return -1;
  }

  if(passedcount != charInterval){
    passedcount ++ ;
    return count;
  }

  passedcount = 0;
  count ++;
  if( count  < serif.length){
    return count;
  }else{
    return -1
  }
}

function BeginTextDisplay(serif,duration) {
  currentText = serif;
  charInterval = Math.round(60 * duration / serif.length);
  passedcount = 0;
  currentTextNum = 0;

  enableSprite = false;

}

function HideTextWindow(){

  enableSprite = true;
  passedSwitchCount = 0;
  currentText = '';
}

function ChangeScene(num){
  OnExit();
  preSceneNumber = currentSecneNum;
  currentSecneNum = num;
  OnEnter();
}

function setSprite(s, i, x, y, w, h,onSpriteEvent = function(){}) {
  //スプライトを生成する関数
  spriteArray[i] = createSprite(x, y, w, h);
  spriteArray[i].sprnumber = i; //特定シーンにおける何番目のスプライトなのかを識別する
  spriteArray[i].addImage(spriteImgArray[s]); //スプライトに画像追加
  spriteArray[i].setCollider("rectangle", 0, 0, w, h); //コライダーの設定
  spriteArray[i].onMousePressed = onSpriteEvent; //イベントハンドラの設定
  spriteCount++;
}

function OnEnter(){

  for (var i = 0; i < spriteArray.length; i++) {
    spriteArray[i].remove();
  }

  for (var i = 0; i < arrowsData.length; i++) {
    arrowsSprite[i] = createSprite(arrowsData[i].x, arrowsData[i].y, arrowsData[i].w, arrowsData[i].h);
    arrowsSprite[i].sprnumber = i;
    arrowsSprite[i].addImage(arrowsSpriteImgArray[i]); //スプライトに画像追加
    arrowsSprite[i].setCollider("rectangle", 0, 0,  arrowsData[i].w,  arrowsData[i].h); //コライダーの設定
  }
   currentSceneImg = sceneImgArray[currentSecneNum];
   sceneData[currentSecneNum].OnEnter();




   for (var i = 0; i < arrowsSprite.length; i++) {
     if(sceneData[currentSecneNum].Arrows[i] != 99){
       arrowsSprite[i].setCollider("rectangle", 0, 0,  arrowsData[i].w,  arrowsData[i].h);

       arrowsSprite[i].onMousePressed = function(e){

         ChangeScene(sceneData[currentSecneNum].Arrows[e.sprnumber]);
       }
     }else{
       arrowsSprite[i].setCollider("rectangle", 0, 0, 0, 0);
     }
   }

   if(sceneData[currentSecneNum].Flags){
     for (var i = 0; i < sceneData[currentSecneNum].Flags.length; i++) {

       if(!sceneData[currentSecneNum].Flags[i].flag){
         if(sceneData[currentSecneNum].mainText){
           BeginTextDisplay(sceneData[currentSecneNum].mainText.serif,sceneData[currentSecneNum].mainText.duration);
         }
         return;
       }
     }
     BeginTextDisplay('もうこの部屋にはなにもなさそうだ',1.0);
   }else{
     if(sceneData[currentSecneNum].mainText){
       BeginTextDisplay(sceneData[currentSecneNum].mainText.serif,sceneData[currentSecneNum].mainText.duration);
     }
   }

}

function OnExit(){
  sceneData[currentSecneNum].OnExit();



  console.log(spriteArray);
  for (var i = 0; i < arrowsSprite.length; i++) {
    arrowsSprite[i].remove();
  }

  spriteCount = 0;
}

function ChangeSceneImg(img){
  currentSceneImg = img;
}
