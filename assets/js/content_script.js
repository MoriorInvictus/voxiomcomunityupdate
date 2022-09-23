

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