


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

