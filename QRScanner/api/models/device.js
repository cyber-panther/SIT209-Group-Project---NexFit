const mongoose = require('mongoose');

module.exports = mongoose.model('Device', new mongoose.Schema({
    Content: String,
    _Date: String
}, { collection: 'qrcode' }));