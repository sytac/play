import React from 'react'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { github } from 'react-syntax-highlighter/dist/styles'
import isEqual from 'lodash/isEqual'

export default class Question extends React.Component {
  constructor(options) {
    super(options)

    this.state = {
      currentOptionIndex: null
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      !isEqual(this.props, nextProps.quizEntry) &&
      this.state.currentOptionIndex !== nextState.currentOptionIndex
    )
  }

  renderTitle() {
    const { title } = this.props.quizEntry.currentQuestion

    return (
      <h2>{title}</h2>
    )
  }

  renderQuestion() {
    const { question } = this.props.quizEntry.currentQuestion
    const lines = question.split('\n').map(ln => <p>{ln}</p>)
    

    return (
      <div>{lines}</div>
    )
  }

  renderCode() {
    const { code } = this.props.quizEntry.currentQuestion
    const language = this.props.quizEntry.subject

    if (code && code !== '') {
      return (
        <SyntaxHighlighter
          language={language}
          style={github}
        >
          {code}
        </SyntaxHighlighter>
      )
    }
  }

  setIndex(i) {
    this.setState({
      currentOptionIndex: i
    })
  }

  answerQuestion() {
    const { currentOptionIndex } = this.state

    this.props.answerQuizEntryQuestion(currentOptionIndex)

    this.setState({
      currentOptionIndex: null
    })

    // FIXME: Hack
    setTimeout(() => {
      const inputs = document.getElementsByClassName('form-check-input my-input')

      _.each(inputs, input => {
        input.checked = false
      })
    }, 0)
  }

  renderOptions() {
    const { options } = this.props.quizEntry.currentQuestion

    return (
      <div>
        {_.map(options, ({ value }, i) => {
          return (
            <div className="form-check" key={i}>
              <label className="form-check-label">
                <input
                  className="form-check-input my-input"
                  type="radio"
                  name="answer"
                  style={{
                    marginRight: '0.5em',
                  }}
                  onClick={this.setIndex.bind(this, i)}
                />
                {value}
              </label>
            </div>
          )
        })}
      </div>
    )
  }

  renderButton() {
    return (
      <button
        className="btn btn-primary"
        onClick={this.answerQuestion.bind(this)}
        disabled={this.state.currentOptionIndex === null}
      >
        Next
      </button>
    )
  }

  render() {
    const { quizEntry } = this.props

    if (!quizEntry.currentQuestion) {
      return null
    }

    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              {this.renderTitle()}
            </div>
            <div className="card-block">
              <blockquote className="card-blockquote">
                {this.renderQuestion()}
                {this.renderCode()}
                {this.renderOptions()}
                {this.renderButton()}
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
