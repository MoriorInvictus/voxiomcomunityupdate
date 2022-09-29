

function updateGlobalFontSize() {

	globalFontSizeFromCache = getFromStorage('voxiomGlobalFontSize');

	if(globalFontSizeFromCache === undefined) return false;

	globalFontSizeStyle = {

	    "font-size": `${globalFontSizeFromCache}px !important`
	};

	globalFontSizeStyle2 = {

	    "font-size": `${globalFontSizeFromCache}px !important`,
	};
	globalFontSizeStyle3 = {

	    "margin-bottom": `5px`,
	};

	objectToTagStyles('body *', globalFontSizeStyle);
	objectToTagStyles('.sc-ZOtfp.eNTLY *', globalFontSizeStyle);
	objectToTagStyles('.sc-gSQFLo.ixZJA *', globalFontSizeStyle2);
	objectToTagStyles('.sc-gjNHFA.fVHIjH *', globalFontSizeStyle2);
	objectToTagStyles('.sc-lbhJGD.fYyclM', globalFontSizeStyle2);

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





updateGlobalFontSize();