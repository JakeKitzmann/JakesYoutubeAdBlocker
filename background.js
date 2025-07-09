chrome.action.onClicked.addListener(async (tab) => {
	// inject to chrome
	await chrome.scripting.executeScript({
		target: { tabId: tab.id },
		files: ["content.js"]
	});

	// set logo
	chrome.action.setIcon({
		tabId: tab.id,
		path: {
			16: "icons/logo_16x16.png",
			32: "icons/logo_32x32.png",
			48: "icons/logo_48x48.png"
		}
	});

	// title
	chrome.action.setTitle({ tabId: tab.id, title: "AdBlocker Running" });
});
