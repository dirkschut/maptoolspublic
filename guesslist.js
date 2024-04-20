var guessData = [];

var addGuessToList = function (guess) {
  guess.id = generateGUID();
  var guessList = document.getElementById("guessList");
  var newGuess = document.createElement("li");
  var hit = "hit";
  if (guess.hit === false) {
    hit = "miss";
  }
  newGuess.innerHTML = `<button onclick="deleteGuessFromList('${
    guess.id
  }')">X</button> ${hit} | ${guess.radius / 1000} | ${guess.name}`;
  guessList.appendChild(newGuess);
  guessData.push(guess);
};

var deleteGuessFromList = function (id) {
  var guessList = document.getElementById("guessList");
  var guess = guessData.find((guess) => guess.id === id);
  var index = guessData.indexOf(guess);
  map.removeLayer(guess.marker);
  map.removeLayer(guess.circle);
  guessData.splice(index, 1);
  var guessElement = guessList.childNodes[index];
  guessList.removeChild(guessElement);
};

var deleteAllGuesses = function () {
  var guessList = document.getElementById("guessList");
  guessData.forEach((guess) => {
    map.removeLayer(guess.marker);
    map.removeLayer(guess.circle);
  });
  guessData = [];
  guessList.innerHTML = "";
};

var hasCountryBeenGuessed = function (country) {
  var data = guessData.some(
    (guess) => guess.location.country.toLowerCase() === country.toLowerCase()
  );
  return data;
};
