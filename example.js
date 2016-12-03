const cronPicker = require('./index.js')
const test = require('./test.js')

document.addEventListener('DOMContentLoaded', () => {
  document.body.appendChild(cronPicker({
    cronExpression: '35 * * * *',
    onChange: console.log
  }))
})
