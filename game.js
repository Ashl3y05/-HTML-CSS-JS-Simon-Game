const colorButtons = ["green","red", "yellow","blue"];
let gameStage = 0;
let gameStart = false;

let playerClickChoices = [];
let gameColorChoices = [];
let playerArray = 0;

function gameSequence(gameStage){
    playerClickChoices=[];
    playerArray = 0;

    if (!gameStart){
        addClickEvent();
    }

    $("#level-title").text("Level "+(gameStage+1));

    gameColorChoices.push(randomColorGenerator());

    console.log(gameColorChoices);

    setTimeout(showNextColor,700);
    

}

function addClickEvent(){
    colorButtons.forEach((color)=>{
        $("."+color).on("click", ()=>{
            $("."+color).fadeOut(100).fadeIn(100);
            playerClickChoices.push(color);
            console.log(playerClickChoices);
            playSound(color);
            sequenceCheck();
        })
    });
}

function removeClickEvent(){
    colorButtons.forEach((color)=>{
        $("."+color).off("click")
    });
}

function showNextColor(){
    $("."+gameColorChoices[gameColorChoices.length-1]).addClass("pressed");
    playSound(gameColorChoices[gameColorChoices.length-1]);
    setTimeout(() => {
        $("."+gameColorChoices[gameColorChoices.length-1]).removeClass("pressed");
    }, 200);
}

function playSound(color){
    let sound = new Audio("./sounds/"+color+".mp3")
    sound.play();
    

}
function sequenceCheck(){
    if (playerClickChoices.length != gameColorChoices.length) {
       if(playerClickChoices[playerArray] === gameColorChoices[playerArray]){
            playerArray+=1;
            
       }else{
        removeClickEvent();
        $("#level-title").text("Game Over!");
        $("body").addClass("game-over");
        playSound("wrong");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);
        setTimeout(()=>{
            resetGame();
            $("#level-title").text("Press [Space] to Start");
        },1000);
        
       }
    }else{
        $("#level-title").text("Success!");
        setTimeout(() => {
            
            gameStage+=1;
            gameStart = true;
            gameSequence(gameStage); 
        }, 500);
        
    } 
    console.log(playerArray);
}
function randomColorGenerator(){
    let color = colorButtons[Math.floor(Math.random()*4)];
    return color;
}

function resetGame(){
    playerClickChoices = [];
    gameColorChoices = [];
    gameStart = false;
    gameStage = 0;
    
}
$(document).keydown((key) => { 
    if(!gameStart){
        if(key.key === " "){
            gameSequence(gameStage);
        }
    }
});