var GET_COOKIES = "GET_COOKIES";
var GET_CURRENT_COOKIES = "GET_CURRENT_COOKIES";
var SET_COOKIES = "SET_COOKIES";

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {   
  var action = request.action;
  var args = request.args;
  switch (action) {
    case GET_COOKIES:
      chrome.cookies.getAllCookieStores(function(cookieStores){
        sendResponse({ action: GET_COOKIES, args: cookieStores });
      });
      return true;
    case GET_CURRENT_COOKIES:
      chrome.cookies.getAll({ url: "https://icepy.me"}, function(cookies){
        sendResponse({ action: GET_CURRENT_COOKIES, args: cookies });
      });
      return true;
    case SET_COOKIES:
      chrome.cookies.set({
        url: "https://icepy.me",
        name: "name",
        value: "icepy",
        domain: ".icepy.me"
      })
      break;
  }
})