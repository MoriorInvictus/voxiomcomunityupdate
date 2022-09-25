socket_tasks = {
    'handleFontUpdate': handleFontUpdate,
    'resetFont': handleResetFont,
    'updateGlobalFontSize': handleGlobalFontSizeChanging,
    'handleChatFontSizeChanging': handleChatFontSizeChanging,
    'handleBgChanging': handleBgChange,
    'handleResetBg': handleResetBg,
    'handleBorderRadiusUpdate': handleBorderRadiusUpdate,
};


chrome.runtime.onMessage.addListener(function(request,sender,sendResponse) {
    if (request.task in socket_tasks){
        rslt = socket_tasks[request.task](...request.args);
        sendResponse({result: rslt, task: request.task});
    }
});


