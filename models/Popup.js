const { text } = require('express')
const mongoose = require('mongoose')
const geocoder = require('../utils/geocoder')

const PopupSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    body: {
        type: String,
        required: true
    },
    menu: {
        type: String,
        required: true
    },
    hours: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: [true, 'Please add an address']
    },
    location: {
        type: {
          type: String, 
          enum: ['Point'], 
        },
        coordinates: {
          type: [Number],
          index: '2dsphere'
        },
        formattedAddress: String
      },
    status: {
        type: String,
        default: 'public',
        enum: ['public', 'private']
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

// Geocode & create location
PopupSchema.pre('save', async function(next) {
    const location = await geocoder.geocode(this.address)
    console.log(location)
})

module.exports = mongoose.model('Popup', PopupSchema)