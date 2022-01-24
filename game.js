var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];


var gameStarted = false;
var level = 0;

// On keypress, game starts, adding color to game pattern and adding +1 to level
$(document).keypress(function() {
  if (gameStarted == false) {
    gameStarted = true;
    $("h1").text("Level 0");
    nextSequence();
  }
})


// on click, add to userClickedPattern and check
$(".btn").click(function(event) {
  var userChosenColor = event.target.id;
  userClickedPattern.push(userChosenColor);

  checkAnswer(userClickedPattern.length - 1);

  playSound(userChosenColor);
  animatePress(userChosenColor);
})




function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      console.log("correct");
    if (userClickedPattern.length === gamePattern.length) {
      console.log("new sequencing");
      setTimeout(function() {
        nextSequence();
      }, 1000)
    }

} else {
  var wrong = new Audio("sounds/wrong.mp3");
  wrong.play()

  $("body").addClass("game-over");
  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 100);

  $("h1").text("Game Over, Press Any Key to Restart");

  startOver();
}
}


// adds a random color to gamePattern, then adds 1 to level
function nextSequence() {

  userClickedPattern = [];
  level += 1;
  $("h1").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4)
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);


  $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
}



function startOver() {
  level = 0;
  gamePattern = [];
  gameStarted = false;
}





function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("." + currentColor).addClass("pressed");
  setTimeout(function() {
    $("." + currentColor).removeClass("pressed");
  }, 100);
}
