import VideoDeband from 'video-deband'
import { getStorage } from '../common/storage.js'
import { CHROME_SYNC_STORAGE_KEY } from '../common/settings.js'

/** @type {VideoDeband} */
let deband = null

/** @type {HTMLVideoElement} */
let currentVideo = null

function updateDebandStatus (enabled) {
  if (!enabled) {
    if (deband) {
      deband.destroy()
      deband.canvas.remove()
    }
    return
  }
  /** @type {HTMLVideoElement} */
  const video = document.querySelector('video.html5-main-video')
  if (video) {
    if (!document.body.contains(deband?.canvas) || currentVideo !== video) {
      currentVideo = video
      if (deband) deband.destroy()
      deband = new VideoDeband(video)
      video.after(deband.canvas)
      deband.canvas.style.position = 'absolute'
      const resize = new ResizeObserver(() => {
        deband.canvas.style.top = video.style.top
        deband.canvas.style.left = video.style.left
        deband.canvas.style.width = video.style.width
        deband.canvas.style.height = video.style.height
      })
      resize.observe(video)
      console.log(deband)
    }
  }
}

window.onload = function () {
  console.log('Brazzers deband LOADED')
  chrome.runtime.onMessage.addListener(({ enabled }) => updateDebandStatus(enabled))
  const observer = new MutationObserver(() => {
    getStorage(CHROME_SYNC_STORAGE_KEY, ({ enabled }) => updateDebandStatus(enabled))
  })
  observer.observe(document.body, { subtree: false, childList: true, attributes: false })
}