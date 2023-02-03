const form = document.forms[0];

const answers = [{
    Color: 'BLUE'
  },
  {
    Color: 'RED'
  },
  {
    Color: 'GREEN'
  },
  {
    Color: 'YELLOW'
  },
  {
    Color: 'CYCAN'
  },
  {
    Color: 'WHITE'
  },
  {
    Color: 'BLACK'
  },
  {
    Color: 'PINK'
  
  }
];

const randAns = answers[random(answers)];
const randCat = Object.keys(randAns);
const randWord = Object.values(randAns)[0];
const wrdLetters = randWord.split('');
wrdLetters.map(function(x) {
  return x.toUpperCase()
})
const wrdLength = wrdLetters.length;

function random(arr) {
  return Math.floor(Math.random() * arr.length);
}
const prevGuesses = [];
const inputs = form.querySelectorAll('input[type=text]');


document.querySelector('.hint').innerText = 'Hint: ' + randCat;


(function newGame() {

  var count = 0;

 
  (function displayBoxes() {
    for (i = 0; i < wrdLength; i++) {
      const wrdBox = document.querySelector('.word');
      const newDiv = document.createElement('div');
      newDiv.className = 'ltrbox';
      newDiv.innerHTML = '<span class="ltr"></span>';
      wrdBox.appendChild(newDiv);
    }
  })();

  function clearMsgDiv() {
    timeoutId = setTimeout(function() {
      document.querySelector('.message').innerHTML = '';
    }, 3000);
  }


 
  form.addEventListener('submit', function(event) {
    event.preventDefault(); 
    var guess = document.querySelector('#guessForm').value;

   
    for (var i = 0; i < inputs.length; i++) {
      if (prevGuesses.indexOf(inputs[i].value) != -1) {
        inputs[i].style.backgroundColor = "#ffd4de";
        document.querySelector('.message').innerHTML = "<span class='msgfade'><i class='fa fa-exclamation-triangle' aria-hidden='true'></i> Guess Must Be Unique </span>";
        clearMsgDiv();

        form.guessForm.value = ''; 
        return false;
      } else
        prevGuesses.push(inputs[i].value);
      i++;
      document.querySelector('.sofar').classList.remove('hidden');
      document.querySelector('.guessedltrs').innerHTML = prevGuesses.join(" | ");
    }

    for (var j = 0; j < inputs.length; j++) {
      inputs[j].addEventListener('focus', function() {
        this.style.backgroundColor = "white";
      });
    }


    if (guess == " " || guess == null || guess == parseInt(guess, 10)) {
      document.querySelector('.message').innerHTML = "<span class='msgfade'><i class='fa fa-exclamation-triangle' aria-hidden='true'></i>Guess Must Be a Letter</span>";
      clearMsgDiv();
      form.guessForm.value = ''; 
      return false;
    } else {

     
      var re = new RegExp('[' + randWord + ']', 'gi');
      var guessMatch = re.test(guess);
      if (guessMatch) {
        count++;

        
        var ltrOccur = [];
        var idx = wrdLetters.indexOf(guess);
        while (idx != -1) {
          ltrOccur.push(idx);
          idx = wrdLetters.indexOf(guess, idx + 1);
        }

        
        var ltrBoxes = document.querySelectorAll('.ltrbox');
        for (let i = 0; i < ltrOccur.length; i++) {
         
          var index = ltrOccur[i];
          ltrBoxes[index].innerHTML = '<div class="ltr">' + wrdLetters[index] + '</div>';
        }

      } else {
        document.querySelector('.message').innerHTML = "<span class='msgfade'><i class='fa fa-exclamation-triangle' aria-hidden='true'></i>Nope, Guess Again!</span>";
        clearMsgDiv();
      };

      
      var unique = wrdLetters.filter(function(elem, index, self) {
        return index == self.indexOf(elem);
      });

      if (count === unique.length) {
        document.querySelector('.formWrap').innerHTML = '<div class="youwin"><i class="fa fa-trophy" aria-hidden="true"></i>You Win!</div><button class="newgamebtn" onclick="location.reload()">New Game</button>';


        const newGameBtn = document.querySelector('.newgamebtn');

        for (var i = answers.length - 1; i >= 0; i--) {
          if (answers[i] === randAns) {
            answers.splice(i, 1);
            break;
          }
        }

      }

      form.guessForm.value = '';
    }

  }); 

})(); 