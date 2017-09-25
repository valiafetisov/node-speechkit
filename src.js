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
      speed: options.speed || 0.9,
      lang: options.lang || 'en-US',
      speaker: options.speaker || 'ermil'
    })
    resolve()
  })
}

const speechkit = function (options) {
  return new Promise((resolveee, rejecteee) => {
    puppeteer.launch(chromeOptions).then(async browser => {
      const page = await browser.newPage()
      await page.addScriptTag('https://webasr.yandex.net/jsapi/v1/webspeechkit.js')
      await page.addScriptTag('https://webasr.yandex.net/jsapi/v1/webspeechkit-settings.js')
      await page.evaluate(setupBrowserApi, options)
      const say = async (text) => {
        await page.evaluate(async (text) => {
          return new Promise((resolve, reject) => {
            window.tts.speak(text, {
              stopCallback: function () {
                resolve()
              }
            })
          })
        }, text)
      }
      resolveee(say)
    })
  })
}

module.exports = speechkit
