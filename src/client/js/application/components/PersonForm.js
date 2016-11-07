import * as log from 'loglevel'
import React from 'react'
import _ from 'lodash'
import { Field, SubmissisonError, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { hashHistory } from 'react-router'

import Header from './Header'

import AndroidIcon from 'babel!svg-react!../../../img/svg/android.svg?name=AndroidIcon'
//import ClojureIcon from 'babel!svg-react!../../../img/svg/clojure.svg?name=ClojureIcon'
import JavaIcon from 'babel!svg-react!../../../img/svg/java.svg?name=JavaIcon'
import JavaScriptIcon from 'babel!svg-react!../../../img/svg/javascript.svg?name=JavaScriptIcon'
import ScalaIcon from 'babel!svg-react!../../../img/svg/scala.svg?name=ScalaIcon'

import setQuizEntryAction from '../actions/setQuizEntry'
import postQuizEntryService from '../services/postQuizEntry'

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const self = x => x

let FIXME_STATE


@reduxForm({
  form: 'person',
  fields: [
    'contact',
    'email',
    'firstName',
    'github',
    'intoAndroid',
    'intoAngular',
    'intoClojure',
    'intoDotNet',
    'intoIOS',
    'intoJava',
    'intoJavascript',
    'intoNode',
    'intoReact',
    'intoScala',
    'lastName',
  ],

  validate: (data) => {
    // First run will be empty.
    if (_.keys(data).length === 0) {
      return {}
    }

    const errors = {}

    if (data.firstName.length <= 1) {
      errors.firstName = 'First name must be 2 characters or more.'
    }

    if (data.lastName.length <= 1) {
      errors.lastName = 'Last name must be 2 characters or more.'
    }

    if (!EMAIL_REGEX.test(data.email)) {
      errors.email = 'Please enter a valid email address.'
    }

    if (!data.contact) {
      errors.contact = 'You must agree to these terms in order to continue.'
    }

    return errors
  },

  // TODO: Server side validation
  /*
  onSubmitFail: async (errors) => {
    const json = await response.json()

    // Get the first of each message, since the form supports one error message per input currently.
    const messages = _.mapValues(json.error.details.messages, a => a[0])

    // Set the generic error message.
    messages._error = json.error._message

    throw new SubmissisonError(messages)
  },
  */

  onSubmitSuccess: async (response, dispatch) => {
    log.debug('PersonForm.reduxForm#onSubmitSuccess', response, dispatch)

    const json = await response.json()

    dispatch(setQuizEntryAction(json))

    hashHistory.push(`/quiz/${FIXME_STATE}`)
  }
})
@connect(
  (state) => {
    return {}
  },
  (dispatch, props) => {
    return {
      redirectToScoreboard: () => {
        hashHistory.push(`/scoreboard`)
      },
    }
  }
)
export default class PersonForm extends React.Component {
  componentWillMount() {
    log.debug('PersonForm#componentWillMount')

    const { quizEntry } = this.props

    this.props.initialize({})

    this.props.initialize({
      firstName: quizEntry.firstName || '',
      lastName: quizEntry.lastName || '',
      github: quizEntry.github || '',
      email: quizEntry.email || '',
      contact: quizEntry.contact || '',

      intoAndroid: !!quizEntry.into.android,
      intoAngular: !!quizEntry.into.angular,
      intoClojure: !!quizEntry.into.clojure,
      intoDotNet: !!quizEntry.into.dotnet,
      intoIOS: !!quizEntry.into.ios,
      intoJava: !!quizEntry.into.java,
      intoJavascript: !!quizEntry.into.javascript,
      intoNode: !!quizEntry.into.node,
      intoReact: !!quizEntry.into.react,
      intoScala: !!quizEntry.into.scala,
    })

    // Make sure the form validates if there is data filled in already.
    if (quizEntry.firstName) {
      this.props.handleSubmit(this.handleSubmit.bind(this))
    }
  }

  async handleSubmit(data) {
    log.debug('PersonForm#handleSubmit')

    // FIXME
    data.subject = FIXME_STATE

    return postQuizEntryService(data)
  }

  startSubmit(language, ...args) {
    log.debug('PersonForm#startSubmit')

    // FIXME
    FIXME_STATE = language

    this.props.handleSubmit(this.handleSubmit.bind(this))
  }

  renderAsterisk() {
    log.debug('PersonForm#renderAsterisk')

    return <strong>*</strong>
  }

  renderTextInput({ type, input, meta }) {
    log.debug('PersonForm#renderTextInput')

    if (meta.touched) {
      if (meta.error) {
        return (
          <div className="has-danger">
            <input type={type} className="form-control form-control-danger" {...input}/>
            <div className="form-control-feedback">{meta.error}</div>
          </div>
        )
      } else {
        return (
          <div className="has-success">
            <input type={type} className="form-control form-control-success" {...input}/>
            <div className="form-control-feedback">{meta.error}</div>
          </div>
        )
      }
    } else {
      return (
        <div>
          <input type={type} className="form-control" {...input}/>
        </div>
      )
    }
  }

  renderCheckbox({ type, input, meta, label }) {
    log.debug('PersonForm#renderCheckbox')

    const inputElement = (
      <input
        type="checkbox"
        className="form-check-input"
        style={{
          marginRight: '5px',
        }}
        {...input}
      />
    )

    return (
      <div className="form-check">
        <label className="form-check-label">
          {inputElement}
          {label}
        </label>
      </div>
    )
  }

  renderContactCheckbox({ type, input, meta, label }) {
    log.debug('PersonForm#renderContactCheckbox')

    const inputElement = (
      <input
        type="checkbox"
        className="form-check-input"
        {...input}
        style={{
          marginRight: '5px'
        }}
      />
    )

    if (meta.touched) {
      if (meta.error) {
        return (
          <div className="row">
            <div className="col-md-12">
              <div className="form-check has-danger">
                <label className="form-check-label">
                  {inputElement}
                  Sytac may contact me for business opportunities and promotional information.
                </label>
              </div>
            </div>
          </div>
        )
      } else {
        return (
          <div className="row">
            <div className="col-md-12">
              <div className="form-check has-success">
                <label className="form-check-label">
                  {inputElement}
                  Sytac may contact me for business opportunities and promotional information.
                </label>
              </div>
            </div>
          </div>
        )
      }
    } else {
      return (
        <div className="row">
          <div className="col-md-12">
            <div className="form-check">
              <label className="form-check-label">
                {inputElement}
                Sytac may contact me for business opportunities and promotional information.
              </label>
            </div>
          </div>
        </div>
      )
    }
  }

  renderDetails() {
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <h3>Details</h3>
            </div>
            <div className="card-block">
              <div className="card-blockquote">
                <div className="form-group">
                  <label htmlFor="firstName">First name {this.renderAsterisk()}</label>
                  <Field name="firstName" type="text" component={this.renderTextInput} />
                </div>

                <div className="form-group">
                  <label htmlFor="lastName">Last name {this.renderAsterisk()}</label>
                  <Field name="lastName" type="text" component={this.renderTextInput} />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email {this.renderAsterisk()}</label>
                  <Field name="email" type="text" component={this.renderTextInput} />
                </div>

                <div className="form-group">
                  <label htmlFor="github">Github</label>
                  <Field name="github" type="text" component={this.renderTextInput} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  renderInterests() {
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-block">
              <h3>Interests</h3>
              <div className="row">
                <div className="col-md-2 col-sm-4 col-xs-6">
                  <div className="form-group">
                    <Field name="intoAndroid" type="checkbox" label="Android" component={this.renderCheckbox} />
                  </div>
                </div>

                <div className="col-md-2 col-sm-4 col-xs-6">
                  <div className="form-group">
                    <Field name="intoAngular" type="checkbox" label="Angular" component={this.renderCheckbox} />
                  </div>
                </div>

                <div className="col-md-2 col-sm-4 col-xs-6">
                  <div className="form-group">
                    <Field name="intoClojure" type="checkbox" label="Clojure" component={this.renderCheckbox} />
                  </div>
                </div>

                <div className="col-md-2 col-sm-4 col-xs-6">
                  <div className="form-group">
                    <Field name="intoDotNet" type="checkbox" label=".NET" component={this.renderCheckbox} />
                  </div>
                </div>

                <div className="col-md-2 col-sm-4 col-xs-6">
                  <div className="form-group">
                    <Field name="intoIOS" type="checkbox" label="IOS" component={this.renderCheckbox} />
                  </div>
                </div>

                <div className="col-md-2 col-sm-4 col-xs-6">
                  <div className="form-group">
                    <Field name="intoJava" type="checkbox" label="Java" component={this.renderCheckbox} />
                  </div>
                </div>

                <div className="col-md-2 col-sm-4 col-xs-6">
                  <div className="form-group">
                    <Field name="intoJavascript" type="checkbox" label="JavaScript" component={this.renderCheckbox} />
                  </div>
                </div>

                <div className="col-md-2 col-sm-4 col-xs-6">
                  <div className="form-group">
                    <Field name="intoNode" type="checkbox" label="Node" component={this.renderCheckbox} />
                  </div>
                </div>

                <div className="col-md-2 col-sm-4 col-xs-6">
                  <div className="form-group">
                    <Field name="intoReact" type="checkbox" label="React" component={this.renderCheckbox} />
                  </div>
                </div>

                <div className="col-md-2 col-sm-4 col-xs-6">
                  <div className="form-group">
                    <Field name="intoScala" type="checkbox" label="Scala" component={this.renderCheckbox} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  renderTermsOfService() {
    return (
      <div>
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <h3>Terms of Service {this.renderAsterisk()}</h3>
              </div>
              <div className="card-block">
                <Field
                  name="contact"
                  type="checkbox"
                  component={this.renderContactCheckbox}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  renderServerError(error) {
    //log.debug('PersonForm#renderServerError')

    if (!error) {
      return null
    }

    return (
      <div className="row">
        <div className="col-md-12">
          <label><strong style={{color: '#ff0000'}}>{error}</strong></label>
        </div>
      </div>
    )
  }

  renderQuizStart() {
    const {
      pristine,
      submitting,
    } = this.props

    const disabled = !!submitting

    return (
      <div>
        <div className="row">
          <div className="col-md-12">
            <center>
              <label><strong>Start the quiz!</strong></label>
            </center>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <center>
              <small>Answer as many questions as you can before your time runs out.</small>
            </center>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <center>
              <div className="btn-group" role="group">
                <button type="submit" className="btn btn-secondary" disabled={disabled} onClick={this.startSubmit.bind(this, 'android')}>
                  <AndroidIcon style={{ width: 64, height: 64 }}/>
                </button>
                <button type="submit" className="btn btn-secondary" disabled={disabled} onClick={this.startSubmit.bind(this, 'clojure')}>
                  <img
                    src="/img/png/clojure.png"
                    style={{
                      width: 64,
                      height: 64,
                    }}
                  />
                </button>
                <button type="submit" className="btn btn-secondary" disabled={disabled} onClick={this.startSubmit.bind(this, 'java')}>
                  <JavaIcon style={{ width: 64, height: 64 }}/>
                </button>
                <button type="submit" className="btn btn-secondary" disabled={disabled} onClick={this.startSubmit.bind(this, 'javascript')}>
                  <JavaScriptIcon style={{ width: 64, height: 64 }}/>
                </button>
                <button type="submit" className="btn btn-secondary" disabled={disabled} onClick={this.startSubmit.bind(this, 'scala')}>
                  <ScalaIcon style={{ width: 64, height: 64 }}/>
                </button>
              </div>
            </center>
          </div>
        </div>
      </div>
    )
  }

  renderScoreboardLink() {
    return (
      <div
        className="row"
        style={{
          marginTop: '20px'
        }}
      >
        <div className="col-md-12">
          <center>
            <small>Or take a look at the scoreboard</small><br />
            <button type="button" className="btn btn-primary" onClick={this.props.redirectToScoreboard}>Scoreboard</button>
          </center>
        </div>
      </div>
    )
  }

  render() {
    log.debug('PersonForm#render')

    const {
      handleSubmit,
      error
    } = this.props

    return (
      <div>
        <Header/>
        <form onSubmit={handleSubmit(this.handleSubmit)}>
          {this.renderDetails()}
          {this.renderInterests()}
          {this.renderTermsOfService()}
          {this.renderServerError(error)}
          {this.renderQuizStart()}
          {this.renderScoreboardLink()}
        </form>
      </div>
    )
  }
}
