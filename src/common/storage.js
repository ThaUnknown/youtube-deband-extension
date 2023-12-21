import { PRESET_CONFIGURATION } from './settings.js'

export const getStorage = (componentKey, callback) => {
  chrome.storage.sync.get([componentKey], result => {
    callback(result[componentKey] || PRESET_CONFIGURATION)
  })
}

export const setStorage = (componentKey, value) => {
  chrome.storage.sync.set({ [componentKey]: value })
}
