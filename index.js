const express = require('express')
const cancionRoute = require('./routes/cancion')

const app = express();

const PORT = 8080;

require('./db')


app.use(express.json());

app.use('/api/cancion', cancionRoute);

app.listen(PORT , () =>
    console.log(`http://localhost:${PORT}`)
)   