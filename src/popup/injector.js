const currentTab = browser.tabs.getCurrent();

function beastify() {
  browser.tabs
    .query({ active: true, currentWindow: true })
    .then((tabs) => {
      browser.tabs.sendMessage(tabs[0].id, {
        command: "greeting",
      });
    })
    .catch(() => {
      console.log("Erro");
    });
}

browser.tabs
  .executeScript({ file: "../skipper.js" })
  .then(() => {
    document
      .getElementById("btnStart")
      .addEventListener("click", beastify, true);
  })
  .catch(() => {
    console.log("Inject ERRO");
  });
