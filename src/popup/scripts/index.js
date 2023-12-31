import { getStorage } from '../../common/storage.js'
import { PRESET_CONFIGURATION, CHROME_SYNC_STORAGE_KEY } from '../../common/settings.js'

function loadConfiguration (result) {
  const savedConfiguration = result || PRESET_CONFIGURATION
  const storageValue = savedConfiguration.storageValue
  console.info('Storage value', storageValue)
}

window.onload = function () {
  console.info('Popup script loaded')
  getStorage(CHROME_SYNC_STORAGE_KEY, loadConfiguration)
}
