'use strict'

const connectDB = require('./db')
const { ObjectId } = require('mongodb')
const errorHandler = require('./errorHandler')


module.exports = {
  getCourses: async () => {
    let db
    let courses = []
    try {
      db = await connectDB()
      courses = await db.collection('courses').find().toArray()
    } catch (error) {
      errorHandler(error)
    }
    return courses
  },
  getCourse: async (root, { id }) => {
    let db
    let course

    try {
      db = await connectDB()
      course = await db.collection('courses').findOne({ _id: ObjectId(id) })

    } catch (error) {
      errorHandler(error)
    }

    return course
  },
  getStudents: async () => {
    let db
    let students = []

    try {
      db = await connectDB()
      students = await db.collection('students').find().toArray()
    } catch (error) {
      errorHandler(error)
    }
    return students
  },
  getStudent: async ( root, { id } ) => {
    let db
    let student

    try {
      db = await connectDB()
      student = await db.collection('students').findOne( { _id: ObjectId(id) } )
    } catch (error) {
      errorHandler(error)
    }
    return student
  }
}