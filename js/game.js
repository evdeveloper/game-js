let cvs = document.getElementById("canvas");
let ctx = cvs.getContext("2d");

let bird = new Image();
let bg = new Image();
let fg = new Image();
let pipeTop = new Image();
let pipeBottom = new Image();


bird.src = "img/flappy_bird_bird.png";   
bg.src = "img/flappy_bird_bg.png";   
fg.src = "img/flappy_bird_fg.png";  
pipeTop.src = "img/flappy_bird_pipeTop.png";  
pipeBottom.src = "img/flappy_bird_pipeBottom.png";  

let gap = 90;

// При нажатии на какую либо кнопку 

document.addEventListener("mouseup", moveUp);
document.addEventListener("keydown", moveUp);

function moveUp() {
    yPos -= 30;
    fly.play();
    

}


// Звуковые файлы 

let fly = new Audio();
let score_audio = new Audio();
let boy = new Audio();
let fone_music = new Audio();

fly.src = "audio/fly.mp3";
score_audio.src = "audio/score.mp3";
boy.src = "audio/boy.mp3";
fone_music.src = "audio/fone_music.mp3";






// Создание объекта

var pipe = [];

pipe[0] = {
    x : cvs.width,
    y : 0
}

// Очки 

let score = 0;



// Позиция птички

let xPos = 30;
let yPos = 100;
let grav = 1;

// Фоновая музыка и уменьшение громкости 
function vol() {
    fone_music.volume = 0.1;
}
    vol();

fone_music.play();








function draw() {
    ctx.drawImage(bg, 0, 0);
    
    for(let i = 0; i < pipe.length; i++) {
        ctx.drawImage(pipeTop, pipe[i].x, pipe[i].y);
        ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeTop.height + gap);

        pipe[i].x --;

        if(pipe[i].x == 20) {
            pipe.push({
                x : cvs.width,
                y : Math.floor(Math.random() * pipeTop.height) - pipeTop.height
            });
        }

// Столкновение птицы 
        if(xPos + bird.width >= pipe[i].x && xPos <= pipe[i].x + pipeTop.width && (yPos <= pipe[i].y + pipeTop.height
             || yPos + bird.height >= pipe[i].y + pipeTop.height + gap) || yPos + bird.height >= cvs.height - fg.height) {
                boy.play();
                location.reload(true); //начинаем игру заново

                

        }


        if(pipe[i].x == 5) {
            score++;
            score_audio.play();
        }

}
    
    ctx.drawImage(fg, 0, cvs.height - fg.height);

    ctx.drawImage(bird, xPos, yPos);

    yPos += grav;

    

    ctx.fillStyle = "#000";
    ctx.font = "16px Verdana";
    ctx.fillText("Счет: " + score, 10, cvs.height - 20);

    requestAnimationFrame(draw);
}


pipeBottom.onload = draw;