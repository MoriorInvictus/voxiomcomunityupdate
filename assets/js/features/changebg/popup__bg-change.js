
async function convertImage(imgUrl){
    base64Image = await port.postMessage({ task: 'convertImageToBase64', args: [imgUrl] });
    return base64Image;

}
