
function log(msg){

	return console.log(msg);

}

function toggleClass(el, _className="active"){

	return el.classList.toggle(_className);

}

function removeClass(el, _className="active"){
	if(el){
		return hasClass(el, _className) ? el.classList.remove(_className) : true;
	}
	return false;

}

function hasClass(el, _className="active"){

	if(el.classList.contains(_className)){
		return true;
	} else {
		return false;
	}
	return false;

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

function getAttribute(element, attr, isReturnValue){

	return isReturnValue ? element.attributes[attr].value : element.attributes[attr];

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


function updateFont(fontFamily){

	fullFontChangeStyles = {

	    "font-family": `${fontFamily} !important`,
	};

	objectToTagStyles('html *, body *', fullFontChangeStyles);

}


const updateExternalFontFromUrl = _ => {

	googleFontLink = getFromStorage('newVoxiomFont');

	if(!googleFontLink.includes('https://')) return false;

	if(googleFontLink !== undefined){

		googleFontUrl = googleFontLink.split('(\'')[1].split('\')')[0];

		addStylesheetURL(googleFontUrl);

		fontFamily = getParameterByName(name='family',url=googleFontUrl).split(':')[0];
		updateFont(fontFamily);


	}

}





const handleFontUpdate = url => {

	updateStorage({
		'newVoxiomFont': url
	})
	updateExternalFontFromUrl();

}


const handleResetFont = fontFamilies => {

	updateStorage({
		'newVoxiomFont': fontFamilies
	})
	updateFont(fontFamilies);

}



socket_tasks = {
    'handleFontUpdate': handleFontUpdate,
    'resetFont': handleResetFont,
    'updateGlobalFontSize': handleGlobalFontSizeChanging,
    'handleChatFontSizeChanging': handleChatFontSizeChanging,
};


chrome.runtime.onMessage.addListener(function(request,sender,sendResponse) {
    if (request.task in socket_tasks){
        rslt = socket_tasks[request.task](...request.args);
        sendResponse({result: rslt, task: request.task});
    }
});


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


function updateGlobalFontSize() {

	globalFontSizeFromCache = getFromStorage('voxiomGlobalFontSize');

	if(globalFontSizeFromCache === undefined) return false;

	globalFontSizeStyle = {

	    "font-size": `${globalFontSizeFromCache}px`
	};

	objectToTagStyles('html, body', globalFontSizeStyle);

}

function handleGlobalFontSizeChanging(globalFontSize) {
	updateStorage({
		'voxiomGlobalFontSize': globalFontSize
	})

	updateGlobalFontSize();

}




function handleChatFontSizeChanging(chatFontSize) {
	updateStorage({
		'voxiomChatFontSize': chatFontSize
	})

	upadteChatFontSize();

}



function upadteChatFontSize() {
	chatFontSizeFromCache = getFromStorage('voxiomChatFontSize');

	if(chatFontSizeFromCache === undefined) return false;

	chatFontSize = {

	    "font-size": `${chatFontSizeFromCache}px`
	};


	objectToTagStyles('.sc-jWWnA.ekvAMc span', chatFontSize);
}





updateExternalFontFromUrl();
updateGlobalFontSize();