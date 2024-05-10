const mongoose = require('mongoose')

const CancionSchema = new mongoose.Schema({
    name : {
        type : mongoose.SchemaTypes.String,
        required : true,
    },
    artist : {
        type : mongoose.SchemaTypes.Array,
        required : true,
    },
    favorite : {
        type : mongoose.SchemaTypes.Boolean,
        required : true,
        default : false,
    },
    createAt : {
        type : mongoose.SchemaTypes.Date,
        required : true,
        default : new Date()
    }


})

module.exports = mongoose.model('canciones', CancionSchema)