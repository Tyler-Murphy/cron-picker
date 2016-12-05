const yo = require('yo-yo')
const cronstrue = require('cronstrue')

const defaultExpression = '35 9 * * 1'
const noop = () => {}
const units = [
  'minute',
  'hour',
  'day of month',
  'month',
  'day of week',
]

module.exports = cronPicker

function cronPicker({ cronExpression = defaultExpression, onChange = noop, toUpdate } = {}) {
  let cronFields = cronExpression.split(' ')
  let globalReason

  let picker = yo`
  <div>
    ${units.map((unit, i) => {
      let string = cronFields[i]
      let thisReason = invalidReason(string)

      globalReason = globalReason || thisReason

      return cronField({
        unit,
        string,
        valid: !thisReason,
        onChange: ({ unit, value }) => {
          cronFields[units.indexOf(unit)] = value
          cronExpression = cronFields.join(' ')
          onChange(cronExpression)
          yo.update(toUpdate, cronPicker({
            cronExpression,
            onChange,
            toUpdate
          }))
        }
      })
    })}
    ${globalReason || cronString(cronExpression)}
  </div>
  `

  toUpdate = toUpdate || picker
  return picker
}



function cronField({ unit, string, valid = true, onChange = noop }) {
  return yo`
  <div>
    <label>
      <input
        type="text",
        value=${string}
        oninput=${e => onChange({
          unit,
          value: e.target.value.replace(/\s/g, '')
        })}
        style=${`
          border: 1px solid ${valid ? 'blue' : 'red'};
          outline: none;
        `}
      />
      ${unit}
    </label>
  </div>
  `
}

function invalidReason(field) {
  if (!field) {
    return 'fields must not be empty'
  }

  if (!/^[0-9,*\/]*$/.test(field)) {
    return 'fields must only contain numbers, commas, or asterisks'
  }

  if (/,$/.test(field)) {
    return 'fields must not end in commas'
  }

  if (/,,/.test(field)) {
    return 'fields must not have two consecutive commas'
  }

  if (field.includes('*') && field.length > 1) {
    return '"*" cannot be used with any other characters in a field'
  }
}

function cronString(cronExpression) {
  try {
    return cronstrue.toString(cronExpression)
  } catch(e) {
    return e.toString()
  }
}