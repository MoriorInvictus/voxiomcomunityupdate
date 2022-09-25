

function handleBgChange(base64Img, imageUrl){

	updateStorage({
		'voxiomBgImage': imageUrl
	})
	updateHomePageBg(base64Img);
	

}


function handleResetBg(base64Image){

	updateStorage({
		'voxiomBgImage': base64Image
	})

	updateHomePageBg(base64Image);

}



function updateHomePageBg(base64Img) {


	bgImageChangeStyles = {

	    "background": `url(${base64Img}) no-repeat center !important`,
	    "background-size": `cover !important`
	};


	objectToTagStyles('.bNczYf', bgImageChangeStyles);
}


function launchUpdatingBg() {
	bgImageFromCache = getFromStorage('voxiomBgImage');
	if(bgImageFromCache === undefined) return false;
	return port.postMessage({ task: 'convertImageToBase64', args: [bgImageFromCache] });
}

launchUpdatingBg(false);










