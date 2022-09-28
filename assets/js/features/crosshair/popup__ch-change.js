
base64String = '';
async function crosshairUpdateHandler(fileInput){
    if(!fileInput){
        try{
            return await sendMessageToActiveTab({ task: 'handleCrosshairChanging', args: [false] }, _ => {console.log('must to update')})
        } catch(e){
            
        }
    }
    file = fileInput['files'][0];

    const reader = new FileReader();
      
    reader.onload = async function () {
        base64String = reader.result;
        try{
            return await sendMessageToActiveTab({ task: 'handleCrosshairChanging', args: [reader.result] }, _ => {console.log('must to update')})
        } catch(e){

        }
        
    };

    reader.readAsDataURL(file);
    return base64String;    
}









