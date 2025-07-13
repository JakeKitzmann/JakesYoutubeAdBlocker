
// goal of this function is to take a time-based approach rather than
// explicitly blocking the ads. Youtube shouldn't get mad... hopefully...
function skipAds() {
	const video = document.querySelector('video');
	if (video && document.querySelector('.ad-showing')) {
		try {
			if (video.currentTime < video.duration - 1) {
				video.currentTime = video.duration;
				window.adBlockCount++;
				console.log("[AdBlocker] Fast-forwarded ad");
			}
		} catch (err) {
			console.log("[AdBlocker] Could not skip ad:", err);
		}
	}
}

// look for when youtube adds or remove elements of the page
const observer = new MutationObserver(skipAds);
observer.observe(document, { childList: true, subtree: true }); // childList -- watch for new or removed child nodes, subtree -- watch the whole page