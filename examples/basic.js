const speechkit = require('../src.js')

speechkit({apikey: 'valid_api_key'}).then(async say => {
  await say('hello')
  await say('goodbye')
})
