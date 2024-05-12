const clickGuessButtonMiss = function () {
  clickCircleButton([{ radius: 100, hit: false, pin: true }]);
};

const clickGuessButton100 = function () {
  clickCircleButton([
    { radius: 100, hit: true, pin: true },
    { radius: 50, hit: false, pin: false },
  ]);
};

const clickGuessButton50 = function () {
  clickCircleButton([
    { radius: 50, hit: true, pin: true },
    { radius: 20, hit: false, pin: false },
  ]);
};

const clickGuessButton20 = function () {
  clickCircleButton([{ radius: 20, hit: true, pin: true }]);
  if (document.getElementById("enable20RedCircles").checked) {
    clickCircleButton([{ radius: 10, hit: false, pin: true }]);
  }
};

const clickGuessButton10 = function () {
  clickCircleButton([{ radius: 10, hit: true, pin: true }]);
  if (document.getElementById("enable10RedCircles").checked) {
    clickCircleButton([{ radius: 5, hit: false, pin: true }]);
  }
};

const clickGuessButton5 = function () {
  clickCircleButton([{ radius: 5, hit: true, pin: true }]);
};
