const test = require('tape')
const cronPicker = require('./index.js')

test('arguments', t => {
  t.doesNotThrow(
    () => cronPicker(),
    'works without arguments'
  )

  t.doesNotThrow(
    () => cronPicker({}),
    'works with just an empty object'
  )

  t.doesNotThrow(
    () => cronPicker({ cronExpression: '* * * * *', onChange: () => {} }),
    'accepts a cronExpression and onChange'
  )

  t.doesNotThrow(
    () => cronPicker({ cronExpression: 'what?' }),
    'accepts invalid cron expressions'
  )

  t.end()
})

test('creation', t => {
  t.equal(
    cronPicker().tagName,
    'DIV',
    'gives a div at the top level'
  )

  t.ok(
    /02:15/.test(cronPicker({ cronExpression: '15 2 * * *' }).toString()),
    'includes a human-readable version of the time'
  )

  t.end()
})