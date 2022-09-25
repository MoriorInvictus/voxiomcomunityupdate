

function handleBgChange(imageUrl){

	updateStorage({
		'voxiomBgImage': imageUrl
	})
	updateHomePageBg();
	

}


function handleResetBg(base64Image){

	updateStorage({
		'voxiomBgImage': base64Image
	})

	updateHomePageBg();

}



function updateHomePageBg() {
	bgImageFromCache = getFromStorage('voxiomBgImage');

	if(bgImageFromCache === undefined) return false;

	bgImageChangeStyles = {

	    "background": `url(${bgImageFromCache}) no-repeat center !important`,
	    "background-size": `cover !important`
	};


	objectToTagStyles('.bNczYf', bgImageChangeStyles);
}

updateHomePageBg();










