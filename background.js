// background.js
chrome.action.onClicked.addListener((tab) => {
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: tryToFlipVideo
    })
    .then((res) => updateIcon(tab.id, res[0].result))
    .catch((err) => console.error(err));
});

/**
 * This function try to alter curretn tab DOM to invert video horizontally
 * @returns bool return true if video is inverted
 */
function tryToFlipVideo(){
    const videoElement = document.querySelector(".video-player video");
    if (videoElement === null || typeof videoElement === 'undefined')
        return -365;
    const orientation = videoElement.style.transform;
    videoElement.style.transform = orientation.includes('scaleX(-1)') ? 'scaleX(1)' : 'scaleX(-1)'; 
    return videoElement.style.transform === 'scaleX(-1)';
}

/**
 * Change icon 
 * @param {Number} tabId 
 * @param {bool} isFlipped 
 */
function updateIcon(tabId, isFlipped) {
    const iconPath = isFlipped ? "default_icon.png" : "default_icon_off.png";
    chrome.action.setIcon({path: iconPath, tabId: tabId});
}