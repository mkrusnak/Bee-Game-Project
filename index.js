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


canvas.width = 1200;
canvas.height = 800;

let frame = 0;
let score = 0;
ctx.font = '80px Courier New';
//ctx.gameSpeed = 1;

//mouse click, coordinates

let mousePosition = canvas.getBoundingClientRect();
const mouse = {
    x: canvas.width / 2,
    y: canvas.height/ 2,
    click: false
}
canvas.addEventListener('click', function(event) {
mouse.click = true;
mouse.x = event.x - mousePosition.left;
mouse.y = event.y - mousePosition.top;
console.log('Here i am ' + mouse.x, mouse.y);
} ) ;

canvas.addEventListener('no-click', function() {
    mouse.click = false;
});
 
/////background
const background = new Image ();
background.src = 'background.jpeg';

function displayBackground() {
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
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
        let theta = Math.atan2(distX, distY);
        this.angle = theta;


        if (this.x != mouse.x) {
            this.x -= distX / 25;
        } if (this.y != mouse.y) {
            this.y -= distY / 25;
        }
    }

        draw(){
        if (mouse.click = true ) {
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
        } 
        ctx.fillStyle = 'transparent';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
        ctx.save();
        ctx.translate(this.x, this.y);
       /// ctx.rotate(this.angle);

        //ctx.fillRect(this.x, this.y, this.radius, 10)
        if (this.x >= mouse.x) {
            ctx.drawImage(beeLeft, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, 0 - 65, 0 - 60, this.spriteWidth/4, this.spriteHeight/4)
         } else {
        ctx.drawImage(beeRight, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, 0 - 65, 0 - 60, this.spriteWidth/4, this.spriteHeight/4)
         }
         ctx.restore();
        }
    
    }

    const player = new Player();
///
////const beeLeft = new Image();
//beeLeft.src = 'beeSpriteL.png';

    ////////oscars
 const oscarsArr = [];
 const imagesArray = ['item1.png', 'item2.png', 'item3.png', 'item4.png'];
 /////
 ///const myArray = ["bob.jpg", "joe.jpg", "chat.jpg"]
///const randomImage = () => {
 ////const image = myArray[Math.floor(Math.random() * 3)]; // 0 -> 2
 //console.log(image);
 //////
 ////////
 let num = Math.floor(Math.random() * (imagesArray.length));
 console.log(num)
 imageX = imagesArray[num];
 const flowerImage = new Image();
 flowerImage.src = imageX;
//  console.log(imageX)

// const randomImage = () => {
//     const flower = imagesArray[Math.floor(Math.random() * 5)];
// }
// console.log(flower)

 class Oscar {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = -70;
    this.speed = Math.random() * 3.0 + 1;
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
    
    ctx.drawImage(flowerImage, this.x - 40, this.y - 40, 80, 80 );

  }
 }

 

 
 
  //catchAudio1.src = ;
  
  //catchAudio2.src = ;



 function oscarRain() {
    if (frame % 75 === 0) {
        oscarsArr.push(new Oscar());
       //console.log(oscarsArr.length);
    }
    for (let i = 0; i < oscarsArr.length; i++ ) {
        oscarsArr[i].update();
        oscarsArr[i].draw(); 
        if ( oscarsArr[i].y > canvas.height + oscarsArr[i].radius * 2) {
            oscarsArr.splice(i, 1);
            i--;
            //console.log('ok');
         } else if (oscarsArr[i]) {
            if (oscarsArr[i].distance < oscarsArr[i].radius + player.radius) {
               // console.log('catch');
                if ( Math.random() <= 0.5 ) {
                   //catchAudio2.pause();
                    const catchAudio1 = new Audio('catch11.mp3');
                        catchAudio1.play();
                    } 
                    
                    else {
                        const catchAudio2 = new Audio('catch22.mp3');
                        catchAudio2.play();
                    } 
                    
                    score++;
                    oscarsArr[i].scoreAdded = true;
                    oscarsArr.splice(i, 1);
                    i--;
                
             }
         } 
         
         }
          

    
}

    function animate(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        displayBackground();
        movingCloud1();
        movingCloud2();
        movingCloud3();
        movingCloud4();
        oscarRain();
        player.update();
        ctx.fillStyle = 'black';
        ctx.fillText('Oscars:' + score, 20, 780);
        player.draw();
        frame++;
        requestAnimationFrame(animate);
    }
 animate();

 window.addEventListener('resize', function(){
    mouse.position = canvas.getBoundingClientRect();
 })








///// =========bugs========
///  all oscars blinking when catched
///  sound is not random (solved)
//// doesnt play sound on newCatch until the previous one finishes
//// random flickering(solved)
//// how to create  record stat and game record(let game count = 0?, everytime loose gamecount++)
//// how to make background music








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