const mongoose = require('mongoose') 

mongoose.connect('mongodb://localhost:27017/spotify_fake')
.then(() => console.log('Conexion'))
.catch((err ) => console.log(err));