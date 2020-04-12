'use strict'

const connectDB = require('./db')
const { ObjectId } = require('mongodb')
const errorhandler = require('./errorHandler')

module.exports = {
  Course: {
    people: async ( { people } ) => {
      let db
      let peopleData
      let ids

      try {
        db = await connectDB()
        ids = people ? people.map( id => ObjectId(id)) : []
        peopleData = ids.length > 0
        ? await db.collection('students').find( { _id: { $in: ids } } ).toArray()
        : []
      } catch (error) {
        errorhandler(error)
      }

      return peopleData
    }
  },
  Person: {
    __resolveType: ( person, context, info ) => {
      if ( person.phone ) {
        return 'Monitor'
      }

      return 'Student'
    }
  },
  GlobalSearch: {
    __resolveType: ( item, context, info ) => {
      if ( item.title ) return 'Course'
      if ( item.phone ) return 'Monitor'
      return 'Student'
    }
  }
}