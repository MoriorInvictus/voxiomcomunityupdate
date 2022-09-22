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


async function sendMessageToActiveTab(messageArgs, callback) {
    let queryOptions = { active: true, currentWindow: true };
    let tab = await chrome.tabs.query(queryOptions);
    chrome.tabs.sendMessage(tab[0].id, messageArgs, callback);

    return true;

}


const _DEFAULT_INPUT_VALUE = 15;




clearInputsControls = getElements('button.clear-btn');
if(clearInputsControls.length > 0){

	clearInputsControls.forEach(clearInput => {

		handleEvent(clearInput, clickEvent, e =>{


			inps = getElements('input', getParent(clearInput, 2));
			inps.forEach(inp => {
				inp.value = '';
			})



		})


	})


}

function updateStorage(data, callback){
	if(data){
	    chrome.storage.local.set(data, callback);
	}

	return false;
}

function getFromStorage(storageElement, callback){
	if(storageElement){
		return chrome.storage.local.get(storageElement, callback);
	}
	return false;
}



let globalFontSize = 15;


const maxNumberRestriction = el => {

	el = el.target;
	if(parseInt(el.value) > 80){
		el.value = 80;
	}
	if(parseInt(el.value) < 0){
		el.value = 0;
	}

	if(el.value.length > 2){
		el.value = el.value.slice(0,2);
	}
	

};


fontsSizeInputs = getElements('.fonts-wrapper input[type="number"]');
if(fontsSizeInputs && fontsSizeInputs.length > 0){

	fontsSizeInputs.forEach(fontSizeInput => {
		fontSizeInput.onchange = maxNumberRestriction;
	})

}


function initInputUpdateHandlers(inputsUpdates) {
	inputsUpdates.forEach(inputUpdates => {

		currentUpdateBtn = getElementById(inputUpdates.updateBtnId);
		if(currentUpdateBtn){
			currentUpdateBtn.onclick = async function(e) {
				currentUpdateInput = getElementById(inputUpdates.inputId);
				if(currentUpdateInput && currentUpdateInput.value){
					newInputValue = currentUpdateInput.value;
				} else {
					newInputValue = _DEFAULT_INPUT_VALUE;
				}
				if(inputUpdates.updateLocalStorageBeforeSending){
					currentInputUpdateStorageItem = inputUpdates.localStorageItem;
					updateStorage({currentInputUpdateStorageItem:newInputValue}, inputUpdates.callback);
				}
				await sendMessageToActiveTab({ task: inputUpdates.taskUpdateName, args: [newInputValue] }, inputUpdates.callback);
			}
		}



	})
}

function initInputResetHandlers(inputsUpdates) {
	inputsUpdates.forEach(inputUpdates => {

		currentResetBtnUpdate = getElementById(inputUpdates.resetBtnId);
		if(currentResetBtnUpdate){
			currentResetBtnUpdate.onclick = async function(e) {
				if(inputUpdates.updateLocalStorageBeforeSending){
					currentInputUpdateStorageItem = inputUpdates.localStorageItem;
					newInputValue = inputUpdates.resetTaskArgs[0];
					updateStorage({currentInputUpdateStorageItem:newInputValue}, inputUpdates.callback);
				}		
				await sendMessageToActiveTab({ task: inputUpdates.taskResetName, args: inputUpdates.resetTaskArgs }, inputUpdates.callback);
			}
		}

	})
}

function initInputUpdateHandlersCurrentValue(inputsUpdates) {
	for (const inputUpdates of inputsUpdates) {
		currentUpdateInput = getElementById(inputUpdates.inputId);
		if(currentUpdateInput){
			currentUpdateInputStorageItem = getFromStorage(inputUpdates.localStorageItem, inputUpdates.getLocalStorageItemCallback);
			if(currentUpdateInputStorageItem && currentUpdateInputStorageItem !== undefined){
				currentUpdateInput.value = currentUpdateInputStorageItem;
			}
		}

	}
}

inputUpdateTasks = [
	
	{
		'updateBtnId': 'change-font',
		'resetBtnId': 'resetFontBtn',
		'inputId': 'googleFontLink',
		'taskUpdateName': 'handleFontUpdate',
		'taskResetName': 'resetFont',
		'resetTaskArgs': ['lato,Helvetica,sans-serif'],
		'updateLocalStorageBeforeSending': true,
		'updateLocalStorageItemCallback': _ => {log('Storage was updated;')},
		'getLocalStorageItemCallback': result => {log('Value currently is ' + result.key)},
		'localStorageItem': 'newVoxiomFont',
		'callback': response => {log('Done')},
	},
	{
		'updateBtnId': 'changeFontGlobalSizeBtn',
		'resetBtnId': 'resetFontGlobalSizeBtn',
		'inputId': 'globalFontSize',
		'taskUpdateName': 'updateGlobalFontSize',
		'taskResetName': 'updateGlobalFontSize',
		'updateLocalStorageBeforeSending': true,
		'updateLocalStorageItemCallback': _ => {log('Storage was updated;')},
		'getLocalStorageItemCallback': result => {log('Value currently is ' + result.key)},		
		'resetTaskArgs': [_DEFAULT_INPUT_VALUE],
		'localStorageItem': 'voxiomGlobalFontSize',
		'callback': response => {log('Done')},
	},	
	{
		'updateBtnId': 'changeChatMessageFontSizeBtn',
		'resetBtnId': 'resetChatMessageFontSize',
		'inputId': 'changeChatMessageFontSize',
		'taskUpdateName': 'handleChatFontSizeChanging',
		'resetTaskArgs': [_DEFAULT_INPUT_VALUE],
		'updateLocalStorageBeforeSending': true,
		'updateLocalStorageItemCallback': _ => {log('Storage was updated;')},
		'getLocalStorageItemCallback': result => {log('Value currently is ' + result.key)},		
		'taskResetName': 'handleChatFontSizeChanging',
		'localStorageItem': 'voxiomChatFontSize',
		'callback': response => {log('Done')},
	},

];


initInputUpdateHandlers(inputUpdateTasks);
initInputResetHandlers(inputUpdateTasks);
// initInputUpdateHandlersCurrentValue(inputUpdateTasks);

