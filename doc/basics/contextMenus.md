[contextMenus](https://developer.chrome.com/extensions/contextMenus) 是定制 Chrome 右键菜单的 API。

## 配置

```json
{
  "permissions": [
    "contextMenus"
  ]
}
```

## 使用

[chrome.contextMenus.create](https://developer.chrome.com/extensions/contextMenus#method-create)，如下即可创建一个最简单的菜单:

```js
chrome.contextMenus.create({
    "title": "最简单的菜单",
    "contexts": ["all"],
    "onclick": function() {}
});
```

* title: 菜单名称
* contexts: 响应种类，可以是 `page` / `frame` / `image` / `video` 等等
* onclick: 回调函数

## 总结

还是之前的观点，这种能侵入用户界面的事尽量少干，免得用户看的烦了给你删了。
