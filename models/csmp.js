const mongoose = require('mongoose');

const csmpSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    ImageFile: { type: String, required: true }
});

module.exports = mongoose.model('Csmp', csmpSchema);