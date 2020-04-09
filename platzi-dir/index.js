'use strict'

const { graphql, buildSchema } = require('graphql');

// definiendo el esquema inicial
const schema = buildSchema(`
  type Query {
    hello: String
    saludo: String
  }
`);

// Configurar los resolvers
const resolvers = {
  hello: () => {
    return 'Hola mundo'
  },
  saludo: () => {
    return 'Hola a todos'
  }
}

// Ejecutar el query hello
graphql(schema, '{ saludo, hello }', resolvers)
  .then( data => console.log(data));