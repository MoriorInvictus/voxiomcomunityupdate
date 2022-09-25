

function handleBorderRadiusUpdate(borderRadius){

	updateStorage({
		'voxiomBorderRadius': borderRadius
	})
	updateBorderRadius();
	

}


function updateBorderRadius() {
	borderRadiusFromCache = getFromStorage('voxiomBorderRadius');

	if(borderRadiusFromCache === undefined) return false;

	borderRadiusChangeStyles = {

	    "border-radius": `${borderRadiusFromCache}px`
	};	

	borderRadiusChangeStylesForChat = {

	    "border-radius": `0 !important`
	};

	borderRadiusChangeStylesForChatInput = {

	    "border-radius": `0 !important`
	};


	objectToTagStyles('#app *:not(.bNczYf):not(.fsQUZP)', borderRadiusChangeStyles);
	objectToTagStyles('#app .sc-cdFzKX.iXWCkR *', borderRadiusChangeStylesForChat);
	objectToTagStyles('#app .sc-cdFzKX.iXWCkR .sc-bgtQTB.gGZKza', borderRadiusChangeStylesForChatInput);
}

updateBorderRadius();










