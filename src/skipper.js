console.log("Skipper loaded! 👄➡👙");

browser.runtime.onMessage.addListener((message) => {
    console.log(message.command);
});

console.log("Skipper concluded");