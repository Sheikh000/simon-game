let gameSeq=[];
let userSeq=[];

let btns=["yellow","red","purple","green"];

let started=false;
let level=0;

let h2=document.querySelector("h2");
function gameStart(){
    let gs=document.getElementById("game-start").play();
}
function gameOver(){
    let go=document.getElementById("game-over").play();
}
function userClick(){
    let uc=document.getElementById("user-click").play();
}
function btnflash(){
    let bf=document.getElementById("btn-flash").play();
}

function startGame() {
    gameStart(); 
    if (!started) {
        started = true;
        levelup();
    }
}


document.addEventListener("touchstart", startGame);


document.addEventListener("keypress",function(){
    gameStart();
    if(started==false){
        started=true;
    }
    levelup();
})

function gameFlash(btn){
    btnflash();
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash")
    },250);
}

function userFlash(btn){
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash")
    },250);
}

function levelup(){
    userSeq=[];
    level++;
    h2.innerText=`Level ${level}`;

    let randIdx=Math.floor(Math.random()*4);
    let randColor=btns[randIdx];
    let randBtn=document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    gameFlash(randBtn);

}
function checkAns(idx){
    
    if(userSeq[idx]===gameSeq[idx]){
        if(userSeq.length==gameSeq.length){
            setTimeout(levelup, 1000);
        }
    }
    else{
        h2.innerHTML=`Game Over! Your score was <b>${level}</b> <br> Press any key to start again `;
        document.querySelector("body").style.backgroundColor="red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor="white";
        },150);
        gameOver();
        reset();
    }

}
function btnPress(){
    userClick();
    let btn=this;
    userFlash(btn);

    userColor=btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length-1);
}

let allBtns=document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click",btnPress);

}
 function reset(){
    started=false;
    gameSeq=[];
    userSeq=[];
    level=0;
 }