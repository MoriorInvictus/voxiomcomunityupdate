clickEvent = (function() {
	if ('ontouchstart' in document.documentElement === true)
		return 'touchstart';
	else{
		return 'click';
	}
})();



function hasClass(el, _className="active"){

	if(el.classList.contains(_className)){
		return true;
	} else {
		return false;
	}
	return false;

}

function isThisTag(el, _tagName){

	if(el.tagName == _tagName.toString().toUpperCase()){
		return true;
	} else {
		return false;
	}
	return false;

}

function toggleClassToParent(el, _className="active"){

	return el.parentElement.classList.toggle(_className);

}


function removeClass(el, _className="active"){
	if(el){
		return hasClass(el, _className) ? el.classList.remove(_className) : true;
	}
	return false;

}

function addClass(el, _className="active"){
	if(el){
		return !hasClass(el, _className) ? el.classList.add(_className) : true;
	}
	return false;
}


function getParent(el, idx){

	previouslyParent = el.parentElement;
	for (let index = 0; index < idx - 1; index++) {
		previouslyParent = previouslyParent.parentElement;
		
	}
	return previouslyParent;


}


function clearInputs(with_selector=false, el=false,idx=false){


	if(with_selector){

		elements = getElements(with_selector);

	} else {
		neededParent = getParent(el, idx);
		elements = getElements(neededParent, 'input');
	}
	elements.forEach(inp => {

		if(inp.type == "checkbox"){
			inp.checked = false;
		} else if(hasClass(inp)){
			removeClass(inp);
		}

	})


}

function getElement(target, targetFrom=false){

	return targetFrom ? targetFrom.querySelector(target) : document.querySelector(target);

}


function getElements(target, targetFrom=false){

	return targetFrom ? [...targetFrom.querySelectorAll(target)] : [...document.querySelectorAll(target)];

}



function getElementById(target, targetFrom=false){

	return targetFrom ? targetFrom.getElementById(target) : document.getElementById(target);

}

function handleEvent(event_target, event_type, callback){

	event_target.addEventListener(event_type, callback);

}


function checkboxToggle(target){
	return target.checked = !target.checked;
}


function checkboxCheck(target){
	return target.checked = true;
}


function checkboxUnCheck(target){
	return target.checked = false;
}


function checkboxChecker(target){
	return target.checked;
}

function toggleClass(el, _className="active"){

	return el.classList.toggle(_className);

}

function clearArray(arr, _className="active"){

	return arr.forEach(ar => {hasClass(ar, _className) ? removeClass(ar, _className) : "";});

}


function fillArrayWithClassName(arr, _className="active"){

	return arr.forEach(ar => {addClass(ar, _className)});

}


function delay(callback, time){

	return (callback instanceof Function) ? setTimeout(callback, time) : setTimeout(function(){callback }, time);

}


function log(msg){

	return console.log(msg);

}


function onClick(selector, callback){

	return handleEvent(getElement(selector), clickEvent, callback);

}

function getClosest(element, selector){
	return element.closest(selector);
}


function getAttribute(element, attr, isReturnValue){

	return isReturnValue ? element.attributes[attr].value : element.attributes[attr];

}




const toggleableElements = getElements('.toggle-element');

function handleToggleElement(tg){
	toggleElement = getElement(`.${tg.attributes['data-toggle_element'].value}`);
	isClear = tg.attributes['data-toggle_clear'] ? true : false;

	if(isClear){

		laterQuit = false;
		if(hasClass(tg)){
			laterQuit = true;
		}

		whatToClear = getAttribute(tg, 'data-toggle_clear', true).split(';');
		clearArray(getElements(whatToClear[0]));
		clearArray(getElements(whatToClear[1]));


	}

	if(hasClass(tg, 'disable-switch')){
		clearInputs(with_selector='label.switch input[type="checkbox"]');
	}

	if(toggleElement){
		toggleClass(toggleElement);
		toggleClass(tg);
		if(hasClass(tg, 'hidebody')){
			toggleClass(getElement('body'), 'oh');
		}
	}

}

if(toggleableElements){


	toggleableElements.forEach(tg => {

		handleEvent(tg, clickEvent, e =>{


			if(hasClass(tg, 'with-delay')){
				setTimeout(()=>{handleToggleElement(tg)}, 300);
			} else{
				handleToggleElement(tg);
			}



		})


	})


}


function objectToTagStyles(selector, styles){

	if(styles){
		var style = document.createElement('style');
		resonanceCssString = `${selector} {`;

		for (const [key, value] of Object.entries(styles)) {
		    resonanceCssString += `${key}:${value};`;
		}

		resonanceCssString += "}";

		if (style.styleSheet) {
		    style.styleSheet.cssText = resonanceCssString;
		} else {
		    style.appendChild(document.createTextNode(resonanceCssString));
		}

		document.getElementsByTagName('head')[0].appendChild(style);
		return true;
	}

	return false;

}

function objectToCssTextStyles(styles){

	if(styles){
		resonanceCssString = '';

		for (const [key, value] of Object.entries(styles)) {
		    resonanceCssString += `${key}:${value};`;
		}

		return resonanceCssString;

	}

	return false;

}

function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}


function addStylesheetURL(url) {

	let link = document.createElement('link');
	link.rel = 'stylesheet';
	link.href = url;
	document.getElementsByTagName('head')[0].appendChild(link);
	return url
}


async function sendMessageToActiveTab(messageArgs, callback) {
    let queryOptions = { active: true, currentWindow: true };
    let tab = await chrome.tabs.query(queryOptions);
    chrome.tabs.sendMessage(tab[0].id, messageArgs, callback);

    return true;

}


function updateStorage(data){
	if(data){
		for (const [key, value] of Object.entries(data)) {
		    localStorage.setItem(key, value);
		}	

	}

	return false;
}

function getFromStorage(storageElement){
	if(storageElement){
		return localStorage.getItem(storageElement);	
	}
	return false;
}


function appendToElement(appendParentElement,childElementToAppend) {
    elementToAppend = appendParentElement;
    if(typeof appendParentElement === 'string' || appendParentElement instanceof String){
        elementToAppend = getElement(appendParentElement)  
    }

    return elementToAppend.appendChild(childElementToAppend);
}

function waitForElm(selector) {
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }

        const observer = new MutationObserver(mutations => {
            if (document.querySelector(selector)) {
                resolve(document.querySelector(selector));
                observer.disconnect();
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
}