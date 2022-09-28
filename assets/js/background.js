

async function sendMessageToActiveTab(messageArgs, callback) {
    let queryOptions = { active: true, currentWindow: true };
    let tab = await chrome.tabs.query(queryOptions);
    chrome.tabs.sendMessage(tab[0].id, messageArgs, callback);

    return true;

}




chrome.runtime.onConnect.addListener(function(port) {
  	port.onMessage.addListener(async function(msg) {
	    if (msg.task in socket_tasks){
            try{
    	        rslt = await socket_tasks[msg.task](...msg.args);
    	        port.postMessage({result: rslt, task: msg.task});
            }
            catch(e){
                return false;
            }
	    }
  	});
})


const convertImageToBase64Image = async (url) => {
    const data = await fetch(url)
    const blob = await data.blob();
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onload = async () => {
        const base64data = await reader.result;
        try{
            return await sendMessageToActiveTab({ task: 'handleBgChanging', args: [base64data, url] }, _ => {console.log('must to update')})
        } catch(e){
            return false;
        }
    }
}




















socket_tasks = {
    'convertImageToBase64': convertImageToBase64Image,
};
