'use strict'

const connectDB = require('./db')
const { ObjectId } = require('mongodb')
const errorhandler = require('./errorHandler')

module.exports = {
  createCourse: async (root, { input }) => {
    const defaults = {
      teacher: '',
      topic: ''
    }

    const newCourse = Object.assign(defaults, input)
    let db
    let course

    try {
      db = await connectDB()
      course = await db.collection('courses').insertOne(newCourse)
      newCourse._id = course.insertedId
      console.log(newCourse)
    } catch (error) {
      errorhandler(error)
    }
    return newCourse
  },
  createPerson: async ( root, { input } ) => {
    let db
    let student

    try {
      db = await connectDB()
      student = await db.collection('students').insertOne(input)
      input._id = student.insertedId

    } catch (error) {
      errorhandler(error)

    }
    return input
  },
  editCourse: async ( root, { _id, input } ) => {

    let db
    let course

    try {
      db = await connectDB()
      await db.collection('courses').updateOne({ _id: ObjectId(_id)}, { $set: input } )
      course = db.collection('courses').findOne( { _id: ObjectId(_id) } )
    } catch (error) {
      errorhandler(error)
    }
    return course
  },
  editPerson: async ( root, { _id, input } ) => {
    let db
    let student

    try {
      db = await connectDB()
      await db.collection('students').updateOne({ _id: ObjectId(_id)}, { $set: input } )
      student = db.collection('students').findOne( { _id: ObjectId(_id) } )
    } catch (error) {
      errorhandler(error)
    }
    return student
  },
  deleteStudent: async ( root, { _id } ) => {
    let db

    try {
      db = await connectDB()
      await db.collection('students').deleteOne( { _id: ObjectId(_id) } )

    } catch ( error ) {
      errorhandler(error)
    }
    return true
  },
  deleteCourse: async ( root, { _id } ) => {
    let db

    try {
      db = await connectDB()
      await db.collection('courses').deleteOne( { _id: ObjectId(_id) } )

    } catch ( error ) {
      errorhandler(error)
    }
    return true
  },
  addPeople: async ( root, { courseId, personId}) => {
    let db
    let course
    let person

    try {
      db = await connectDB()
      course = await db.collection('courses').findOne( { _id: ObjectId(courseId) } )
      person = await db.collection('students').findOne( { _id: ObjectId(personId) } )

      if ( !course || !person ) throw new Error('La persona o el curso no existe!!!')

      await db.collection('courses').updateOne( { _id: ObjectId(courseId) }, {$addToSet: { people: ObjectId(personId) } } )
    } catch (error) {
      errorhandler(error)
    }
    return course
  }
}