function skipAds() {
	if (window.__adblocker_disabled) return; // stop if user disables w/ button

	const video = document.querySelector('video');
	const skipButton = document.querySelector('.ytp-ad-skip-button');

	// click the skip ad button if it's there -- yes I'm that lazy...
	if (skipButton && skipButton.offsetParent !== null) {
		skipButton.click();
		console.log("[AdBlocker] Clicked skip ad button");
	}

	// fast forward unskippable ad
	if (video && document.querySelector('.ad-showing')) {
		try {
			if (video.currentTime < video.duration - 1) {
				video.currentTime = video.duration;
				console.log("[AdBlocker] Fast-forwarded unskippable ad");
			}
		} catch (err) {
			console.log("[AdBlocker] Could not skip ad:", err);
		}
	}

	// hide banner ads
	const banners = document.querySelectorAll('.ytp-ad-overlay-container, .ytp-ad-image-overlay');
	if (banners.length > 0) {
		banners.forEach(el => el.style.display = 'none');
		console.log(`[AdBlocker] Hid ${banners.length} banner ad(s)`);
	}
}

// mutation observer to catch DOM changes during ad playback -- youtube sneaky asl
const observer = new MutationObserver(skipAds);
observer.observe(document, { childList: true, subtree: true });

// run periodically in case observer misses something
setInterval(skipAds, 500);
