/*
 * jQuery AlexStetsonize Plugin
 */

(function($) {
  $.fn.alexStetsonize = function(options) {
    var defaults = {
      enterOn: 'click'
    };
    var options = $.extend(defaults, options);
    return this.each(function() {
      var _this = $(this);
      var audioSupported = false;
      if ($.browser.mozilla && $.browser.version.substr(0, 5) >= "1.9.2" || $.browser.webkit) {
        audioSupported = true;
      }
      var alexImageMarkup = '<img id="AlexStetson" style="display: none" src="images/alex-stetson.png" />'
      var alexAudioMarkup = '<audio id="AlexStetsonShriek" preload="auto"><source src="images/alex-sound.mp3" /><source src="images/alex-sound.ogg" /></audio>';
      var locked = false;
      $('body').append(alexImageMarkup);
      if(audioSupported) { $('body').append(alexAudioMarkup); }
      var alex = $('#AlexStetson').css({
        "position":"fixed",
        "bottom": "-700px",
        "right" : "0",
        "display" : "block"
      })
      function init() {
        locked = true;
        if(audioSupported) {
          function playSound() {
            document.getElementById('AlexStetsonShriek').play();
          }
          playSound();
        }
        alex.animate({
          "bottom" : "0"
        }, function() {
          $(this).animate({
            "bottom" : "-130px"
          }, 100, function() {
            var offset = (($(this).position().left)+400);
            $(this).delay(300).animate({
              "right" : offset
            }, 2200, function() {
              alex = $('#AlexStetson').css({
                "bottom": "-700px",
                "right" : "0"
              })
              locked = false;
            })
          });
        });
      }
      if(options.enterOn == 'click') {
        _this.bind('click', function(e) {
          e.preventDefault();
          if(!locked) {
            init();
          }
        })
      }
    });
  }
})(jQuery);