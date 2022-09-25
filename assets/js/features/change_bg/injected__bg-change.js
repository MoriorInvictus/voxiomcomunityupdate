

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
	if(base64Img){
		bgImageFromCache = base64Img;
	}
	else{
		bgImageFromCache = getFromStorage('voxiomBgImage');
		if(bgImageFromCache === undefined) return false;
		return bgImageFromCache = port.postMessage({ task: 'convertImageToBase64', args: [bgImageFromCache] });

	}



	bgImageChangeStyles = {

	    "background": `url(${bgImageFromCache}) no-repeat center !important`,
	    "background-size": `cover !important`
	};


	objectToTagStyles('.bNczYf', bgImageChangeStyles);
}

updateHomePageBg(false);










