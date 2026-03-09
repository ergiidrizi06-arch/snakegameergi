const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const grid = 20;

let snake;
let apple;
let score;
let highScore = 0;
let gameSpeed = 120;
let gameInterval;
let running = false;

function initGame(){

snake = {
x:160,
y:160,
dx:grid,
dy:0,
cells:[],
maxCells:4
};

apple = {
x:320,
y:320
};

score = 0;
gameSpeed = 120;

document.getElementById("score").innerText="Score: 0";
document.getElementById("gameOver").style.display="none";
}

function random(min,max){
return Math.floor(Math.random()*(max-min))+min;
}

function gameLoop(){

ctx.clearRect(0,0,canvas.width,canvas.height);

snake.x += snake.dx;
snake.y += snake.dy;

if(snake.x < 0 || snake.x >= canvas.width ||
snake.y < 0 || snake.y >= canvas.height){
gameOver();
return;
}

snake.cells.unshift({x:snake.x,y:snake.y});

if(snake.cells.length > snake.maxCells){
snake.cells.pop();
}

ctx.fillStyle="red";
ctx.fillRect(apple.x,apple.y,grid-1,grid-1);

ctx.fillStyle="#22c55e";

snake.cells.forEach((cell,index)=>{

ctx.fillRect(cell.x,cell.y,grid-1,grid-1);

if(cell.x===apple.x && cell.y===apple.y){

snake.maxCells++;
score++;

document.getElementById("score").innerText="Score: "+score;

apple.x=random(0,20)*grid;
apple.y=random(0,20)*grid;

if(score>highScore){
highScore=score;
document.getElementById("highScore").innerText="High Score: "+highScore;
}

if(gameSpeed>60){
gameSpeed-=5;
clearInterval(gameInterval);
gameInterval=setInterval(gameLoop,gameSpeed);
}
}

for(let i=index+1;i<snake.cells.length;i++){
if(cell.x===snake.cells[i].x && cell.y===snake.cells[i].y){
gameOver();
}
}

});

}

function gameOver(){
clearInterval(gameInterval);
running=false;
document.getElementById("gameOver").style.display="block";
}

document.addEventListener("keydown",(e)=>{

if(!running) return;

if(e.key==="ArrowLeft" && snake.dx===0){
snake.dx=-grid;
snake.dy=0;
}

else if(e.key==="ArrowUp" && snake.dy===0){
snake.dy=-grid;
snake.dx=0;
}

else if(e.key==="ArrowRight" && snake.dx===0){
snake.dx=grid;
snake.dy=0;
}

else if(e.key==="ArrowDown" && snake.dy===0){
snake.dy=grid;
snake.dx=0;
}

});

document.getElementById("startBtn").onclick=()=>{

if(running) return;

initGame();
running=true;
gameInterval=setInterval(gameLoop,gameSpeed);

};

document.getElementById("restartBtn").onclick=()=>{

initGame();
running=true;

clearInterval(gameInterval);
gameInterval=setInterval(gameLoop,gameSpeed);

};

initGame();