//index.js is responsible for starting the server
const app = require('./app')
const port = process.env.PORT || 3000
app.listen(port, () => console.log(`server works on ${port}`))