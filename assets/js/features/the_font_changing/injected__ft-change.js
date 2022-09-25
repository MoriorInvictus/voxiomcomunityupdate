

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

updateExternalFontFromUrl();









