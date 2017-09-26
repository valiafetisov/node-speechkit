const puppeteer = require('puppeteer')

const chromiumOptions = {
  headless: false,
  args:['--headless', '--disable-gpu', '--hide-scrollbars']
}

const ttsOptions = {
  emotion: 'good',
  speed: 1,
  lang: 'en-US',
  speaker: 'ermil'
}

const setupBrowserApi = async (options, ttsOptions) => {
  return new Promise((resolve, reject) => {
    if (!options.apikey) reject('no apikey provided')
    const merged = Object.assign({}, ttsOptions, options)
    window.tts = new ya.speechkit.Tts(merged)
    resolve()
  })
}

const speakInBrower = async (text, options = {}) => {
  return new Promise((resolve, reject) => {
    const merged = Object.assign({}, options, {stopCallback: resolve})
    window.tts.speak(text, merged)
  })
}

const speechkit = function (options) {
  return new Promise((resolve, reject) => {
    puppeteer.launch(chromiumOptions).then(async browser => {
      const page = await browser.newPage()
      await page.addScriptTag('https://webasr.yandex.net/jsapi/v1/webspeechkit.js')
      await page.addScriptTag('https://webasr.yandex.net/jsapi/v1/webspeechkit-settings.js')
      await page.evaluate(setupBrowserApi, options, ttsOptions)
      const speak = async (text, options) => {
        await page.evaluate(speakInBrower, text, options)
      }
      resolve(speak)
    })
  })
}

module.exports = speechkit
