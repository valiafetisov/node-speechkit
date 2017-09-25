# Yandex speechkit for node

Small package that starts an instance of a chromium in headless mode (but with mouth) and able to recieve text to speak.


### Install

```
npm install node-speechkit --save
```


### Example

```js
const speechkit = require('node-speechkit')

speechkit({apikey: 'valid_api_key'}).then(async say => {
  await say('hello')
  await say('goodbye')
})
```
