// Create the menu item when the extension is installed
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "openInFreeTube",
    title: "Open in FreeTube",
    contexts: ["link"],
    targetUrlPatterns: [
      "*://www.youtube.com/watch*",
      "*://youtube.com/watch*",
      "*://youtu.be/*",
      "*://www.youtu.be/*",
    ],
  });
});

// Handle the click
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "openInFreeTube") {
    // Convert the clicked link into our custom protocol
    const url = new URL(info.linkUrl);
    const freetubeUrl = "freetube:" + url.href;

    // Open it – Chrome will delegate to the OS
    chrome.tabs.create({ url: freetubeUrl, active: false });
  }
});
