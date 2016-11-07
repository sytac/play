import React from 'react'
import moment from 'moment'

export default class Timer extends React.Component {
  render() {
    const { timeLeft, totalTime } = this.props

    let time = Math.ceil(timeLeft / 100) / 10
    var minutes = ''+Math.floor(time / 60)
    var seconds = ''+Math.floor(time - minutes * 60)

    if (minutes.length === 1) {
      minutes = `0${minutes}`
    }

    if (seconds.length === 1) {
      seconds = `0${seconds}`
    }

    const timer = `${minutes}:${seconds}`

    let progressClass = 'progress progress-striped'
    if (timeLeft <= 10000) {
      progressClass = 'progress progress-striped progress-warning'
    }
    if (timeLeft <= 5000) {
      progressClass = 'progress progress-striped progress-danger'
    }

    return (
      <div>
        <div className="row">
          <div className="col-md-11">
            <progress
              className={progressClass}
              max={totalTime}
              value={totalTime - timeLeft}
              style={{
                marginTop: '4px'
              }}
            />
          </div>
          <div className="col-md-1" style={{ textAlign: 'center' }}>
            {timer}
          </div>
        </div>
      </div>
    )
  }
}
