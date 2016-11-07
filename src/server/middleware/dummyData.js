'use strict'

import _ from 'lodash'
import async from 'async'
import log from 'loglevel'

function createAdminUser(app, cb) {
  const user = app.models.user

  user.destroyAll(function(error){
    if (error) {
      return cb(error)
    }

    user.create({
      username: 'admin',
      email: 'admin@test.com',
      password: 'test',
      firstName: 'Admin',
      lastName: 'Admin',
      github: 'MyGithubProfile'
    }, cb)
  })
}

function createAdminRole(app, cb) {
  const Role = app.models.Role

  Role.destroyAll((error) => {
    if (error) {
      return cb(error)
    }

    Role.create({
      name: 'admin'
    }, cb)
  })
}

function createAdminRolemapping(app, user, role, cb) {
  const RoleMapping = app.models.RoleMapping

  RoleMapping.destroyAll((error) => {
    if (error) {
      return cb(error)
    }

    RoleMapping.create({
      principalId: user.id,
      principalType: RoleMapping.USER,
      roleId: role.id
    }, cb)
  })
}

function createAdminACL(app, user, role, rolemapping, cb) {
  const ACL = app.models.ACL

  ACL.destroyAll(function(error){
    if (error) {
      return cb(error)
    }

    ACL.create({
      model: 'user',
      property: '*',
      accessType: '*',
      permission: 'ALLOW',
      principalType: 'ROLE',
      principalId: 'admin'
    }, cb)
  })
}

function importQuizzes(app, cb) {
  const { Quiz, Question, Option } = app.models
  const quizzes = require('./questions/allQuestions.json')

  async.parallel([
    (cb) => Quiz.destroyAll(cb),
    (cb) => Question.destroyAll(cb),
    (cb) => Option.destroyAll(cb)
  ], error => {
    if (error) return cb(error)

    async.each(quizzes, (quizDto, cb) => {
      Quiz.create({
        subject: quizDto.subject
      }, (error, quiz) => {
        if (error) return cb(error)

        console.log(`${quizDto.subject}: ${quizDto.questions.length} questions`)

        async.each(quizDto.questions, (questionDto, cb) => {
          Question.create({
            quizId: quiz.id,
            title: questionDto.title,
            question: questionDto.question,
            code: questionDto.code
          }, (error, question) => {
            if (error) return cb(error)

            async.each(questionDto.answers, (answerDto, cb) => {
              Option.create({
                questionId: question.id,
                value: answerDto.value,
                correct: answerDto.correct || false
              }, cb)
            }, cb)
          })
        }, cb)
      })
    }, cb)
  })
}

export default (app, cb) => {
  createAdminUser(app, function(error, user) {
    if (error) {
      return cb(error)
    }

    createAdminRole(app, function(error, role) {
      if (error) {
        return cb(error)
      }

      createAdminRolemapping(app, user, role, function(error, rolemapping) {
        if (error) {
          return cb(error)
        }

        createAdminACL(app, user, role, rolemapping, function(error, acl) {
          if (error) {
            return cb(error)
          }

          importQuizzes(app, cb)
        })
      })
    })
  })
}
