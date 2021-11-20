const TITLE_APPLY = "Ativar";
const TITLE_REMOVE = "Desativar";

function toggle(tab) {
  function gotTitle(title) {
    if (title === TITLE_APPLY) {
      browser.pageAction.setIcon({
        tabId: tab.id,
        path: "assets/icon/icon-off.png",
      });
      browser.pageAction.setTitle({ tabId: tab.id, title: TITLE_REMOVE });

      browser.tabs
        .sendMessage(tab.id, { action: "end" })
        .then((response) => {
          console.log("Message from the content script:");
          console.log(response.response);
        })
        .catch(onError);
    } else {
      browser.pageAction.setIcon({
        tabId: tab.id,
        path: "assets/icon/icon-on.png",
      });
      browser.pageAction.setTitle({ tabId: tab.id, title: TITLE_APPLY });

      browser.tabs
        .sendMessage(tab.id, { action: "start" })
        .then((response) => {
          console.log("Message from the content script:");
          console.log(response.response);
        })
        .catch(onError);
    }
  }

  var gettingTitle = browser.pageAction.getTitle({ tabId: tab.id });
  gettingTitle.then(gotTitle);
}

browser.pageAction.onClicked.addListener(toggle);
