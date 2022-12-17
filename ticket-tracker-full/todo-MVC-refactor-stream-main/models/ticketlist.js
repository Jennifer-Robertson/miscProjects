const mongoose = require('mongoose');
const ticketListSchema = new mongoose.Schema({
subject: {
    type: String,
    required: true
},
description: {
    type: String,
    required: true
},
severity: {
    type: String,
    required: true
},
assignedTo: {
    type: String,
    required: true
},
status: {
    type: String,
    default: "Open"
},
buttonStatus: {
    type: String,
    default: "Close"
},
date: {
    type: Date,
    default: Date.now
}
})
module.exports = mongoose.model('TicketList',ticketListSchema,'tickets');