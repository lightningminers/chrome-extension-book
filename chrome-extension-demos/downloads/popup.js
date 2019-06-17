var down = document.getElementById("down");
down.addEventListener("click", function(){
  var options = {
    url: "https://cms-origin.battlenet.com.cn/cms/blog_thumbnail/01/01ZMKLKV95ZM1532759670729.jpg",
    filename: "wow.jpg",
    conflictAction: "overwrite",
    method: "GET",
  };
  chrome.downloads.download(options, function(){
    
  });
})