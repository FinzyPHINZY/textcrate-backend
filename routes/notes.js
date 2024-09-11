const express = require('express')
const router = express.Router()
const noteController = require('../controllers/noteController')

// desc         Fetch all notes
router.get('/', noteController.fetchAllNotes)

module.exports = router
