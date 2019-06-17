var GET_COOKIES = "GET_COOKIES";
var GET_CURRENT_COOKIES = "GET_CURRENT_COOKIES";
var SET_COOKIES = "SET_COOKIES";

chrome.runtime.sendMessage({
  action: GET_COOKIES,
  args: ''
}, (response) => {   
  // 处理
  console.log(response);
});

chrome.runtime.sendMessage({
  action: GET_CURRENT_COOKIES,
  args: ''
}, (response) => {   
  // 处理
  console.log(response);
});

chrome.runtime.sendMessage({
  action: SET_COOKIES,
  args: ''
}, (response) => {   
  // 处理
  console.log(response);
});