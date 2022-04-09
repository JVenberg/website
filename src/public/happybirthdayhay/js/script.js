(function($){
  $(function(){
    $('.parallax').parallax();
  }); // end of document ready
})(jQuery); // end of jQuery name space

"use strict";
(function() {
  let confetti;
  let birthdaySong;
  let partyStarted = false;

  window.onload = function() {
    $("toggle-party-btn").onclick = toggleParty;
  };

  function toggleParty() {
    if (partyStarted) {
      confetti.clear();
      $("toggle-party-btn").innerHTML = "Get Party Started!";
      birthdaySong.pause();
      $("hb-header").classList.remove("blink");
      this.classList.add("pulse");
    } else {
      birthdaySong = new Audio('resources/HappyBirthdayHailey.mp3');
      birthdaySong.addEventListener('ended', function() {
        this.currentTime = 0;
        this.play();
      }, false);
      birthdaySong.play();
      $("hb-header").classList.add("blink");
      this.classList.remove("pulse");
      let confettiSettings = {
        "target": 'confetti',
        "max":"80",
        "size":"2",
        "props":["circle","square","triangle","line"],
        "clock":"40"
      };
      confetti = new window.ConfettiGenerator(confettiSettings);
      confetti.render();
      $("toggle-party-btn").innerText = "Stop Party :(";
    }
    partyStarted = !partyStarted;
  }

  function $(id) {
    return document.getElementById(id);
  }
})();