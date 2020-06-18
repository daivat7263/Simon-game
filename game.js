var buttonColours =["red", "blue", "green", "yellow"];
var gamePattern=[];
var userClickedPattern =[];

var started = false;

var level = 0;

$(document).keypress(function()
{
    if(!started)
    {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

$(".btn").click(function(){
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    
    
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
});

// Condition-function
function checkAnswer(currentLevel)
{
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel])
    {
        console.log("Success");
        
        if(userClickedPattern.length===gamePattern.length)
        {  
            setTimeout(function()
            {
                nextSequence();
            },1000);
        }
    }    
    else
    {
        console.log("Wrong");
        $("#level-title").text("Game Over, Press Any Key to Restart");

        playSound("wrong");

        $("body").addClass("game-over");
    setTimeout(function()
        {
            $("body").removeClass("game-over");
        },2000);

        startOver();
    }
    
    
}

// Game-Function
function nextSequence()
{
    userClickedPattern = [];
    level++;

    $("#level-title").text("Level " + level);

    var randomnumber= Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomnumber];
    gamePattern.push(randomChosenColour);
    
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);
}
// Sound
function playSound(name)
{
    var audio = new Audio("/sounds/"+ name +".mp3");
    audio.play();
}

// Animation
function animatePress(currentColour)
{
    $("#"+ currentColour).addClass("pressed");

    setTimeout(function()
    {
        $("#"+ currentColour).removeClass("pressed"); 
    },100);

}
// Restart-Game

function startOver()
{
    level=0;
    gamePattern=[];
    userClickedPattern =[];
    started = false;
}

