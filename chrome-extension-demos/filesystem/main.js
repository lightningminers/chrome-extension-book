var open = document.getElementById('open')
var openContent = document.getElementById('openContent')

open.onclick = function() {
  chrome.fileSystem.chooseEntry({
    type: 'openFile'
  }, function (fileEntry) {
    fileEntry.file(function (file) {
      var reader = new FileReader()

      reader.onload = function () {
        var text = this.result
        // console.log(text)
        openContent.innerHTML = text
      }

      reader.readAsText(file)
    })
  })
}