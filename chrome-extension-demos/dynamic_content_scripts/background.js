chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
  chrome.tabs.create({ url: 'https://icepy.me'}, function(tab){
    chrome.tabs.executeScript(tab.id, {file: 'dynamic_content_scripts.js'});
  });
})