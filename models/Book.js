const mongoose = require ('mongoose');

const BookSchema = mongoose.Schema({
    title : String,
    autor : String,
    linkr : String,
    Linka : String,
    ISBN  : String,

});


module.exports = mongoose.model('Books', BookSchema);