chrome.runtime.onInstalled.addListener(() => {
  chrome.action.setBadgeText({
    text: "OFF",
  });
});

//当用户点击插件图标时
chrome.action.onClicked.addListener(async (tab) => {
  //当前tab页面
  //获取当前插件一个状态
  const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
  const nestState = prevState === "OFF" ? "ON" : "OFF";

  //更新插件图标文字
  await chrome.action.setBadgeText({
    tabId: tab.id,
    text: nestState,
  });

  //如果当前插件状态是ON，就在当前标签页插入js文件
  if (nestState === "ON") {
    await chrome.scripting.executeScript({
      //target 在哪个页面插入
      target: {
        tabId: tab.id,
      },
      files: ["content-script.js"],
    });

    //
    chrome.contextMenus.create({
      title: "视频号运营助手(搜feed/uin/昵称)",
      id: "search",
      type: "normal",
      contexts: ["all"],
    });

    // 点击弹出菜单
    chrome.contextMenus.onClicked.addListener(function (item, tab) {
      console.log(1);
      chrome.tabs.sendMessage(tab.id, item, function () {
        console.log(arguments, chrome.runtime.lastError);
      });
    });
  }

  //与content-script.js进行通信
  await chrome.tabs.sendMessage(tab.id, { state: nestState });
});
