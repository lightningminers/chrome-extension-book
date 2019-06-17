const suggestPrefix = 'https://book.douban.com/j/subject_suggest?q=';
const booksPrefix = [
  'http://www.ituring.com.cn/search?q=',
  'https://www.epubit.com/search?tag=',
  'http://www.broadview.com.cn/search?q='
];

function fetchSuggest(word, cb) {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
      cb(JSON.parse(xhr.responseText))
    }
  }
  xhr.open('GET', suggestPrefix + word, true);
  xhr.send();
}

function openTab(url) {
  chrome.tabs.create({
    url: url
  });
}

chrome.omnibox.onInputChanged.addListener(function(text, suggest) {
  fetchSuggest(text, function(list) {
    if (list.length > 0) {
      const suggestList = list.map((item) => {
        const title = item.title || '';
        const author_name = item.author_name || '';
        const year = item.year || '';

        return {
          content: item.title,
          description: title + ' - ' + author_name + ' ' + year
        }
      })
      suggest(suggestList)
    }
  })
});

chrome.omnibox.onInputEntered.addListener(function(text) {
  booksPrefix.forEach((bookUrl) => {
    const url = bookUrl + text
    openTab(url)
  })
});
