const port = chrome.runtime.connect({name: "injected"});

port.onMessage.addListener(function(msg) {
	log(msg)
});
