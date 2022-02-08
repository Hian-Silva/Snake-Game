const express = require('express')
const app = express()
const exphbs = require('express-handlebars')

app.use('/public', express.static('public'))

app.engine('.hbs', exphbs.engine({
  defaultLayout: 'main', extname: 'hbs'
}))

app.set('view engine', '.hbs')

app.get('/', (req, res) => {
  res.render('home')
})

app.listen(3000, () => {
  console.log('Backend executando...')
})