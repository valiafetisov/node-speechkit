const puppeteer = require('puppeteer')

const chromeOptions = {
  headless: false,
  args:['--headless', '--disable-gpu', '--hide-scrollbars']
}

const setupBrowserApi = async (options) => {
  return new Promise((resolve, reject) => {
    if (!options.apikey) reject('no apikey provided')
    window.tts = new ya.speechkit.Tts({
      apikey: options.apikey,
      emotion: options.emotion || 'good',
      speed: options.speed || 1,
      lang: options.lang || 'en-US',
      speaker: options.speaker || 'ermil'
    })
    resolve()
  })
}

const speakInBrower = async ({text, options}) => {
  return new Promise((resolve, reject) => {
    window.tts.speak(text, {
      emotion: options.emotion,
      speed: options.speed,
      lang: options.lang,
      speaker: options.speaker,
      stopCallback: function () {
        resolve()
      }
    })
  })
}

const speechkit = function (options) {
  return new Promise((resolve, reject) => {
    puppeteer.launch(chromeOptions).then(async browser => {
      const page = await browser.newPage()
      await page.addScriptTag('https://webasr.yandex.net/jsapi/v1/webspeechkit.js')
      await page.addScriptTag('https://webasr.yandex.net/jsapi/v1/webspeechkit-settings.js')
      await page.evaluate(setupBrowserApi, options)
      const speak = async (text, options) => {
        await page.evaluate(speakInBrower, {text, options: options || {}})
      }
      resolve(speak)
    })
  })
}

module.exports = speechkit
