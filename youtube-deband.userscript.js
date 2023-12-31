// ==UserScript==
// @name        Youtube Deband
// @description Run deband on youtube, hw accel required.
// @namespace   ThaUnknown
// @match       https://*.youtube.com/*
// @version     1.0.0
// @author      ThaUnknown
// @icon        https://www.youtube.com/favicon.ico
// @downloadURL https://raw.githubusercontent.com/ThaUnknown/youtube-deband-extension/main/youtube-deband.userscript.js
// @updateURL   https://raw.githubusercontent.com/ThaUnknown/youtube-deband-extension/main/youtube-deband.userscript.js
// @license     MIT
// ==/UserScript==

function updateCanvasSize (video) {
  if (!deband?.canvas) return
  if (video.style.top.startsWith('-')) return
  deband.canvas.style.top = video.style.top
  deband.canvas.style.left = video.style.left
  deband.canvas.style.width = video.style.width
  deband.canvas.style.height = video.style.height
}

/** @type {import('video-deband').default} */
let deband = null

/** @type {HTMLVideoElement} */
let currentVideo = null

import('https://esm.sh/video-deband').then(({ default: VideoDeband }) => {
  const observer = new MutationObserver(() => {
    /** @type {HTMLVideoElement} */
    const video = document.querySelector('video.html5-main-video')
    if (video) {
      if (!document.body.contains(deband?.canvas) || !video.isSameNode(currentVideo)) {
        currentVideo = video
        if (deband) deband.destroy()
        const newDeband = deband = new VideoDeband(video)
        video.after(deband.canvas)
        video.style.opacity = '0.1'
        deband.canvas.style.position = 'absolute'
        const resize = new MutationObserver(() => {
          if (newDeband.destroyed) return resize.disconnect()
          updateCanvasSize(video)
        })
        resize.observe(video, { attributes: true })
        updateCanvasSize(video)
      }
    }
  })
  observer.observe(document.body, { childList: true })
})
