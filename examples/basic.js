const speechkit = require('../src.js')

speechkit({apikey: 'valid_api_key'}).then(async speak => {
  await speak('hello')
  await speak('пока', {
    speaker: 'zahar',
    emotion: 'neutral',
    speed: 1.9,
    lang: 'ru-RU'
  })
})
