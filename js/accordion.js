//uses classList, setAttribute, and querySelectorAll
//if you want this to work in IE8/9 youll need to polyfill these
(function(){
	var d = document,
	accordionToggles = d.querySelectorAll('.js-accordionTrigger'),
	setAria,
	setAccordionAria,
	switchAccordion,
    touchSupported = ('ontouchstart' in window),
    pointerSupported = ('pointerdown' in window);
  
	skipClickDelay = function(e){
		e.preventDefault();
		e.target.click();
	}

	setAriaAttr = function(el, ariaType, newProperty){
		el.setAttribute(ariaType, newProperty);
	};

	setAccordionAria = function(el1, el2, expanded){
		switch(expanded) {
			case "true":
				setAriaAttr(el1, 'aria-expanded', 'true');
				setAriaAttr(el2, 'aria-hidden', 'false');
				break;
			case "false":
				setAriaAttr(el1, 'aria-expanded', 'false');
				setAriaAttr(el2, 'aria-hidden', 'true');
				break;
			default:
				break;
		}
	};

	//function
	switchAccordion = function(e) {
	console.log("triggered");
		e.preventDefault();
		var thisAnswer = e.target.parentNode.nextElementSibling;
		var thisQuestion = e.target;
		if(thisAnswer.classList.contains('is-collapsed')) {
			setAccordionAria(thisQuestion, thisAnswer, 'true');
			$("#div-legend").css("top", "auto");
			$(".panel-support-maps").css("height", "85%");
			$(".div-steps").css("position", "relative");
			$(".tabcontent-inf").css("max-height", "35rem");
		} else {
			setAccordionAria(thisQuestion, thisAnswer, 'false');
			//$("#div-legend").css("top", "15rem");
			$("#div-legend").css("top", "93%");
			$(".panel-support-maps").css("height", "auto");
			$(".div-steps").css("position", "unset");
			$(".tabcontent-inf").css("max-height", "29.5rem");
		}
	
		//$("#div-legend").toggleClass('legend-opened');
		//setCurrentTab();

		thisQuestion.classList.toggle('is-collapsed');
		thisQuestion.classList.toggle('is-expanded');
		thisAnswer.classList.toggle('is-collapsed');
		thisAnswer.classList.toggle('is-expanded');
		thisAnswer.classList.toggle('animateIn');
	};

	for (var i=0,len=accordionToggles.length; i<len; i++) {
		if(touchSupported) {
			accordionToggles[i].addEventListener('touchstart', skipClickDelay, false);
		}
		if(pointerSupported){
			accordionToggles[i].addEventListener('pointerdown', skipClickDelay, false);
		}

		accordionToggles[i].addEventListener('click', switchAccordion, false);
	}
})();

/* FUNCIONA INTERNAMENTE NA DIV, MAS NAO NA TAB
	(function(){
		var d = document,
		tabToggles = d.querySelectorAll('.js-tabTrigger'),
		tabTrigger,
		touchSupported = ('ontouchstart' in window),
		pointerSupported = ('pointerdown' in window);

		skipClickDelay = function(e){
			e.preventDefault();
			e.target.click();
		}

		//function
		tabTrigger = function(e) {
			console.log("triggered");
			e.preventDefault();
			
			setCurrentTab();
		};

		for (var i=0,len=tabToggles.length; i<len; i++) {
			if(touchSupported) {
				tabToggles[i].addEventListener('touchstart', skipClickDelay, false);
			}
			if(pointerSupported){
				tabToggles[i].addEventListener('pointerdown', skipClickDelay, false);
			}

			tabToggles[i].addEventListener('click', tabTrigger, false);
		}

	})();
*/
