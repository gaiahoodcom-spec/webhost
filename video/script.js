// List of ad videos (local files in the same folder)
const videoList = [
  "video.mp4",
  "video1.mp4",
  "video2.mp4",
  "video3.mp4",
  "video4.mp4"
];

let currentVideo = 0;
const videoPlayer = document.getElementById("adVideo");
const startOverlay = document.getElementById("startOverlay");
let started = false;

function playNext() {
  videoPlayer.src = videoList[currentVideo];
  const p = videoPlayer.play();
  if (p && typeof p.catch === "function") {
    p.catch(err => {
      console.log("Autoplay likely blocked:", err);
    });
  }
  currentVideo = (currentVideo + 1) % videoList.length;
}

// Play next video when one ends
videoPlayer.addEventListener("ended", playNext);

// Attempt to start playback now (may be blocked by browser)
playNext();

// Request fullscreen with vendor fallbacks
function enterFullscreen(elem) {
  elem = elem || document.documentElement;
  if (elem.requestFullscreen) return elem.requestFullscreen();
  if (elem.webkitRequestFullscreen) return elem.webkitRequestFullscreen();
  if (elem.mozRequestFullScreen) return elem.mozRequestFullScreen();
  if (elem.msRequestFullscreen) return elem.msRequestFullscreen();
  return Promise.reject(new Error("Fullscreen API is not supported"));
}

// Start playback and attempt fullscreen
function startPlaybackAndFullscreen() {
  if (started) return;
  started = true;
  startOverlay.style.display = "none";
  videoPlayer.muted = true;
  playNext();
  enterFullscreen(videoPlayer).catch(() => {
    enterFullscreen(document.documentElement).catch(err => {
      console.log("Could not enter fullscreen automatically:", err);
    });
  });
}

// Show overlay initially; require user click/tap to start fullscreen
startOverlay.addEventListener("pointerdown", startPlaybackAndFullscreen);
document.addEventListener("pointerdown", startPlaybackAndFullscreen, { once: true });
document.addEventListener("keydown", startPlaybackAndFullscreen, { once: true });

// If playback starts automatically, try fullscreen
videoPlayer.addEventListener("play", () => {
  if (!started) {
    enterFullscreen(videoPlayer)
      .then(() => {
        started = true;
        startOverlay.style.display = "none";
      })
      .catch(() => {
        // Do nothing
      });
  }
});
