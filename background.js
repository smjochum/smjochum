chrome.action.onClicked.addListener((tab) => {  // When the icon is clicked,
  chrome.tabs.captureVisibleTab().then(  // Ask for a screenshot and
    (imageUri) => chrome.tabs.sendMessage(tab.id, {imageUri}));  // send it to the content script.
  });
  
//from https://developer.chrome.com/docs/extensions/mv3/content_scripts/
  chrome.action.onClicked.addListener((tab) => {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ['contentscript.js']
    });
  });