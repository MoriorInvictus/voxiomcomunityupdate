

function handleCrosshairChanging(base64Img){

	if(!base64Img){
		base64Img = '';
	}



	updateStorage({
		'voxiomDefaultCrosshair': base64Img
	})
	updateCrossHair(base64Img);
	

}






function updateCrossHair(base64Img) {

	existedCrossHairs = getElements('.custom-crosshair');
	if(existedCrossHairs.length > 0){
		existedCrossHairs.forEach(crosshair => {
			if(crosshair){
				try{
					crosshair.remove();
				} catch(e){
					
				}
			}
		})
	}

	if(!base64Img){
		return false;
	}


	newCrossHair = document.createElement("img");
	addClass(newCrossHair, 'custom-crosshair');
    newCrossHair.src = base64Img;
    newCrossHair.onload = _ => {
		crossHairStyle = {

		    "position": 'fixed !important',
		    "top": '50%',
		    "left": '50%',
		    "transform": 'translate(-50%, -50%)',
		    "z-index": '1',
		    "opacity": '1',

		};

		newCrossHair.style.cssText = objectToCssTextStyles(crossHairStyle);

		appendToElement('#app', newCrossHair);
    }



}




waitForElm('.sc-frCSdB').then((elm) => {
	customGameSniperCrossHair = getElement('.sc-frCSdB');

	if(customGameSniperCrossHair){

	    const customCrossHairconfig = {
	        attributes: true
	     };
	    const customCrossHairCallback = function(mutationsList, observer) { 
	    	for (let mutation of mutationsList) { 
	    		if (mutation.type === 'attributes') { 
	    			if(customGameSniperCrossHair.style.opacity == '1'){
	    				getElement('.custom-crosshair').style.opacity = '0';
	    			} else{
	    				getElement('.custom-crosshair').style.opacity = '1';
	    			}
	    		   
	    		 }
	    	 }
	     };
	    
	    const customCrossHairObserver = new MutationObserver(customCrossHairCallback);
	    
	    customCrossHairObserver.observe(customGameSniperCrossHair, customCrossHairconfig);

	}

});



function launchUpdatingCrossHair() {
	bgImageFromCache = getFromStorage('voxiomDefaultCrosshair');
	if(bgImageFromCache === undefined) return updateCrossHair(false);
	updateCrossHair(bgImageFromCache);
}

launchUpdatingCrossHair(false);










