console.log("plgu-in start...");

const baseUrl = "https://m.tad.woa.com/mmfinder#/mmfinder";

//与background.js进行通信,接收bcakground.js过来的信息
chrome.runtime.onMessage.addListener((message) => {
  //用户所选文本
  let selectionText = message.selectionText;
  if (selectionText === undefined) {
    return;
  }
  if (isNaN(+selectionText) || +selectionText.length === 10) {
    window.open(
      `${baseUrl}/accountNumber/detail?finder_uin=${selectionText}`,
      "",
      "_blank"
    );
  } else if (+selectionText.length === 20) {
    window.open(
      `${baseUrl}/feed/feedinfo?feed_id=${selectionText}`,
      "",
      "_blank"
    );
  }
});
