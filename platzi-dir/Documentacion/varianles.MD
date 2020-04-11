// Usando variables
mutation agregarPersonaACurso($curso: ID!, $persona: ID!){
  addPeople(courseId: $curso, personId: $persona){
    _id
    title
  }
}

// Se pasa un objeto JSON
{
  "curso": "5e8fe729e7562506308bf880",
  "persona": "5e910f82acbac527d81d6c1c"
}

// Consultando con variables
query getCourses($curso: ID!){
  getCourse(id: $curso){
    _id
    title
    description
    people{
      _id
      name
    }
  }
}

// Definicion de las variables
{
  "curso": "5e8fe729e7562506308bf880"
}