import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { hashHistory } from 'react-router'

import getScoreboardScores from '../actions/getScoreboard'

import Spinner from './Spinner'
import Header from './Header'

@connect(
  (state) => {
    return {
      quizEntry: state.app.quizEntry,
      scoreBoard: state.app.scoreBoard,
    }
  },
  (dispatch, props) => {
    return {
      getScoreboardScores: () => {
        dispatch(getScoreboardScores())
      },

      redirectToIndex: () => {
        hashHistory.push(`/`)
      },
    }
  }
)
export default class Scoreboard extends React.Component {
  componentWillMount() {
    this.props.getScoreboardScores()
  }

  componentDidMount() {
    // If there was a quiz entry
    if (this.props.quizEntry.ended) {
      setTimeout(() => {
        const [ rowElement ] = document.getElementsByClassName(this.props.quizEntry.id)

        if (rowElement) {
          rowElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          })
        }
      }, 10)

      // After 20 seconds, redirect to the index route.
      // TODO: Provided a button instead.
      //setTimeout(this.props.redirectToIndex, 1000 * 20)
    } else {
      // Every 5 seconds, update the scores.
      setInterval(this.props.getScoreboardScores, 1000 * 5)
    }
  }

  renderMessage() {
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <h1>Quiz Ended!</h1>
            </div>
            <div className="card-block">
              <blockquote className="card-blockquote" style={{ textAlign: 'center' }}>
                <p>
                  Thank you for playing the quiz. You can find your score below or you can <a href="#/">try again</a>.
                </p>
                <p style={{ textAlign: 'center' }}>
                  Prizes will be awarded at 17h by the Sytac stand.
                </p>
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    )
  }

  renderScores(scores) {
    // TODO: Somehow have to do this twice..
    scores = scores.asMutable()

    scores = _(scores)
      .map(x => x.asMutable())

      // Convert the time
      .map(x => {
        const endTime = new Date(x.endTime).valueOf()
        const startTime = new Date(x.startTime).valueOf()
        const totalTime = (startTime - endTime) / 1000

        x.totalTime = totalTime

        return x
      })
      .value()

    scores = scores.sort((a, b) => {
      if (a.score === b.score) {
        return b.timeLeft - a.timeLeft
      } else {
        return b.score - a.score
      }
    })

    // Get rows back
    const rows = _(scores)
      .map((x, i) => {
        let rowClass = `${x.id}`

        if (x.id === this.props.quizEntry.id) {
          rowClass = `${rowClass} table-info`
        }

        const number = i + 1

        return (
          <tr className={rowClass}>
            <td>{number}</td>
            <td>{x.firstName}</td>
            <td>{x.lastName}</td>
            <td>{x.subject}</td>
            <td>{x.score}</td>
          </tr>
        )
      })
      .value()

    return (
      <div className="row">
        <div className="col-md-12">
          {!this.props.quizEntry.completed &&
            <Header />
          }
          <div className="card">
            <div className="card-header">
              <h1>Scoreboard</h1>
            </div>
            <div className="card-block">
              <blockquote className="card-blockquote">
                <table className="table">
                  <thead className="thead-default">
                    <tr>
                      <th>Place</th>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Subject</th>
                      <th>Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows}
                  </tbody>
                </table>
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    )
  }

  render() {
    const { scores } = this.props.scoreBoard

    let message

    if (this.props.quizEntry.ended) {
      message = this.renderMessage()
    }

    return (
      <div style={{ paddingTop: '30px' }}>
        {message}
        {this.renderScores(scores)}
      </div>
    )
  }
}
