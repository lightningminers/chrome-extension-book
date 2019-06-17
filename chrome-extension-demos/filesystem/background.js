chrome.app.runtime.onLaunched.addListener(
  function() {
    chrome.app.window.create('main.html', {
      id: 'main',
      bounds: {
        width: 542,
        height: 360
      },
      resizable: false,
      frame: 'none'
    })
  }
)
