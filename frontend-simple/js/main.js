'use strict'

const Handlebars = require('handlebars')
const { request } = require('graphql-request')

const endpoint = 'http://localhost:3001/api'

const template = `
{{#with error}}
  There was an error: {{../error}}
{{/with}}
{{#each items}}
<div class="item">
  <h2>{{__typename}}</h2>
  <h3>{{title}}{{name}}</h3>
  {{#with description}}
    <p>{{../description}}</p>
  {{/with}}
  {{#with email}}
    <p><a href="mailto:{{../email}}">{{../email}}</a></p>
  {{/with}}
  {{#with phone}}
    <p><a href="tel:{{../phone}}">{{../phone}}</a></p>
  {{/with}}
</div>
{{/each}}
`
const templateData = Handlebars.compile(template)

async function search () {
  const query = `
    query generalSearch ($keyword: String!){
      searchItems(keyword: $keyword) {
        __typename
          ...on Course {
            title
            description
          }
          ...on Monitor {
            name
            phone
          }
          ...on Student {
            name
            email
          }
      }
    }
  `

  const data = { keyword: document.getElementById('search').value }
  let result, html

  console.log(data)

  try {
    result = await request(endpoint, query, data)
    console.log(result)
    html = templateData({ items: result.searchItems })
    console.log(html)
  } catch (error) {
    html = templateData({ error: error })
  }

  document.getElementById('result').innerHTML = html
}

window.onload = () => {
  document.getElementById('btn-search').addEventListener('click', search)
}
