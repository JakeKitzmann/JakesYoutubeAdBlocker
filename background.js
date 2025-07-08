let enabled = true;

chrome.action.onClicked.addListener(async (tab) => {
	enabled = !enabled;

	if (enabled) {
        console.log("enabled")
		// inject content.js when enabled
		await chrome.scripting.executeScript({
			target: { tabId: tab.id },
			files: ["content.js"]
		});

		// set the color logo active
		chrome.action.setIcon({
			tabId: tab.id,
			path: {
				16: "icons/logo_16x16.png",
				32: "icons/logo_32x32.png",
				48: "icons/logo_48x48.png"
			}
		});
		chrome.action.setTitle({ tabId: tab.id, title: "AdBlocker ON" });
	} else {
        console.log("disabled");

		// disable -- using global variable
		await chrome.scripting.executeScript({
			target: { tabId: tab.id },
			func: () => {
				window.__adblocker_disabled = true;
				console.log("[AdBlocker] Disabled flag set");
			}
		});

		// set grayscale
		chrome.action.setIcon({
			tabId: tab.id,
			path: {
				16: "icons/logo_gray_16x16.png",
				32: "icons/logo_gray_32x32.png",
				48: "icons/logo_gray_48x48.png"
			}
		});
		chrome.action.setTitle({ tabId: tab.id, title: "AdBlocker OFF" });
	}
});
