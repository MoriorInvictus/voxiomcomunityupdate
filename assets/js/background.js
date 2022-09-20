
function updateStorage(data){
	if(data){
		for (const [key, value] of Object.entries(data)) {
		    chrome.storage.local.set({ key: value });
		}	

	}

	return false;
}

function getFromStorage(storageElement){
	if(storageElement){
		return chrome.storage.local.set(storageElement);	
	}
	return false;
}



