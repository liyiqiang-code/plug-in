console.log("plgu-in start...");

// 防抖函数
function debounce(func, delay = 500) {
  let timeout; //定时器
  return function (arguments) {
    // 判断定时器是否存在，存在的话进行清除，重新进行定时器计数
    if (timeout) clearTimeout(timeout); //清除之前的事件
    timeout = setTimeout(() => {
      func.call(this, arguments); //执行事件
    }, delay);
  };
}

function getSelectText() {
  let text = document.getSelection().toString();
  if (text) {
    console.log(text, "xxx");
  }
}

//与background.js进行通信,接收bcakground.js过来的信息
chrome.runtime.onMessage.addListener((message) => {
  console.log(message, "message");
  let state = message.state;
  if (state === "ON") {
  } else {
  }
});
