var guessData = [];

var addGuessToList = function (guess) {
  guess.id = generateGUID();
  var guessList = document.getElementById("guessList");
  var newGuess = document.createElement("li");
  var hit = "<span class='hitText'>hit</span>";
  if (guess.hit === false) {
    hit = "<span class='missText'>miss</span>";
  }
  newGuess.innerHTML = `<button  class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-1 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" onclick="deleteGuessFromList('${
    guess.id
  }')">X</button> ${hit} | ${guess.radius / 1000}km | ${guess.name}`;
  guessList.appendChild(newGuess);
  guessData.push(guess);
  applyGuessListColors();
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
