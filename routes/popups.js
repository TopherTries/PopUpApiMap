const express = require('express')
const { ensureAuth } = require('../middleware/auth')
const router = express.Router()

const Popup = require('../models/Popup')

// @desc Show add page
// @route GET /popups/add
router.get('/add', ensureAuth, (req, res) => {
    res.render('popups/add')
})

// @desc Process add form
// @route POST /popups
router.post('/', ensureAuth, async (req, res) => {
    try {
      req.body.user = req.user.id
      await Popup.create(req.body)
      res.redirect('/dashboard') 
    } catch (error) {
        console.error(err)
        res.render('error/500')
    }
})

module.exports = router