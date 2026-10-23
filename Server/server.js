require('dotenv').config()

const app = require('./src/app')
const { getConfig } = require('./src/config/env')

const { port } = getConfig()

app.listen(port, () => {
  console.log(`DevVault API listening on port ${port}`)
})