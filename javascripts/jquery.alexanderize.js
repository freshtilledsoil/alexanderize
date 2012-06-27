/*
 * jQuery Alexanderize Plugin
 */


(function($) {

  $.fn.alexanderize = function(options) {

    //Yo' defaults
    var defaults = {  
      enterOn: 'click', //timer, konami-code, click
      delayTime: 5000 //time before raptor attacks on timer mode
    };  
        
    //Extend those options
    var options = $.extend(defaults, options); 
	
    return this.each(function() {
			var _this = $(this);
			var audioSupported = false;
			//Stupid Browser Checking which should be in jQuery Support
			if ($.browser.mozilla && $.browser.version.substr(0, 5) >= "1.9.2" || $.browser.webkit) { 
				audioSupported = true;
			}
			
			//Alex Vars
			var alexImageMarkup = '<img id="Alex" style="display: none" src="alex.png" />'
			var alexAudioMarkup = '<audio id="AlexShriek" preload="auto"><source src="alex-sound.mp3" /><source src="alex-sound.ogg" /></audio>';	
			var locked = false;
			
			//Append Alex and Style
			$('body').append(alexImageMarkup);
 			if(audioSupported) { $('body').append(alexAudioMarkup); }
			var alex = $('#Alex').css({
				"position":"fixed",
				"bottom": "-700px",
				"right" : "0",
				"display" : "block"
			})
			
			// Animating Code
			function init() {
				locked = true;
				if(audioSupported) { 
					function playSound() {
						document.getElementById('AlexShriek').play();
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
							alex = $('#Alex').css({
								"bottom": "-700px",
								"right" : "0"
							})
							locked = false;
						})
					});
				});
			}
			
			
			//Determine Entrance
			if(options.enterOn == 'timer') {
				setTimeout(init, options.delayTime);
			} else if(options.enterOn == 'click') {
				_this.bind('click', function(e) {
					e.preventDefault();
					if(!locked) {
						init();
					}
				})
			} else if(options.enterOn == 'konami-code'){
			    var kkeys = [], konami = "38,38,40,40,37,39,37,39,66,65";
			    $(window).bind("keydown.alex", function(e){
			        kkeys.push( e.keyCode );
			        if ( kkeys.toString().indexOf( konami ) >= 0 ) {
			        	init();
			        	$(window).unbind('keydown.alex');
			        }
			    }, true);
			}
    });//each call
  }//orbit plugin call
})(jQuery);