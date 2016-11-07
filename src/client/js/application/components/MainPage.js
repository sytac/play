import React from 'react'
import { connect } from 'react-redux'

import PersonForm from './PersonForm'

// Acts as a wrapper for PersonForm to supply initial data when re-doing
// the quiz.
@connect(
  (state) => {
    return {
      quizEntry: state.app.quizEntry,
    }
  },
  (dispatch, props) => {
    return {
    }
  }
)
export default class MainPage extends React.Component {
  render() {
    return (
      <div className="mainPage">
        <PersonForm
          quizEntry={this.props.quizEntry}
        />
      </div>
    )
  }
}
