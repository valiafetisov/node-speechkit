# Text-to-speech with yandex speechkit server-side

Small package that starts an instance of a chromium in headless mode (but with mouth), setup yandex text-to-speech engine and able to recive and play text.


### Install

```
npm install node-speechkit --save
```


### Example

```js
const speechkit = require('node-speechkit')

speechkit({apikey: 'valid_api_key'}).then(async speak => {
  await speak('hello')
  await speak('пока', {
    speaker: 'zahar',
    emotion: 'neutral',
    speed: 1.9,
    lang: 'ru-RU'
  })
})
```


### Configuration

Speechkit can be configurated with params passed to `speechkit` or to the `speak` command.

Default parameters are:

```
{
  emotion: 'good',
  speed: 1,
  lang: 'en-US',
  speaker: 'ermil'
}
```
