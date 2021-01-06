var sword, swordi;

var fruits, f1, f2, f3, f4, fruitGroup;

var alien, a1, alienGroup;

var gameoverImage;

var PLAY = 1;
var END = 0;
var gamestate = 1;
var score = 0;

function preload() {
  swordi = loadImage("sword.png");

  f1 = loadImage("fruit1.png");
  f2 = loadImage("fruit2.png");
  f3 = loadImage("fruit3.png");
  f4 = loadImage("fruit4.png");

  a1 = loadAnimation("alien1.png", "alien2.png");

  gameoverImage = loadImage("gameover.png");

}

function setup() {
  createCanvas(600, 600)

  sword = createSprite(40, 200, 20, 20)
  sword.addImage(swordi);
  sword.scale = 0.7

  fruitGroup = createGroup();
  alienGroup = createGroup();
}

function draw() {
  background(20);

  if (gamestate === PLAY) {
    sword.y = World.mouseY;
    sword.x = World.mouseX;
    fruit();
    aliens();

    if (fruitGroup.isTouching(sword)) {
      fruitGroup.destroyEach();
      score = score + 1;
    }
    if (alienGroup.isTouching(sword)) {
      gamestate = END;
    }
  } else if (gamestate === END) {
    sword.addImage(gameoverImage);
    sword.x = 300;
    sword.y = 300;

    fruitGroup.velocityX = 0;
    fruitGroup.destroyEach();
    alienGroup.velocityX = 0;
    alienGroup.destroyEach();
  }

  console.log(score);
  drawSprites();


}

function fruit() {
  if (World.frameCount % 20 === 0) {
    fruits = createSprite(600, 200, 20, 20);
    fruits.scale = 0.2;

    r = Math.round(random(1, 4));
    if (r === 1) {
      fruits.addImage(f1);
    }
    if (r === 2) {
      fruits.addImage(f2);
    }
    if (r === 3) {
      fruits.addImage(f3);
    }
    if (r === 4) {
      fruits.addImage(f4);
    }

    fruits.y = Math.round(random(50, 500));

    fruits.velocityX = -10;
    fruits.setLifetime = 100;

    fruitGroup.add(fruits);
  }
}

function aliens() {
  if (World.frameCount % 80 === 0) {
    alien = createSprite(600, 200, 20, 20)
    alien.addAnimation("moving", a1);
    alien.y = Math.round(random(50, 500));
    alien.velocityX = -15;
    alien.setLifetime = 50;

    alienGroup.add(alien);
  }
}