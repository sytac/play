import _ from 'lodash'

// Transform `{ intoX: true, intoY: false, ... }` into `{ into: { x: true, y: false },  ... }`
function transformInto(data) {
  const into = {}

  _.each(data, (v, k) => {
    if (k.startsWith('into')) {
      const finalKey = k
        .replace('into', '')
        .toLowerCase()

      into[finalKey] = v

      delete data[k]
    }
  })

  data.into = into
}

export default async (data) => {
  transformInto(data)

  // Test server side validation.
  //data.email = 'TESTING_FALSE_EMAIL_VALUE'

  return fetch('/api/QuizEntries', {
    method: 'POST',
    headers: {
      'Accept':       'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
}
