const mongoose = require('mongoose')
const shortid = require('shortid')

const ShortUrlSchema = new mongoose.Schema({
    fullurl: {
        type : String,
        required : true
    },
    shorturl: {
        type: String,
        required: true,
        unique: true,
        default: shortid.generate()
    },
    clicks:{
        type: Number,
        default: 0
    },
    
});
module.exports = Shorturl = mongoose.model('shorturl', ShortUrlSchema);