由于 Chrome Extension 设计的机制让我们必须要了解清楚其内在的通信机制，以至于辅助各方面在某些场景中都能正常的进行工作。我们都知道 Chrome Extension 设计了 popup，options，background，content_script，它们之间如果想要发生联系，必然要使用异步通信的方式来完成。

> 想一想，如果我们的逻辑写在 background 中，假设你有一个 popup 的界面需要使用到 background 中的处理逻辑，那么就可以将处理结果发送给 popup。如果我们的逻辑在 popup 中，点击某个按钮来辅助操作网页，那么就需要往 content_script 发送一些数据，这个时候还要依赖 background 来进行转发，这些在不同运行环境内的脚本，一旦有需要发送关联关系，那么通信机制就是这个关系的基石。

具体点的说，我们主要了解其两种模式：

* 问答模式
* long connect 模式

chrome.runtime 中定义这两种模式的监听器和连接器。

## 问答模式

我们可以想象一下一个请求的全部生命周期，从 Request 开始到 Response 结束，在这个模式中也是如此。一般从软件的设计角度来说，我们需要将被问这一方写在 background 中，让它做为一个桥梁，也是“中心处理器”。

```javaScript
// background 中答的一方
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {   
  // request 问的人发过来的消息    
  // sendResponse 将答发给问的人
})
```

```javaScript
// popup 中问的一方
chrome.runtime.sendMessage({

}, (response) => {   
  // 处理
})
```

如果你想异步的回应，那么只需要 `return true` 在你的函数体中，如：

```javascript

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {   
  // request 问的人发过来的消息    
  // sendResponse 将答发给问的人
  http.get().then(() => {
    sendResponse({});
  });
  return true;
})

```

一般这种问答机制我们还需要额外加入一些处理过程，如：

```javaScript
{
  "action": "",
  "args": "",
  "id": ""
}
```

* action 用于描述处理的 handler
* args 是问的人发来的消息
* id 属于幂等操作

```javascript
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {   
  const { action, args } = request;
  switch (action){
    case 'sync':
        sendResponse({});
      break;
    case 'async':
      http.get().then(() => {
        sendResponse({});
      })
      return true;
  }
})
```

至于回答也是如此。

## long connect 模式

如果你了解过 WebSocket，那么对于这样的模式就会比较清楚。这个模式非常形象的和 Websocket 类似，它可以将消息体源源不断的发送给连接发起方。

在 long connect 模式中，主要分为连接发起方和被动连接方，一般正常情况下，这个模式的被动连接方会写在 background 中，连接发起方可以写在 popup 中也可以写在 content_script 或 options 中，这样主要会根据你的业务逻辑而定。

```javaScript
// 被动连接方
chrome.runtime.onConnect.addListener((port) => {    
  switch (port.name) {      
    case COMM.FETCH_PIPE:     
      break;      
    default:        
      break;
  }
});
```

```javaScript
// 连接发起方

let PORT = null;
PORT = chrome.runtime.connect({ name: COMM.FETCH_PIPE });
PORT.postMessage({ cmd: 'connect_pipe' });
PORT.onDisconnect.addListener(() => {  console.log('disconnect');
});
PORT.onMessage.addListener((msg) => {    
  // 处理过程
});
```

跟上一个模式类似，如果我们要在业务中平稳的使用，还需要自己定义一些数据结构来辅助的处理通信的 Handler 逻辑。