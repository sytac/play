import _ from 'lodash'
import async from 'async'

module.exports = function(Question) {
  Question.remoteMethod('withOptions', {
    accepts: [
      {
        arg: 'quizId',
        type: 'string'
      }
    ],
    returns: {
      arg: 'questions',
      type: 'array',
    }
  })

  Question.withOptions = (quizId, cb) => {
    const filter = {
      where: {
        quizId: quizId
      },

      include: [ 'options' ]
    }

    Question.find(filter, (error, results) => {
      if (error) return cb(error)

      console.log('results', results.length, results.toJSON)

      results = _(results)
        .map(x => x.toJSON())
        .map(x => {
          x.options = _.map(x.options, y => {
            delete y.correct
            return y
          })

          return x
        })
        .value()

      cb(null, results)
    })
  }
}
