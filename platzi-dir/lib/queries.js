'use strict'

const connectDB = require('./db')
const { ObjectId } = require('mongodb')

module.exports = {
  getCourses: async () => {
    let db
    let courses = []
    try {
      db = await connectDB()
      courses = await db.collection('courses').find().toArray()
    } catch (err) {
      console.log(err)
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
      console.log(error)
    }

    return course
  }
}