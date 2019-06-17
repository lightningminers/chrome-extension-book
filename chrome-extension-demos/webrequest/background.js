chrome.webRequest.onBeforeRequest.addListener(
  function (details) {
    const url = details.url;

    if (url === 'http://n.sinaimg.cn/news/1_img/upload/7b577cec/576/w778h598/20180820/lSSg-hhxaafy9194151.jpg') {
      return {
        redirectUrl: 'https://github.com/welearnmore/chrome-extension-book/raw/master/doc/images/logo_google_developers.png'
      }
    }

    return {cancel: false}
  },
  {urls: ["<all_urls>"]},
  ["blocking"]
)