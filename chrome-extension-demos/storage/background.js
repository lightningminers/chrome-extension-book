chrome.storage.onChanged.addListener(function(changes, namespace) {
  for (key in changes) {
    var storageChange = changes[key];
    console.log('存储键“%s”（位于“%s”命名空间中）已更改。' +
                    '原来的值为“%s”，新的值为“%s”。',
                key,
                namespace,
                storageChange.oldValue,
                storageChange.newValue);
  }
});

chrome.storage.local.set({key: "icepy"}, function() {
  console.log('Value is set to ' + "icepy");
});

chrome.storage.local.get(['key'], function(result) {
  console.log('Value currently is ' + result.key);
  chrome.storage.local.set({key: "icepy word"}, function() {
    console.log('Value is set to ' + "icepy");
  });
});

chrome.storage.sync.set({key: "hello icepy"}, function() {
  console.log('Value is set to ' + "hello icepy");
});

chrome.storage.sync.get(['key'], function(result) {
  console.log('Value currently is ' + result.key);
});