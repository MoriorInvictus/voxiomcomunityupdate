

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





dateGlobalFontSize();