import { CHROME_SYNC_STORAGE_KEY } from '../common/settings.js'
import { getStorage, setStorage } from '../common/storage.js'

chrome.commands.onCommand.addListener(() => {
  getStorage(CHROME_SYNC_STORAGE_KEY, ({ enabled }) => setBadge(!enabled))
})

chrome.action.onClicked.addListener(() => {
  getStorage(CHROME_SYNC_STORAGE_KEY, ({ enabled }) => setBadge(!enabled))
})

async function setBadge (enabled) {
  if (enabled) {
    chrome.action.setBadgeText({ text: 'ON' })
    chrome.action.setBadgeBackgroundColor({ color: 'green' })
  } else {
    chrome.action.setBadgeText({ text: 'OFF' })
    chrome.action.setBadgeBackgroundColor({ color: 'red' })
  }
  setStorage(CHROME_SYNC_STORAGE_KEY, { enabled })

  const tabs = await chrome.tabs.query({})

  for (const tab of tabs) {
    if (!tab.id) return
    try {
      await chrome.tabs.sendMessage(tab.id, { enabled })
    } catch (e) {}
  }
}

getStorage(CHROME_SYNC_STORAGE_KEY, ({ enabled }) => setBadge(!enabled))
