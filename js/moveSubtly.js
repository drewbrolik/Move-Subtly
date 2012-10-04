(function($) {

	$.fn.moveSubtly = function(additionalOptions) {
		
		$(this).each(function() { //- do it for 'em all
			
			var $this = $(this); //- get this variable for later
		
			$this.load(function() { //- wait until this image is ready
				
				var imgWidth = $this.width(); //- get image width and height
				var imgHeight = $this.height();
				
				var imgUnit = $this.css("width"); //- check for percentage-based image sizes (TO DO: account for ems, and other units)
				if (imgUnit.indexOf("%") > 0) {
					imgWidth += "%";
				} else {
					imgWidth += "px";
				}
				
				var imgPosition = $this.css("position"); //- get position to apply to outer div
				if (!imgPosition || imgPosition == "static") { imgPosition = "relative"; } //- set position to 'relative' if there is no position set
				
				var containerCSS = { //- set default CSS needed to make container work
					display:"inline-block",
					width:imgWidth,
					height:imgHeight,
					position:imgPosition,
					overflow:"hidden"
				}
				
				if ($this.attr("style")) { //- if the image has styles, get all styles and apply them to the container div
					var imgCSS = $this.attr("style");
					imgCSS = imgCSS.substring(0,imgCSS.length-1);
					var styles = imgCSS.split('; ');
					// use just ; (no space) then remove spaces (or remove spaces first)
												
					var imgCSSobj = {}; //- convert image css from a string into an object
					styles.forEach(function(style) {
						var tup = style.split(':');
						imgCSSobj[tup[0]] = tup[1].toString();
					});
									
					containerCSS = $.extend(containerCSS,imgCSSobj); //- merge styles
									
					containerCSS["overflow"] = "hidden"; //- overflow has to be hidden, so we override that as a last step
					
				}
				
				$this.removeAttr("style"); //- remove styles from image because they're on the container now
				$this.css({"position":"absolute","z-index":"1","width":"100%","height":"100%"}).wrap("<div class='move-subtly' />"); //- set some css on the image and then wrap it with a div container
				$this.parent("div").css(containerCSS);
				
				var imgRatio = parseInt(containerCSS.width)/parseInt(containerCSS.height);
				if (containerCSS.width.indexOf("%") > 0) { $this.parent("div").addClass("move-subtly-scale").attr("data-ratio",imgRatio); } //- add a class if the image should scale (if width is a percentage), then add the image ratio to scale by as a data- attribute
				
				moveSubtly($this); //- set the image in motion
				
			});
			
		});
		
		var options = { //- set default options
			moveTime:4000,
			stillTime:2000,
			sizeChange:"6%",
			lockSide:"random",
			loop:true,
		}
		
		options = $.extend(options, additionalOptions ); //- override user-supplied options
		
		var $this = $(this);
		
		function moveSubtly($this) {
			
			var direction;
			if (options.lockSide == "left" || options.lockSide == "right" || options.lockSide == "top" || options.lockSide == "bottom") { //- user specified direction
				direction = options.lockSide;
			} else { //- choose a random side to lock each time we loop through
				var directions = new Array("left","right","top","bottom");
				var randomNumber = Math.floor(Math.random()*4);
				direction = directions[randomNumber];
			}
			var directionCSS = {};
			directionCSS[direction] = "0px";
			
			$this.css({"left":"","right":"","top":"","bottom":""}).css(directionCSS); //- clear previous locked side and set new one
			
			$this.animate({"width":"+="+options.sizeChange,"height":"+="+options.sizeChange},{duration:options.moveTime,complete:function() { //- start the motion
				
				$this.clone().insertAfter($this).css({"z-index":"0"}).hide(); // "right":"0px", //- not used, but creates a cross dissolve effect
				$this.fadeOut(options.stillTime);
				$this.siblings("img").show();
				setTimeout(function() {
					$this.siblings("img").animate({"width":"-="+options.sizeChange,"height":"-="+options.sizeChange},{duration:options.moveTime,complete:function() {
						$this.remove();
						$this = $(this);
						setTimeout(function() { moveSubtly($this); },options.stillTime);
					}});
				},options.stillTime);
			}});
		}
		
		$(window).resize(function() { //- resize images that were set to percentage heights, simulating percentage scaling
			$(".move-subtly-scale").each(function() {
				var imgRatio = $(this).attr("data-ratio");
				var newHeight = $(this).width()-($(this).width()*imgRatio);
				$(this).css("height",newHeight+"px");
			});
		});
		
		return this;
	};
	
})(jQuery);