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

// @desc    Show all popups
// @route   GET /popups
router.get('/', ensureAuth, async (req, res) => {
    try {
      const popups = await Popup.find({ status: 'public' })
        .populate('user')
        .sort({ createdAt: 'desc' })
        .lean()
  
      res.render('popups/index', {
        popups,
      })
    } catch (err) {
      console.error(err)
      res.render('error/500')
    }
  })

// @desc Show edit page
// @route GET /popups/edit
router.get('/edit/:id', ensureAuth, async (req, res) => {
  const popup = await Popup.findOne({
    _id: req.params.id
  }).lean()

  if (!popup) {
    return res.render('error/404')
  }

  if (popup.user != req.user.id) {
    res.redirect('/popups')
  } else {
    res.render('popups/edit', {
      popup,
    })
  }
})

module.exports = router