//Create variables here
var dog,dogImage,happyDog,database,foodS,foodStock;
function preload(){
  //load images here
  
  this.dogImage = loadImage("images/dogImg.png");
  this.happyDog = loadImage("images/dogImg1.png")
  
}

function setup() {
  createCanvas(500, 500);
  database = firebase.database();
  foodStock = database.ref("Food")
  foodStock.on("value",readStock);
  dog = createSprite(250,300,40,40)
  dog.addImage(dogImage);
  dog.scale = 0.2;
  foodS = 20;
}


function draw() {  
  background(46, 139, 87) 
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDog);
  }
  drawSprites();
  textSize(25);
  fill("white")
  text("Amount of Food Remaining: " + foodS,100,200);
  //add styles here

}
function readStock(data){
  foodS=data.val();
}
function writeStock(x){
  if(x<=0){
    x=0
  }
  else{
    x=x-1 
  }
  database.ref('/').update({
    Food:x
  })
}
