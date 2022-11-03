///setup game area/canvas ++
///build player ++
///move player around  ++
///create pop-up objects  
//collision detection ++
//random enemy objects  
//if collect = score+, if enemy = game over
///images for objects, background  ++
///moving background?  
///frame around canvas, some text


const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');
const soundtrack = new Audio('./soundtrack.mp3');



canvas.width = 1200;
canvas.height = 800;
let gameOver = 'false';
let frame = 0;
let score = 0;
let gameCount = 0;
let record = 0;
let timeSeconds = 5;




//////mouse click, coordinates

let canvasPosition = canvas.getBoundingClientRect();
const mouse = {
    x: canvas.width / 2,
    y: canvas.height/ 2,
    click: false
}
canvas.addEventListener('click', function(event) {
mouse.click = true;
console.log('event x,y', event.x, event.y, event)
mouse.x = event.x - canvas.offsetLeft;
mouse.y = event.y - canvas.offsetTop;
//console.log('Here i am ' + mouse.x, mouse.y);
} ) ;

canvas.addEventListener('no-click', function() {
    mouse.click = false;
});
 
/////background
const background = new Image ();
background.src = './background.jpeg';

function displayBackground() {
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
}


///banner

const banner = new Image();
banner.src = './banner.png';
function displayBanner() {
    ctx.drawImage(banner, 5, 525, 570, 350);
}


///moving clouds  
const cloud1 = new Image();
cloud1.src = 'cloud1.png';
const cloud2 = new Image();
cloud2.src = 'cloud2.png';
const cloud3 = new Image();
cloud3.src = 'cloud3.png';
const cloud4 = new Image();
cloud4.src = 'cloud4.png';

const cld1 = {
    x1 : 0,
    x2 : canvas.width,
    y: 0,
    width: canvas.width,
    height: 225,
}

const cld2 = {
    x : -900,
    y : -10,
}


const cld3 = {
    x : canvas.width,
    y : 40,
}

const cld4 = {
    x : -250,
    y : 40,
}

function movingCloud1() {
    cld1.x1 -= 0.5;
    if (cld1.x1 < -cld1.width) cld1.x1 = cld1.width;
    cld1.x2 -= 0.5;
    if (cld1.x2 < -cld1.width) cld1.x2 = cld1.width;
    ctx.drawImage(cloud1, cld1.x1, cld1.y, cld1.width +7, 150);
    ctx.drawImage(cloud1, cld1.x2, cld1.y, cld1.width +7, 150);
}

function movingCloud2() {
    cld2.x ++;
    if (cld2.x > canvas.width) cld2.x = -500;
    ctx.drawImage(cloud2, cld2.x, cld2.y, 500, 150);
}

function movingCloud3() {
    cld3.x -= 0.9;
    if (cld3.x < -500) cld3.x = canvas.width;
    ctx.drawImage(cloud3, cld3.x, cld3.y, 500, 150);
}

function movingCloud4() {
    cld4.x += 1.1;
    if (cld4.x > canvas.width) cld4.x = -500;
    ctx.drawImage(cloud4, cld4.x, cld4.y, 200, 100);
}


////player
const beeLeft = new Image();
beeLeft.src = 'beeSpriteL.png';
const beeRight = new Image();
beeRight.src = 'beeSpriteR.png';
 class Player {
    constructor() {
        this.x = canvas.width;
        this.y = canvas.height / 2;
        this.radius = 55;
        this.angle = 0;
        this.frameX = 0;
        this.frameY = 0;
        this.frame = 0;
        this.spriteWidth = 512;
        this.spriteHeight = 504;
    }
    update() {
        const distX = this.x - mouse.x;
        const distY = this.y - mouse.y;
        //let theta = Math.atan2(distX, distY);
       // this.angle = theta;


        if (this.x != mouse.x) {
            this.x -= distX / 25;
        } if (this.y != mouse.y) {
            this.y -= distY / 25;
        }
    }

        draw(){
            
        if (mouse.click = true ) {
            console.log(this.x, this.y, mouse.x, mouse.y)
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(mouse.x, mouse.y);
            
        } 
        ctx.fillStyle = 'transparent';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
        ctx.save();
        ctx.translate(this.x, this.y);
       ctx.rotate(this.angle);

        
        if (this.x >= mouse.x) {
            ctx.drawImage(beeLeft, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, 0 - 65, 0 - 60, this.spriteWidth/4, this.spriteHeight/4)
         } else {
        ctx.drawImage(beeRight, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, 0 - 65, 0 - 60, this.spriteWidth/4, this.spriteHeight/4)
         }
         ctx.restore();
        }
    
    }

    const player = new Player();

    ////////Flowers
let flowerArr = [];

const flowersArr = []
 const flower1Image = new Image();
 flower1Image.src = 'item1.png';
 const flower2Image = new Image();
 flower2Image.src = 'item2.png';
 const flower3Image = new Image();
 flower3Image.src = 'item3.png';
 const flower4Image = new Image();
 flower4Image.src = 'item4.png';
flowersArr.push(flower1Image, flower2Image, flower3Image, flower4Image)


 class Flower {
  constructor(flowerImage) {
    this.x = Math.random() * canvas.width;
    this.y = -70;
    this.speed = Math.random() * 5 + 1;
    this.radius = 35;
    this.distance = 0;
    this.scoreAdded = false;
    this.image = flowerImage;
  }
  update() {
    this.y += this.speed;
    const distX = this.x - player.x;
    const distY = this.y - player.y;
   this.distance = Math.sqrt( distX * distX + distY * distY );
  }
  draw() {
    ctx.fillStyle = 'transparent';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
    
    ctx.drawImage(this.image, this.x - 40, this.y - 40, 80, 80 );

  }
 }


 function flowerRain() {
    if (frame % 60 === 0) {
        const randomFlower = flowersArr[Math.floor(Math.random() * flowersArr.length)]
        flowerArr.push(new Flower(randomFlower));

    }
    for (let i = 0; i < flowerArr.length; i++ ) {
        flowerArr[i].update();
        flowerArr[i].draw(); 
        if ( flowerArr[i].y > canvas.height + flowerArr[i].radius * 2) {
            flowerArr.splice(i, 1);
            i--;
            
         } else if (flowerArr[i]) {
            if (flowerArr[i].distance < flowerArr[i].radius + player.radius) {
                const catchAudio1 = new Audio('pickup1.mp3');
                        catchAudio1.play();
               // console.log('catch');
//                 if ( Math.random() <= 0.5 ) {
//                    //catchAudio2.pause();
//                     const catchAudio1 = new Audio('pickup1.mp3');
//                         catchAudio1.play();
//                     } 
//   ////////fix sounds before project is pushed                  
//                     else {
//                         const catchAudio2 = new Audio('pickup1.mp3');
//                         catchAudio2.play();
//                     } 
                    score++;
                    timeSeconds += 0.7;
                    flowerArr[i].scoreAdded = true;
                    flowerArr.splice(i, 1);
                    i--;
                
             }
         } 
         
         }
          

    
}


const rocketImg = new Image();
rocketImg.src = './rocket1.png';
const enemyImg = new Image();
enemyImg.src = './enemy1.png';

class Enemy {
    constructor(){
        this.x = canvas.width + 200;
        this.y = Math.random() * (canvas.height - 200) + 50;
        this.radius = 20;
        this.speed = Math.random() * 6 + 4;
        this.frame = 0;
        this.image = enemyImg;
    }
    draw() {
        ctx.fillStyle = 'transparent';
        ctx.beginPath();
        //ctx.fillRect(this.x, this.y, 120, 30)
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
       ctx.drawImage(this.image, this.x - 45 , this.y - 116 , 260, 240 );
        ctx.closePath();
    }
    update () {
        this.x -= this.speed * 1.2;
        
        if ( this.x < -300) {
            this.x = canvas.width + 200;
            this.y = Math.random() * (canvas.height - 150) + 90;
            this.speed = Math.random() * 6 + 4;
        }
        ////collision
        const distX = this.x - player.x;
        const distY = this.y - player.y;
        const distance = Math.sqrt( distX * distX + distY * distY );
        if (distance < this.radius + player.radius) {
            const impactAudio = new Audio('./impact.wav');
            impactAudio.play();
            endGame("Game Over");
            gameCount++;
           
        }

    }
}

class Rocket {
    constructor(){
        this.x = 0 - 200;
        this.y = Math.random() * (canvas.height - 200) + 50;
        this.radius = 20;
        this.speed = Math.random() * 6 + 4;
        this.frame = 0;
        this.image = rocketImg;
    }
    draw() {
        ctx.fillStyle = 'transparent';
        ctx.beginPath();
       // ctx.fillRect(this.x, this.y, 120, 30)
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.drawImage(this.image, this.x - 240, this.y - 150, 340, 320 );
        ctx.closePath();
    }
    update () {
        this.x += this.speed * 1.2;
        if ( this.x > canvas.width + 200) {
            this.x = 0 - 200;
            this.y = Math.random() * (canvas.height - 150) + 90;
            this.speed = Math.random() * 6 + 4;
        }
        //// collision
        const distX = this.x - player.x;
        const distY = this.y - player.y;
        const distance = Math.sqrt( distX * distX + distY * distY );
        if (distance < this.radius + player.radius) {
            const impactAudio = new Audio('./impact.wav');
            impactAudio.play();
            endGame("Game Over");
            gameCount++;

           
        }

    }
}


 let animationFrameId;
 let animationFrameId1;
let enemy1 = new Enemy();
let rocket1 = new Rocket();



function displayEnemies() {
    enemy1.update();
    enemy1.draw();
    rocket1.update();
    rocket1.draw();
}

function endGame(endGameMessage){
    cancelAnimationFrame(animationFrameId)
    timeSeconds = 60;
    ctx.font = '200px Comic Sans MS'
    ctx.fillStyle = 'red';
    ctx.fillText(endGameMessage, 92, 240);
    ctx.font = '100px Comic Sans MS'
    ctx.fillStyle = 'white';
    ctx.fillText("Score:" + score, 410, 340);
    score = 0;
    enemy1 = new Enemy();
    rocket1 = new Rocket();
    let startScreen = document.querySelector('#start-screen')
    startScreen.style.display = 'inline'
    startScreen.style.position = 'absolute'
    startScreen.style.top = '50%'
    startScreen.style.left = '50%'
    startScreen.style.transform = 'translate(-50%, -50%)'
}

    function animate(){
        if(frame % 60 === 0){
            timeSeconds--;
        }
        animationFrameId = requestAnimationFrame(animate);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        //soundtrack.play();
        displayBackground();
        movingCloud1();
        movingCloud2();
        movingCloud3();
        movingCloud4();
        displayBanner();
        displayEnemies();
        flowerRain();
        player.update();
        ctx.font = '45px Courier New';
        ctx.fillStyle = 'black';
        ctx.fillText('Attempts:'+ gameCount, 144, 690)


        ctx.font = '65px Courier New';
        ctx.fillStyle = 'black';
        ctx.fillText('Flowers:'+ score, 80, 750);

        ctx.font = '45px Courier New';
        
        ctx.fillStyle = 'rgb(60, 149, 213)';
        ctx.fillText('Timer:' + Math.round(timeSeconds), 968, 48);

        player.draw();
        frame++;
        // if(timeSeconds <= 10 ) {
        //     const timeOutaudio = new Audio('timeOut.mp3');
        //     timeOutaudio.play();
        // }
        if(timeSeconds <= 0) {
            endGame('  You Lost!');
            const catchAudio2 = new Audio('pickup1.mp3');
            catchAudio2.play();
        }
        if(score >= 100) {
            endGame('  You Won!');
            const catchAudio2 = new Audio('pickup1.mp3');
            catchAudio2.play();
        }
       
    }
 

//  window.addEventListener('resize', function(){
//     mouse.position = canvas.getBoundingClientRect();
//  })

 document.querySelector('#start').addEventListener('click', () => {
    document.querySelector('#start-screen').style.display = 'none'
    document.querySelector('.start-text1').style.display = 'none'
    document.querySelector('.start-text2').style.display = 'none'
    canvas.style.display = 'inline'
    
    animate();

 })








///// =========bugs========
///  all oscars blinking when catched
///  sound is not random (solved)
//// doesnt play sound on newCatch until the previous one finishes
//// random flickering(solved)
//// how to create  record stat and game record(let game count = 0?, everytime loose gamecount++)
//// how to make background music


/////how to stop game and ask player for restart
//// how to make game over message stay
///game over music how to cut and go back to game music








 /*if ( !oscarsArr[i].scoreAdded ) {
                if (oscarsArr[i].sound == catchAudio1) {
                    catchAudio1.play();
                } 
                
                
                /* else {
                    catchAudio2.play();
                }
            

                */

                /*  for(let i = oscarsArr.length - 1; i >= 0; i--)
     oscarsArr[i].update();
     oscarsArr[i].draw(); 
     if ( oscarsArr[i].y > canvas.height) {
         oscarsArr.splice(i, 1);
         i--;
        // console.log('ok');
     }
     */




     //////background sound
     ////collission sound
     /////flower collect sound
     //////timer move to the top
     ///change game over text style/ position
     /////dress up start game button
     ////put some text on welcome screen
     ////rotate flowers when falling
     ////trail effects after player/enemy