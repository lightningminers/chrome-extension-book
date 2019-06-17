var create = document.getElementById('create');

create.addEventListener('click', function(){
  chrome.runtime.sendMessage({}, function(){});
});