
socket_tasks = {
    'updateLocalStorage': updateStorage,
    'getItemFromLocalStorate': getFromStorage
};





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
