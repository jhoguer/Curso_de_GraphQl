{
  getAllCourses: getCourses{
    ...courseFields
  }
  
  getOneCourse: getCourse(id: "5e8ff89d21b1e50d5dc7a086"){
    ...courseFields
    topic
    teacher
  }
  
  todosLosEstudiantes: getStudents{
    _id
    name
    email
  }
}

fragment courseFields on Course{
  _id
  title
  description
  people{
    _id
    name
  }
}