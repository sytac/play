import React from 'react'

import Timer from './Timer'

export default class Top extends React.Component {
  renderInitial() {
    return (
      <div className="row top">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <h1>Quiz</h1>
            </div>
            <div className="card-block">
              <blockquote className="card-blockquote">
                <p>
                  Thanks for taking the Sytac Dev Quiz, we're looking forward to seeing how well you stack up!
                </p>
                <p>
                  You will have 3 minutes to answer as many questions correctly as you can.
                </p>
                <p>
                  Prizes will be awarded at 17h by the Sytac stand, see you then and good luck!
                </p>

                <center>
                  <button type="button" className="btn btn-primary" onClick={this.props.start}>
                    Start
                  </button>
                </center>
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    )
  }

  renderStarted() {
    const {
      timeLeft,
      totalTime
    } = this.props

    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <h1>Quiz</h1>
            </div>
            <div className="card-block">
              <blockquote className="card-blockquote">
                <Timer
                  timeLeft={timeLeft}
                  totalTime={totalTime}
                />
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    )
  }

  render() {
    const { quizEntry } = this.props

    if (quizEntry && quizEntry.started) {
      return this.renderStarted()
    } else {
      return this.renderInitial()
    }
  }
}
